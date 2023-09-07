/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { CheckpointsService } from './checkpoints.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';

describe('CheckpointsService', () => {
  let service: CheckpointsService;
  let modRef: TestingModule;

  beforeEach(async () => {
    modRef = await Test.createTestingModule({
      providers: [
        {
          provide: CheckpointsService,
          useFactory: () => ({
            getAllCheckpointsByOrderNumber: jest.fn(() => []),
            getAllCheckpoints: jest.fn(() => []),
            createCheckpoint: jest.fn(() => {}),
            importCSV: jest.fn(() => []),
          }),
        },
      ],
    }).compile();

    service = modRef.get<CheckpointsService>(CheckpointsService);
  });

  afterEach(async () => {
    await modRef.close();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call getAllCheckpointsByOrderNumber method', async () => {
    const getAllCheckpointsByOrderIdSpy = jest.spyOn(
      service,
      'getAllCheckpointsByOrderNumber',
    );
    service.getAllCheckpointsByOrderNumber('order_id');
    expect(getAllCheckpointsByOrderIdSpy).toHaveBeenCalled();
    expect(getAllCheckpointsByOrderIdSpy).toHaveBeenCalledWith('order_id');
  });
  it('should call getAllCheckpoints method', async () => {
    const getAllCheckpointsSpy = jest.spyOn(service, 'getAllCheckpoints');
    service.getAllCheckpoints();
    expect(getAllCheckpointsSpy).toHaveBeenCalled();
  });
  it('should call importCSV method', async () => {
    const importCSVSpy = jest.spyOn(service, 'importCSV');
    service.importCSV({} as Express.Multer.File);
    expect(importCSVSpy).toHaveBeenCalled();
    expect(importCSVSpy).toHaveBeenCalledWith({});
  });
  it('should call createCheckpoint method', async () => {
    const createCheckpointSpy = jest.spyOn(service, 'createCheckpoint');
    const dto = new CreateCheckpointDto();
    service.createCheckpoint(dto);
    expect(createCheckpointSpy).toHaveBeenCalled();
    expect(createCheckpointSpy).toHaveBeenCalledWith(dto);
  });
});
