// contact.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
  private createTransporter() {
    const port = Number(process.env.SMTP_PORT) || 25;
    const useSecure = process.env.SMTP_SECURE === 'true' || port === 465;
    
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: port,
      secure: useSecure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2',
      },
      // 25 va 587 portlar uchun STARTTLS talab qilinadi
      requireTLS: port === 587 || port === 25,
      ignoreTLS: false,
      logger: false, // Production uchun o'chirildi
      debug: false, // Production uchun o'chirildi
      connectionTimeout: 60000, // 1 daqiqa
      greetingTimeout: 30000, // 30 soniya
      socketTimeout: 60000, // 1 daqiqa
    } as any);
  }

  async sendEmail(data: { name: string; phone: string; email?: string; country?: string; company?: string; message: string }) {
    const s = (val?: string) => val?.trim() || '—';

    const mailOptions = {
      from: `"Valesco Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: data.email || undefined,
      subject: 'Valesco – Yangi xabar!',
      html: `
        <h2>Yangi kontakt soʻrovi keldi</h2>
        <p><strong>Ism:</strong> ${s(data.name)}</p>
        <p><strong>Telefon:</strong> ${s(data.phone)}</p>
        <p><strong>Email:</strong> ${s(data.email)}</p>
        <p><strong>Davlat:</strong> ${s(data.country)}</p>
        <p><strong>Kompaniya:</strong> ${s(data.company)}</p>
        <p><strong>Xabar:</strong></p>
        <div style="background:#f5f5f5;padding:15px;border-left:4px solid #0066ff;">
          ${s(data.message)}
        </div>
        <hr>
        <small><strong>Vaqt:</strong> ${new Date().toLocaleString('uz-UZ')}</small>
      `,
    };

    // Har safar yangi transporter yaratamiz (connection pool muammosini oldini olish uchun)
    const transporter = this.createTransporter();
    
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email yuborildi:', info.messageId);
      transporter.close(); // Connection'ni yopamiz
      return info;
    } catch (error) {
      console.error('Email yuborishda xato:', error);
      transporter.close(); // Xato bo'lsa ham connection'ni yopamiz
      throw error;
    }
  }
}
