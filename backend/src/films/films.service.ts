import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmEntity } from './entities/films.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly filmsRepository: Repository<FilmEntity>,
  ) {}

  // Возвращаем объект с полем items
  async getAllFilms(): Promise<{ items: FilmEntity[] }> {
    const films = await this.filmsRepository.find({
      relations: ['schedule'],
    });

    return {
      items: films || [],
    };
  }

  // Возвращаем объект с total и items
  async getScheduleFilm(id: string): Promise<{ total: number; items: any[] }> {
    const film = await this.filmsRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });

    return {
      total: film?.schedule?.length || 0,
      items: film?.schedule || [],
    };
  }
}

