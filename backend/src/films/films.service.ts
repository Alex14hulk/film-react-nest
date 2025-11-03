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

  async getAllFilms() {
    return this.filmsRepository.find({
      relations: ['schedule']
    });
  }

  async getScheduleFilm(id: string) {
    const film = await this.filmsRepository.findOne({
      where: { id },
      relations: ['schedule']
    });

    if (!film) {
      throw new Error('Film not found');
    }

    return {
      total: film.schedule?.length || 0,
      items: film.schedule || [],
    };
  }
}
