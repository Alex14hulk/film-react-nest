//TODO реализовать DTO для /orders
import { IsString, IsNumber, IsEmail, IsPhoneNumber, IsArray } from 'class-validator';

export class TicketDto {
  @IsString()
  film: string;
  @IsString()
  session: string;
  @IsString()
  daytime: string;
  @IsString()
  day: string;
  @IsString()
  time: string;
  @IsNumber()
  row: number;
  @IsNumber()
  seat: number;
  @IsNumber()
  price: number;
}

export class ContactsDto {
  @IsEmail()
  email: string;
  @IsPhoneNumber()
  phone: string;
}

export class OrderDataDto extends ContactsDto {
  @IsArray()
  tickets: TicketDto[];
}
