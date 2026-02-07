import { IsString, IsOptional, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { toStringArray } from 'src/common/utils/parser.util';

export class CreateNewsDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsString()
  img?: string;

  @IsOptional()
  @Transform(({ value }) => toStringArray(value))
  @IsArray()
  image?: string[];

  @IsOptional()
  @IsString()
  fullContent?: string;

  @IsOptional()
  @IsString()
  video?: string;
}
