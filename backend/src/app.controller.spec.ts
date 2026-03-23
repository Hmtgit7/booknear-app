import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return health response payload', () => {
      const response = appController.getHello();

      expect(response.message).toBe('Hello World!');
      expect(response.status).toBe('ok');
      expect(new Date(response.timestamp).toString()).not.toBe('Invalid Date');
    });
  });
});
