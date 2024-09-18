import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import mongoose from 'mongoose';

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
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('Test DB connection', () => {
    it('Connection should not be null', async () => {
      const connection = await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@0.0.0.0:${process.env.DB_PORT}`, {dbName: `f1-stats-${process.env.ENV_LOWER}`});
      expect(connection).not.toBeNull();
      expect(connection).not.toBeUndefined();
      await mongoose.connection.close();
    });
  });

});
