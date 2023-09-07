import { Test, TestingModule } from '@nestjs/testing';
import { CheckpointsService } from './checkpoints.service';

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
});
