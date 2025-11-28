import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  async submit(@Body() createContactDto: CreateContactDto) {
    // Darhol response qaytaramiz, email background'da yuboriladi
    this.contactService.sendEmailAsync(createContactDto).catch((error) => {
      // Error log qilamiz, lekin foydalanuvchiga xabar bermaymiz
      console.error('Background email yuborishda xato:', error);
    });

    return { success: true, message: 'Xabar qabul qilindi va yuborilmoqda!' };
  }
}
