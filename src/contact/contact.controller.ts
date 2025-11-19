import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  async submit(@Body() body: any) {
    await this.contactService.sendEmail(body);
    return { success: true, message: 'Xabar yuborildi!' };
  }
}
