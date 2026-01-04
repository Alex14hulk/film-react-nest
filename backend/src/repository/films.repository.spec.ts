import { Test, TestingModule } from '@nestjs/testing';
import { FilmsRepository } from './films.repository';

describe('FilmsRepository', () => {
  let service: FilmsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsRepository],
    }).compile();

    service = module.get<FilmsRepository>(FilmsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
