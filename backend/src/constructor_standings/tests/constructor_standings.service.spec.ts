import mongoose from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { skip } from 'node:test';
import setupCrud from '../../../test/setup/setup.crud';
import mockDB from '../../mocks/constructor_standings.json';
import { randomUUID } from 'node:crypto';
import { ConstructorStanding, ConstructorStandingSchema } from '../entities/constructor_standing.schema';
import { ConstructorStandingsService } from '../constructor_standings.service';

describe('ConstructorStandingService', () => {
  let service: ConstructorStandingsService;
  let ConstructorStandingsModel;
  let mockData;
  
  // beforeAll(async () => {
  // });

  // afterAll(async () => {
  // }); 

  beforeEach(async () => {
    const code = randomUUID().slice(0,4);
    setupCrud.dbConnect(code);
    ConstructorStandingsModel = mongoose.model('ConstructorStanding', ConstructorStandingSchema);
    await ConstructorStandingsModel.init();
    mockData = setupCrud.formatData(mockDB);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConstructorStandingsService,
        { provide: getModelToken(ConstructorStanding.name), useValue: ConstructorStandingsModel }
      ],
    }).compile();

    service = module.get<ConstructorStandingsService>(ConstructorStandingsService);
    await ConstructorStandingsModel.insertMany(mockData);
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase()
    await mongoose.connection.close();
  });

  //Start testing
  describe('Unit tests', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
    
    it('should return all constructorStandings sucessfully', async () => {
      const result = await service.findAll();
      const resultStr = result.map(item => JSON.stringify(item));
      mockData.map((item: any) => {
        const itemStr = JSON.stringify(item);
        expect(resultStr.includes(itemStr)).toBe(true);
      });
    });

    it('should create a new constructorStanding', async () => {
      let created: any;
      let constructorStanding = {
        "constructorStandingsId": 999,
        "raceId": 18,
        "constructorId": 1,
        "points": 14,
        "position": 1,
        "positionText": "1",
        "wins": 1
      }

      created = await service.create(constructorStanding);
      constructorStanding = setupCrud.addIdAndVersion(constructorStanding, created._id);
      expect(await ConstructorStandingsModel.findById(created._id).lean()).toEqual(constructorStanding);

    });

    it('should return sucessfully one constructorStanding found by his id', async () => {
      const id = '66d82d60e18598e1907727cf';
      const result = await service.findById(id);
      const expected = await ConstructorStandingsModel.findById(id);
      
      expect(result).toEqual(expected);
    });

    it('should update sucessfully one constructorStanding found by his id', async () =>{
      const id = '66d82d60e18598e1907727cf';
      let constructorStanding = {
        "raceId": 18,
        "constructorId": 6,
        "points": 1,
        "position": 6,
        "positionText": "6",
        "wins": 0
      }

      const updated = await service.update(id, constructorStanding);
      const updatedAsObject = updated.toObject();

      constructorStanding['constructorStandingsId'] = 6;
      constructorStanding = setupCrud.addIdAndVersion(constructorStanding, id);

      expect(updatedAsObject).toEqual(constructorStanding);

    });

    it('should delete sucessfully one constructorStanding found by his id', async () =>{
      const id = '66d82d60e18598e1907727ce';
      let objectToDelete = {
        "constructorStandingsId": 5,
        "raceId": 18,
        "constructorId": 5,
        "points": 2,
        "position": 5,
        "positionText": "5",
        "wins": 0
      }

      objectToDelete = setupCrud.addIdAndVersion(objectToDelete, id)
      
      const deleted = await service.remove(id);
      const deletedAsObject = deleted.toObject();

      const expected = await ConstructorStandingsModel.findById(id);

      expect(deletedAsObject).toEqual(objectToDelete);
      expect(expected).toBeNull();

    });
    
  });

});
