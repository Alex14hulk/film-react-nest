import { Injectable, Inject, BadRequestException, ConflictException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { FilmsPostgreRepository } from '../repository/filmsPostgre.repository';
import { OrderDataDto, TicketDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('FILMS_REPOSITORY')
    private readonly filmsRepository: FilmsRepository | FilmsPostgreRepository,
  ) {}

  async createOrder(
    orderData: OrderDataDto,
  ): Promise<{ items: TicketDto[]; total: number }> {
    const tickets = orderData.tickets;
    for (const ticket of tickets) {
      if (this.filmsRepository instanceof FilmsRepository) {
        const film = (
          await this.filmsRepository.findFilmById(ticket.film)
        ).toObject();
        const scheduleIndex = await this.filmsRepository.findFilmSchedule(
          ticket.film,
          ticket.session,
        );
        const place = `${ticket.row}:${ticket.seat}`;

        if (film.schedule[scheduleIndex].taken.includes(place)) {
          throw new BadRequestException(`Место занято`);
        }
        this.updateSeats(ticket.film, scheduleIndex, place);
      } else {
        const film = await this.filmsRepository.findFilmById(ticket.film);
        const scheduleIndex = await this.filmsRepository.findFilmSchedule(
          ticket.film,
          ticket.session,
        );
        const place = `${ticket.row}:${ticket.seat}`;
        if (film.schedule[scheduleIndex].taken.split(',').includes(place)) {
          throw new BadRequestException(`Место занято`);
        }
        this.updateSeats(ticket.film, scheduleIndex, place);
      }
    }
    return { items: tickets, total: tickets.length };
  }

  async updateSeats(filmId: string, scheduleIndex: number, place: string) {
    if (this.filmsRepository instanceof FilmsRepository) {
      const film = await this.filmsRepository.findFilmById(filmId);
      const scheduleTakenPlace = `schedule.${scheduleIndex.toString()}.taken`;
      try {
        await film.updateOne({ $push: { [scheduleTakenPlace]: place } });
      } catch {
        new ConflictException('Ошибка при обновлении данных');
      }
    } else {
      const film = await this.filmsRepository.findFilmById(filmId);
      film.schedule[scheduleIndex].taken = film.schedule[scheduleIndex].taken + `,${place}`;
      try {
        await this.filmsRepository.updateFilm(film);
      } catch {
        new ConflictException('Ошибка при обновлении данных');
      }
    }
  }
}
