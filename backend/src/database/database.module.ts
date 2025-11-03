import { Module, DynamicModule, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { applicationConfig } from '../app.config.provider';
import { FilmEntity } from '../films/entities/films.entity';
import { ScheduleEntity } from '../films/entities/schedule.entity';
import { Film, FilmSchema } from '../films/schemas/films.schema';
import { FilmsRepository } from '../repository/films.repository';
import { FilmsPostgreRepository } from '../repository/filmsPostgre.repository';

@Module({})
export class DatabaseModule {
  static register(dbms: string): DynamicModule {
    const imports = [];
    const providers: Provider[] = [];
    const exports = [];

    switch (dbms) {
      case 'mongodb':
        imports.push(
          MongooseModule.forRoot(applicationConfig.DATABASE_URL),
          MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
        );
        providers.push({
          provide: 'FILMS_REPOSITORY',
          useClass: FilmsRepository,
        });
        exports.push('FILMS_REPOSITORY');
        break;

      case 'postgres':
      default:
        imports.push(
          TypeOrmModule.forRoot({
            type: 'postgres',
            host: applicationConfig.DB_HOST,
            port: +applicationConfig.DB_PORT,
            username: applicationConfig.DB_USERNAME,
            password: applicationConfig.DB_PASSWORD,
            database: applicationConfig.DB_NAME,
            entities: [FilmEntity, ScheduleEntity],
            synchronize: false,
            logging: true,
          }),
          TypeOrmModule.forFeature([FilmEntity, ScheduleEntity]),
        );
        break;
    }

    return {
      module: DatabaseModule,
      imports,
      providers,
      exports,
    };
  }
}
