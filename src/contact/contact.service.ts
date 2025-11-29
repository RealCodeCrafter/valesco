import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { existsSync, mkdirSync, appendFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ContactService {
  private createTransporter() {
    const port = Number(process.env.SMTP_PORT) || 25;
    const useSecure = process.env.SMTP_SECURE === 'true' || port === 465;
    const host = process.env.SMTP_HOST || 'mx1.trtparts.com';

    console.log(`📧 SMTP sozlamalari: ${host}:${port}, secure: ${useSecure}`);

    return nodemailer.createTransport({
      host: host,
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
      requireTLS: port === 587 || port === 25,
      ignoreTLS: false,
      logger: process.env.NODE_ENV === 'development',
      debug: process.env.NODE_ENV === 'development',
      connectionTimeout: 300000,
      greetingTimeout: 120000,
      socketTimeout: 300000,
      pool: false,
      maxConnections: 1,
      maxMessages: 1,
    } as any);
  }

  async sendEmail(data: {
    name: string;
    phone: string;
    email?: string;
    country?: string;
    company?: string;
    message: string;
  }) {
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

    let lastError;
    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const transporter = this.createTransporter();
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('📨 Email yuborildi:', info.messageId);
        transporter.close();
        return info;
      } catch (error) {
        lastError = error;
        console.log(
          `⚠️ Email yuborishda xato (urilish ${attempt}/${maxAttempts}): ${
            error?.message || 'Noma\'lum xato'
          } (${error?.code || 'UNKNOWN'})`,
        );

        try {
          transporter.close();
        } catch (closeError) {}

        if (attempt < maxAttempts) {
          const waitTime = attempt * 5000;
          console.log(`   ${waitTime / 1000}s keyin qayta urinilmoqda...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
    }

    console.error('❌ Email yuborishda barcha urinishlar muvaffaqiyatsiz:', lastError);
    throw lastError;
  }

  async sendEmailAsync(data: {
    name: string;
    phone: string;
    email?: string;
    country?: string;
    company?: string;
    message: string;
  }) {
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
      return info;
    } catch (error) {
      const fullError = JSON.stringify(error, Object.getOwnPropertyNames(error), 2);
      this.logEmail(
        'ERROR',
        logData,
        `Xato: ${error?.message || 'Noma\'lum xato'} | Code: ${error?.code || 'UNKNOWN'} | Response: ${error?.response || 'yo\'q'}`,
      );
      console.error('❌ EMAIL YUBORISHDAGI XATO:', fullError);
    }
  }

  private logEmail(status: 'START' | 'SUCCESS' | 'ERROR', data: any, message: string) {
    try {
      const logsDir = join(__dirname, '..', '..', 'logs');
      if (!existsSync(logsDir)) mkdirSync(logsDir, { recursive: true });

      const logFile = join(
        logsDir,
        `contact-${new Date().toISOString().split('T')[0]}.log`,
      );
      const logMessage = `[${data.timestamp}] [${status}] ${data.name} | ${data.phone} | ${data.email} | ${message}\n`;
      appendFileSync(logFile, logMessage, 'utf8');
    } catch (logError) {
      console.error('Log yozishda xato:', logError);
    }
  }
}
