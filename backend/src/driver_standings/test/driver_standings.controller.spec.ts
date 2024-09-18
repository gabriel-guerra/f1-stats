import mongoose from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { skip } from 'node:test';
import setupCrud from '../../../test/setup/setup.crud';
import mockDB from '../../mocks/driver_standings.json';
import { randomUUID } from 'node:crypto';
import { DriverStanding, DriverStandingSchema } from '../entities/driver_standing.schema';
import { DriverStandingsController } from '../driver_standings.controller';
import { DriverStandingsService } from '../driver_standings.service';

describe('DriverStandingController', () => {
  let controller: DriverStandingsController;
  let DriverStandingModel;
  let mockData;
  
  // beforeAll(async () => {
  // });

  // afterAll(async () => {
  // }); 

  beforeEach(async () => {
    const code = randomUUID().slice(0,4);
    setupCrud.dbConnect(code);
    DriverStandingModel = mongoose.model('DriverStanding', DriverStandingSchema);
    await DriverStandingModel.init();
    mockData = setupCrud.formatData(mockDB);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverStandingsController],
      providers: [
        DriverStandingsService,
        { provide: getModelToken(DriverStanding.name), useValue: DriverStandingModel }
      ],
    }).compile();

    controller = module.get<DriverStandingsController>(DriverStandingsController);
    await DriverStandingModel.insertMany(mockData);
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase()
    await mongoose.connection.close();
  });

  //Start testing
  describe('Unit tests', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
    
    it('should return all driver standings sucessfully', async () => {
      const result = await controller.findAll();
      const resultStr = result.map(item => JSON.stringify(item));
      mockData.map((item: any) => {
        const itemStr = JSON.stringify(item);
        expect(resultStr.includes(itemStr)).toBe(true);
      });
    });

    it('should create a new driverStanding', async () => {
      let created: any;
      let driverStanding = {
        "driverStandingsId": 999,
        "raceId": 19,
        "driverId": 4,
        "points": 6,
        "position": 7,
        "positionText": "7",
        "wins": 0
      }

      created = await controller.create(driverStanding);
      driverStanding = setupCrud.addIdAndVersion(driverStanding, created._id);
      expect(await DriverStandingModel.findById(created._id).lean()).toEqual(driverStanding);

    });

    it('should return sucessfully one driverStanding found by his id', async () => {
      const id = '66d82d91e18598e190775c7c';
      const result = await controller.findById(id);
      const expected = await DriverStandingModel.findById(id);
      
      expect(result).toEqual(expected);
    });

    it('should update sucessfully one driverStanding found by his id', async () =>{
      const id = '66d82d91e18598e190775c7c';
      let driverStanding = {
        "raceId": 19,
        "driverId": 4,
        "points": 6,
        "position": 7,
        "positionText": "7",
        "wins": 0
      }

      const updated = await controller.update(id, driverStanding);
      const updatedAsObject = updated.toObject();

      driverStanding['driverStandingsId'] = 6;
      driverStanding = setupCrud.addIdAndVersion(driverStanding, id);

      expect(updatedAsObject).toEqual(driverStanding);

    });

    it('should delete sucessfully one driverStanding found by his id', async () =>{
      const id = '66d82d91e18598e190775c7b';
      let objectToDelete = {
        "driverStandingsId": 5,
        "raceId": 18,
        "driverId": 5,
        "points": 4,
        "position": 5,
        "positionText": "5",
        "wins": 0
      }

      objectToDelete = setupCrud.addIdAndVersion(objectToDelete, id)
      
      const deleted = await controller.remove(id);
      const deletedAsObject = deleted.toObject();

      const expected = await DriverStandingModel.findById(id);

      expect(deletedAsObject).toEqual(objectToDelete);
      expect(expected).toBeNull();

    });
    
  });

});
