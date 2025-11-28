// contact.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { existsSync, mkdirSync, appendFileSync } from 'fs';
import { join } from 'path';

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
      logger: process.env.NODE_ENV === 'development', // Development'da yoqiladi
      debug: process.env.NODE_ENV === 'development', // Development'da yoqiladi
      connectionTimeout: 300000, // 5 daqiqa (production uchun yanada oshirildi)
      greetingTimeout: 120000, // 2 daqiqa (production uchun yanada oshirildi)
      socketTimeout: 300000, // 5 daqiqa (production uchun yanada oshirildi)
      // Qo'shimcha sozlamalar
      pool: false,
      maxConnections: 1,
      maxMessages: 1,
    } as any);
  }

  async sendEmail(data: { name: string; phone: string; email?: string; country?: string; company?: string; message: string }) {
    const s = (val?: string) => val?.trim() || '—';

    const mailOptions = {
      from: `"Valesco Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: data.email || undefined,
      subject: 'Valescooil – Yangi xabar!',
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

    // Retry mexanizmi - birinchi marta xato bo'lsa, qayta sinab ko'ramiz
    let lastError;
    const maxAttempts = 3; // 3 marta urinamiz
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      // Har safar yangi transporter yaratamiz
      const transporter = this.createTransporter();
      
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email yuborildi:', info.messageId);
        transporter.close(); // Connection'ni yopamiz
        return info;
      } catch (error) {
        lastError = error;
        const errorMessage = error?.message || 'Noma\'lum xato';
        const errorCode = error?.code || 'UNKNOWN';
        
        console.log(`⚠️ Email yuborishda xato (urilish ${attempt}/${maxAttempts}): ${errorMessage} (${errorCode})`);
        
        try {
          transporter.close(); // Xato bo'lsa ham connection'ni yopamiz
        } catch (closeError) {
          // Ignore close error
        }
        
        if (attempt < maxAttempts) {
          const waitTime = attempt * 5000; // Har safar 5 soniya ko'proq kutamiz (5s, 10s, 15s)
          console.log(`   ${waitTime/1000} soniyadan keyin qayta sinab ko'rilmoqda...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
    }
    
    // Agar ikkala urilish ham muvaffaqiyatsiz bo'lsa
    const errorMessage = lastError?.message || 'Noma\'lum xato';
    const errorCode = lastError?.code || 'UNKNOWN';
    console.error(`❌ Email yuborishda xato (barcha urilishlar muvaffaqiyatsiz): ${errorMessage} (${errorCode})`);
    throw lastError;
  }

  // Async email yuborish - background'da ishlaydi
  async sendEmailAsync(data: { name: string; phone: string; email?: string; country?: string; company?: string; message: string }) {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      name: data.name,
      phone: data.phone,
      email: data.email || '—',
      country: data.country || '—',
      company: data.company || '—',
    };

    try {
      this.logEmail('START', logData, 'Email yuborish boshlandi');
      
      const info = await this.sendEmail(data);
      
      this.logEmail('SUCCESS', logData, `Email muvaffaqiyatli yuborildi: ${info.messageId}`);
      console.log(`✅ [${timestamp}] Email yuborildi: ${data.name} (${data.phone}) -> ${info.messageId}`);
      
      return info;
    } catch (error) {
      const errorMessage = error?.message || 'Noma\'lum xato';
      const errorCode = error?.code || 'UNKNOWN';
      const errorStack = error?.stack ? error.stack.substring(0, 500) : 'Stack trace yo\'q';
      
      this.logEmail('ERROR', logData, `Xato: ${errorMessage} (Code: ${errorCode})`);
      console.error(`❌ [${timestamp}] Email yuborishda xato: ${data.name} (${data.phone})`);
      console.error(`   Xato: ${errorMessage}`);
      console.error(`   Code: ${errorCode}`);
      console.error(`   Stack: ${errorStack}`);
      
      // Xatoni throw qilmaymiz, chunki async'da foydalanuvchi kutmayapti
      // Faqat log qilamiz
    }
  }

  // Log faylga yozish
  private logEmail(status: 'START' | 'SUCCESS' | 'ERROR', data: any, message: string) {
    try {
      const logsDir = join(__dirname, '..', '..', 'logs');
      if (!existsSync(logsDir)) {
        mkdirSync(logsDir, { recursive: true });
      }

      const logFile = join(logsDir, `contact-${new Date().toISOString().split('T')[0]}.log`);
      const logMessage = `[${data.timestamp}] [${status}] ${data.name} | ${data.phone} | ${data.email} | ${message}\n`;
      
      appendFileSync(logFile, logMessage, 'utf8');
    } catch (logError) {
      // Log yozishda xato bo'lsa, faqat console'ga yozamiz
      console.error('Log yozishda xato:', logError);
    }
  }
}
