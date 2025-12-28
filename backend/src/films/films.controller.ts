import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('afisha/films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAllFilms() {
    const result = await this.filmsService.getAllFilms();

    return {
      items: result.items,
    };
  }

  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string) {
    const result = await this.filmsService.getScheduleFilm(id);

    return {
      total: result.total,
      items: result.items,
    };
  }
}
