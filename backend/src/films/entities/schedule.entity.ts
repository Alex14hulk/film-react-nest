import { IsNumber, IsString } from 'class-validator';
import { FilmEntity } from './films.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
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

  @Column()
  @IsNumber()
  taken: string;

  @Column()
  @IsNumber()
  filmId: string;

  @ManyToOne(() => FilmEntity, (film) => film.schedule)
  film: FilmEntity;
}
