import mongoose from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CircuitsService } from '../circuits.service';
import { Circuit, CircuitSchema } from '../entities/circuit.schema';
import { skip } from 'node:test';
import setupCrud from '../../../test/setup/setup.crud';
import mockDB from '../../mocks/circuits.json';
import { randomUUID } from 'node:crypto';

describe('CircuitsService', () => {
  let service: CircuitsService;
  let CircuitsModel;
  let mockData;
  
  // beforeAll(async () => {
  // });

  // afterAll(async () => {
  // }); 

  beforeEach(async () => {
    const code = randomUUID().slice(0,4);
    setupCrud.dbConnect(code);
    CircuitsModel = mongoose.model('Circuit', CircuitSchema);
    await CircuitsModel.init();
    mockData = setupCrud.formatData(mockDB);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CircuitsService,
        { provide: getModelToken(Circuit.name), useValue: CircuitsModel }
      ],
    }).compile();

    service = module.get<CircuitsService>(CircuitsService);
    await CircuitsModel.insertMany(mockData);
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
    
    it('should return all circuits sucessfully', async () => {
      const result = await service.findAll();
      const resultStr = result.map(item => JSON.stringify(item));
      mockData.map((item: any) => {
        const itemStr = JSON.stringify(item);
        expect(resultStr.includes(itemStr)).toBe(true);
      });
    });

    it('should create a new circuit', async () => {
      let created: any;
      let circuit = {
        "circuitId": 999,
        "circuitRef": "maringa_park",
        "name": "Autódromo Internacional de Maringá",
        "location": "Maringá",
        "country": "Brazil",
        "lat": -99.9999,
        "lng": 88.888,
        "alt": 99,
        "url": "http://google.com"
      }

      created = await service.create(circuit);
      circuit = setupCrud.addIdAndVersion(circuit, created._id);
      expect(await CircuitsModel.findById(created._id).lean()).toEqual(circuit);

    });

    it('should return sucessfully one circuit found by his id', async () => {
      const id = '66d82d6be18598e190775ba7';
      const result = await service.findById(id);
      const expected = await CircuitsModel.findById(id);
      
      expect(result).toEqual(expected);
    });

    it('should update sucessfully one circuit found by his id', async () =>{
      const id = '66d82c3be18598e190763ad6';
      let circuit = {
        "circuitRef": "maringa_park",
        "name": "Autódromo Internacional de Maringá",
        "location": "Maringá",
        "country": "Brazil",
        "lat": -99.9999,
        "lng": 88.888,
        "alt": 99,
        "url": "http://google.com"
      }

      const updated = await service.update(id, circuit);
      const updatedAsObject = updated.toObject();

      circuit['circuitId'] = 6;
      circuit = setupCrud.addIdAndVersion(circuit, id);

      expect(updatedAsObject).toEqual(circuit);

    });

    it('should delete sucessfully one circuit found by his id', async () =>{
      const id = '66d82c3be18598e190763ad5';
      let objectToDelete = {
        "circuitId": 5,
        "circuitRef": "istanbul",
        "name": "Istanbul Park",
        "location": "Istanbul",
        "country": "Turkey",
        "lat": 40.9517,
        "lng": 29.405,
        "alt": 130,
        "url": "http://en.wikipedia.org/wiki/Istanbul_Park"
      }

      objectToDelete = setupCrud.addIdAndVersion(objectToDelete, id)
      
      const deleted = await service.remove(id);
      const deletedAsObject = deleted.toObject();

      const expected = await CircuitsModel.findById(id);

      expect(deletedAsObject).toEqual(objectToDelete);
      expect(expected).toBeNull();

    });
    
  });

});
