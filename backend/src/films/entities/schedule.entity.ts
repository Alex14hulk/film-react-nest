import { IsNumber, IsString } from 'class-validator';
import { FilmEntity } from './films.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  daytime: string;

  @Column()
  @IsNumber()
  hall: number;

  @Column()
  @IsNumber()
  rows: number;

  @Column()
  @IsNumber()
  seats: number;

  @Column()
  @IsNumber()
  price: number;

  @Column({ type: 'text', nullable: true }) // Изменено на text и nullable
  @IsString() // Изменено на IsString, так как храним строку с местами
  taken: string; // Формат: "1:2,1:3,2:5" - строки разделенные запятыми

  @Column()
  @IsString() // Изменено на IsString, так как filmId - это uuid (строка)
  filmId: string;

  @ManyToOne(() => FilmEntity, (film) => film.schedule)
  film: FilmEntity;
}
