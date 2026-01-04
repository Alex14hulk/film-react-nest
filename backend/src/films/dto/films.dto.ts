//TODO описать DTO для запросов к /films
import {
  IsNumber,
  IsFQDN,
  IsNotEmpty,
  IsString,
  Min,
  Max,
  IsArray,
} from 'class-validator';

export class GetScheduleDTO {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export class CreateFilmDto {
  @IsString()
  id: string;
  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;
  @IsString()
  director: string;
  @IsArray()
  tags: string[];
  @IsFQDN()
  image: string;
  @IsFQDN()
  cover: string;
  @IsString()
  title: string;
  @IsString()
  about: string;
  @IsString()
  description: string;
  @IsNotEmpty()
  schedule: GetScheduleDTO[];
}
