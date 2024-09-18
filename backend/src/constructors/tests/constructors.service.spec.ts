import { Test, TestingModule } from '@nestjs/testing';
import { ConstructorsService } from '../constructors.service';
import mongoose from 'mongoose';
import { Constructor, ConstructorSchema } from '../entities/constructor.schema';
import { getModelToken } from '@nestjs/mongoose';
import mockDB from '../../mocks/constructors.json';
import setupCrud from '../../../test/setup/setup.crud';
import { skip } from 'node:test';
import { randomUUID } from 'node:crypto';

describe('ConstructorsService', () => {
  let service: ConstructorsService;
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
      providers: [
        ConstructorsService,
        { provide: getModelToken(Constructor.name), useValue: ConstructorsModel }
      ],
    }).compile();
    service = module.get<ConstructorsService>(ConstructorsService);
    await ConstructorsModel.insertMany(mockData);
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  // Start testing
  describe('Unit tests', () => {
    
    it('should return all constructors sucessfully', async () => {
      const result = await service.findAll();
      const resultStr = result.map(item => JSON.stringify(item))
      mockData.map((item: any) => {
        const itemStr = JSON.stringify(item);
        expect(resultStr.includes(itemStr)).toBe(true)
      })  
    });

    it('should return empty list', async () => {
      await ConstructorsModel.deleteMany();
      expect(await service.findAll()).toEqual([]);
    });

    it('should create a new constructor', async () => {
      let created: any;

      const constructor = {
          "constructorId": 999,
          "constructorRef": "brr",
          "name": "Brazilian Racing",
          "nationality": "Brazilian",
          "url": "http://google.com"
      }

      created = await service.create(constructor);
      
      constructor['_id'] = new mongoose.Types.ObjectId(created._id);
      constructor['__v'] = 0;

      expect(await ConstructorsModel.findById(created._id).lean()).toEqual(constructor);

    });

    it('should return sucessfully one constructor found by his id', async () => {
      const id = '66d82d6be18598e190775ba7'
      const result = await service.findById(id);
      const expected = await ConstructorsModel.findById(id);
      
      expect(result).toEqual(expected);
    });

    it('should update sucessfully one constructor found by his id', async () =>{
      const id = '66d82d6be18598e190775ba7';
        const constructor = {
          "constructorRef": "brr",
          "name": "Brazilian Racing",
          "nationality": "Brazilian",
          "url": "http://google.com"
        }

      const updated = await service.update(id, constructor);
      const updatedAsObject = updated.toObject();

      constructor['constructorId'] = 6;
      constructor['_id'] = new mongoose.Types.ObjectId(id);
      constructor['__v'] = 0;

      expect(updatedAsObject).toEqual(constructor);

    });

    it('should delete sucessfully one constructor found by his id', async () =>{
      const id = '66d82d6be18598e190775ba6';
      const objectToDelete = {
        "constructorId": 5,
        "constructorRef": "toro_rosso",
        "name": "Toro Rosso",
        "nationality": "Italian",
        "url": "http://en.wikipedia.org/wiki/Scuderia_Toro_Rosso"
      }
      objectToDelete['_id'] = new mongoose.Types.ObjectId(id);
      objectToDelete['__v'] = 0;
      
      const deleted = await service.remove(id);
      const deletedAsObject = deleted.toObject();

      const expected = await ConstructorsModel.findById(id);

      expect(deletedAsObject).toEqual(objectToDelete);
      expect(expected).toBeNull();

    });
    
  });

});
  