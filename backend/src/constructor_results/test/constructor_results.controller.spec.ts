import mongoose from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConstructorResultsService } from '../constructor_results.service';
import { ConstructorResult, ConstructorResultSchema } from '../entities/constructor_result.schema';
import { ConstructorResultsController } from '../constructor_results.controller';
import { skip } from 'node:test';
import setupCrud from '../../../test/setup/setup.crud';
import mockDB from '../../mocks/constructor_results.json';
import { randomUUID } from 'node:crypto';

describe('ConstructorResultsController', () => {
  let controller: ConstructorResultsController;
  let ConstructorResultModel;
  let mockData;
  
  // beforeAll(async () => {
  // });

  // afterAll(async () => {
  // }); 

  beforeEach(async () => {
    const code = randomUUID().slice(0,4);
    setupCrud.dbConnect(code);
    ConstructorResultModel = mongoose.model('ConstructorResults', ConstructorResultSchema);
    await ConstructorResultModel.init();
    mockData = setupCrud.formatData(mockDB);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstructorResultsController],
      providers: [
        ConstructorResultsService,
        { provide: getModelToken(ConstructorResult.name), useValue: ConstructorResultModel }
      ],
    }).compile();

    controller = module.get<ConstructorResultsController>(ConstructorResultsController);
    await ConstructorResultModel.insertMany(mockData);
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
    
    it('should return all constructors sucessfully', async () => {
      const result = await controller.findAll();
      const resultStr = result.map(item => JSON.stringify(item));
      mockData.map((item: any) => {
        const itemStr = JSON.stringify(item);
        expect(resultStr.includes(itemStr)).toBe(true);
      });
    });

    it('should create a new constructorResult', async () => {
      let created: any;
      let constructorResult = {
          "constructorResultsId": 1,
          "raceId": 18,
          "constructorId": 1,
          "points": 14,
          "status": "\\N"
      }

      created = await controller.create(constructorResult);
      constructorResult = setupCrud.addIdAndVersion(constructorResult, created._id);
      expect(await ConstructorResultModel.findById(created._id).lean()).toEqual(constructorResult);

    });

    it('should return sucessfully one constructorResult found by his id', async () => {
      const id = '66d82cbee18598e190763b25';
      const result = await controller.findById(id);
      const expected = await ConstructorResultModel.findById(id);
      
      expect(result).toEqual(expected);
    });

    it('should update sucessfully one constructorResult found by his id', async () =>{
      const id = '66d82cbee18598e190763b25';
      let constructorResult = {
        "raceId": 18,
        "constructorId": 6,
        "points": 1,
        "status": "\\N"
      }

      const updated = await controller.update(id, constructorResult);
      const updatedAsObject = updated.toObject();

      constructorResult['constructorResultsId'] = 6;
      constructorResult = setupCrud.addIdAndVersion(constructorResult, id);

      expect(updatedAsObject).toEqual(constructorResult);

    });

    it('should delete sucessfully one constructorResult found by his id', async () =>{
      const id = '66d82cbee18598e190763b24';
      let objectToDelete = {
        "constructorResultsId": 5,
        "raceId": 18,
        "constructorId": 5,
        "points": 2,
        "status": "\\N"
      }

      objectToDelete = setupCrud.addIdAndVersion(objectToDelete, id)
      
      const deleted = await controller.remove(id);
      const deletedAsObject = deleted.toObject();

      const expected = await ConstructorResultModel.findById(id);

      expect(deletedAsObject).toEqual(objectToDelete);
      expect(expected).toBeNull();

    });
    
  });

});
