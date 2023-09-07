import { Test, TestingModule } from '@nestjs/testing';
import { CheckpointsController } from './checkpoints.controller';
import { CheckpointsService } from './checkpoints.service';

describe('CheckpointsController', () => {
  let controller: CheckpointsController;
  let modRef: TestingModule;
  let service: CheckpointsService;

  beforeEach(async () => {
    modRef = await Test.createTestingModule({
      controllers: [CheckpointsController],
      providers: [
        {
          provide: CheckpointsService,
          useFactory: () => ({
            getAllCheckpointsByTrackingNumber: jest.fn(() => []),
          }),
        },
      ],
    }).compile();

    controller = modRef.get<CheckpointsController>(CheckpointsController);
    service = modRef.get<CheckpointsService>(CheckpointsService);
  });

  afterEach(async () => {
    await modRef.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('calling getAllCheckpointsByTrackingNumber method', () => {
    controller.getAllCheckpointsByTrackingNumber('111');
    expect(service.getAllCheckpointsByTrackingNumber).toHaveBeenCalled();
    expect(service.getAllCheckpointsByTrackingNumber).toHaveBeenCalledWith(
      '111',
    );
  });
});
