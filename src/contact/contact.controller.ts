import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  async submit(@Body() createContactDto: CreateContactDto) {
    try {
      await this.contactService.sendEmail(createContactDto);
      return { success: true, message: 'Xabar yuborildi!' };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Xabar yuborishda xatolik yuz berdi',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
