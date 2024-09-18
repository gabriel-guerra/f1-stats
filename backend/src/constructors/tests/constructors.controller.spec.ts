import mongoose from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConstructorsService } from '../constructors.service';
import { Constructor, ConstructorSchema } from '../entities/constructor.schema';
import { ConstructorsController } from '../constructors.controller';
import { skip } from 'node:test';
import setupCrud from '../../../test/setup/setup.crud';
import mockDB from '../../mocks/constructors.json';
import { randomUUID } from 'node:crypto';

describe('ConstructorsController', () => {
  let controller: ConstructorsController;
  let ConstructorsModel;
  let mockData;
  
  // beforeAll(async () => {
  // });

  // afterAll(async () => {
  // }); 

  beforeEach(async () => {
    const code = randomUUID().slice(0,4);
    setupCrud.dbConnect(code);
    ConstructorsModel = mongoose.model('Constructor', ConstructorSchema);
    await ConstructorsModel.init();
    mockData = setupCrud.formatData(mockDB);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstructorsController],
      providers: [
        ConstructorsService,
        { provide: getModelToken(Constructor.name), useValue: ConstructorsModel }
      ],
    }).compile();

    controller = module.get<ConstructorsController>(ConstructorsController);
    await ConstructorsModel.insertMany(mockData);
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

    it('should create a new constructor', async () => {
      let created: any;
      let constructor = {
          "constructorId": 999,
          "constructorRef": "brr",
          "name": "Brazilian Racing",
          "nationality": "Brazilian",
          "url": "http://google.com"
      }

      created = await controller.create(constructor);
      constructor = setupCrud.addIdAndVersion(constructor, created._id);
      expect(await ConstructorsModel.findById(created._id).lean()).toEqual(constructor);

    });

    it('should return sucessfully one constructor found by his id', async () => {
      const id = '66d82d6be18598e190775ba7';
      const result = await controller.findById(id);
      const expected = await ConstructorsModel.findById(id);
      
      expect(result).toEqual(expected);
    });

    it('should update sucessfully one constructor found by his id', async () =>{
      const id = '66d82d6be18598e190775ba7';
      let constructor = {
        "constructorRef": "brr",
        "name": "Brazilian Racing",
        "nationality": "Brazilian",
        "url": "http://google.com"
      }

      const updated = await controller.update(id, constructor);
      const updatedAsObject = updated.toObject();

      constructor['constructorId'] = 6;
      constructor = setupCrud.addIdAndVersion(constructor, id);

      expect(updatedAsObject).toEqual(constructor);

    });

    it('should delete sucessfully one constructor found by his id', async () =>{
      const id = '66d82d6be18598e190775ba6';
      let objectToDelete = {
        "constructorId": 5,
        "constructorRef": "toro_rosso",
        "name": "Toro Rosso",
        "nationality": "Italian",
        "url": "http://en.wikipedia.org/wiki/Scuderia_Toro_Rosso"
      }

      objectToDelete = setupCrud.addIdAndVersion(objectToDelete, id)
      
      const deleted = await controller.remove(id);
      const deletedAsObject = deleted.toObject();

      const expected = await ConstructorsModel.findById(id);

      expect(deletedAsObject).toEqual(objectToDelete);
      expect(expected).toBeNull();

    });
    
  });

});
