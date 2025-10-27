import { Injectable, Inject } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { FilmsPostgreRepository } from '../repository/filmsPostgre.repository';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('FILMS_REPOSITORY')
    private readonly filmsRepository: FilmsRepository | FilmsPostgreRepository,
  ) {}

  async getAllFilms() {
    return this.filmsRepository.findAllFilms();
  }

  async getScheduleFilm(id: string) {
    let film;
    if (this.filmsRepository instanceof FilmsRepository) {
      film = (await this.filmsRepository.findFilmById(id)).toObject();
    } else {
      film = await this.filmsRepository.findFilmById(id);
    }
    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }
}
