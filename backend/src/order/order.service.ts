import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmEntity } from '../films/entities/films.entity';
import { ScheduleEntity } from '../films/entities/schedule.entity';
import { OrderDataDto, TicketDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly filmsRepository: Repository<FilmEntity>,
    @InjectRepository(ScheduleEntity)
    private readonly schedulesRepository: Repository<ScheduleEntity>,
  ) {}

  async createOrder(
    orderData: OrderDataDto,
  ): Promise<{ items: TicketDto[]; total: number }> {
    const tickets = orderData.tickets;
    
    for (const ticket of tickets) {
      // Находим расписание по filmId и daytime (session)
      const schedule = await this.schedulesRepository.findOne({
        where: {
          filmId: ticket.film,
          daytime: ticket.session,
        },
        relations: ['film'], // Загружаем связанный фильм
      });

      if (!schedule) {
        throw new BadRequestException(`Сеанс ${ticket.session} не найден для фильма с ID ${ticket.film}`);
      }

      const place = `${ticket.row}:${ticket.seat}`;

      // Проверяем, занято ли место
      if (schedule.taken && schedule.taken.split(',').includes(place)) {
        throw new BadRequestException(`Место ${place} уже занято`);
      }

      await this.updateSeats(schedule, place);
    }
    
    return { items: tickets, total: tickets.length };
  }

  private async updateSeats(schedule: ScheduleEntity, place: string): Promise<void> {
    // Обновляем занятые места
    if (!schedule.taken) {
      schedule.taken = place;
    } else {
      schedule.taken += `,${place}`;
    }

    try {
      await this.schedulesRepository.save(schedule);
    } catch (error) {
      throw new ConflictException('Ошибка при обновлении данных о местах');
    }
  }
}
