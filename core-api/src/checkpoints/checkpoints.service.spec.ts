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
            getAllCheckpointsByTrackingNumber: jest.fn(() => []),
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

  it('should call getAllCheckpointsByTrackingNumber method', async () => {
    const getAllCheckpointsByTrackingNumberSpy = jest.spyOn(
      service,
      'getAllCheckpointsByTrackingNumber',
    );
    service.getAllCheckpointsByTrackingNumber('tracking_number');
    expect(getAllCheckpointsByTrackingNumberSpy).toHaveBeenCalled();
    expect(getAllCheckpointsByTrackingNumberSpy).toHaveBeenCalledWith(
      'tracking_number',
    );
  });
});
