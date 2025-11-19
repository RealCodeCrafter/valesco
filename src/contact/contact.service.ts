// contact.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2',
      },
      logger: true,
      debug: true,
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
    });
  }

  async sendEmail(data: any) {
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

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email yuborildi:', info.messageId);
      return info;
    } catch (error) {
      console.error('Email yuborishda xato:', error);
      throw error;
    }
  }
}
