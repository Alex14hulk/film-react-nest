import { ConfigModule } from '@nestjs/config';

export const applicationConfig = process.env;

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5173,
      driver: 'postgres',
      url: process.env.DATABASE_URL || 'postgres://localhost:5173/database',
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      name: process.env.DB_NAME,
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}
export interface AppConfigDatabase {
  host: string;
  driver: string;
  url: string;
  username: string;
  password: string;
}
