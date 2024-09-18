import mongoose from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { skip } from 'node:test';
import setupCrud from '../../../test/setup/setup.crud';
import mockDB from '../../mocks/drivers.json';
import { randomUUID } from 'node:crypto';
import { DriversController } from '../drivers.controller';
import { Driver, DriverSchema } from '../entities/driver.schema';
import { DriversService } from '../drivers.service';

describe('DriverController', () => {
  let controller: DriversController;
  let DriverModel;
  let mockData;
  
  // beforeAll(async () => {
  // });

  // afterAll(async () => {
  // }); 

  beforeEach(async () => {
    const code = randomUUID().slice(0,4);
    setupCrud.dbConnect(code);
    DriverModel = mongoose.model('Driver', DriverSchema);
    await DriverModel.init();
    mockData = setupCrud.formatData(mockDB);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriversController],
      providers: [
        DriversService,
        { provide: getModelToken(Driver.name), useValue: DriverModel }
      ],
    }).compile();

    controller = module.get<DriversController>(DriversController);
    await DriverModel.insertMany(mockData);
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

    it('should create a new driver', async () => {
      let created: any;
      let driver = {
        "driverId": 999,
        "driverRef": "gabiru",
        "number": "\\N",
        "code": "GAB",
        "forename": "Gabriel",
        "surname": "Guerra",
        "dob": "1997-03-14T00:00:00.000Z",
        "nationality": "Brazilian",
        "url": "http://github.com/gabriel-guerra"
      }

      created = await controller.create(driver);
      driver = setupCrud.addIdAndVersion(driver, created._id);
      expect(await DriverModel.findById(created._id).lean()).toEqual(driver);

    });

    it('should return sucessfully one driver found by his id', async () => {
      const id = '66d82e4de18598e19077e3a2';
      const result = await controller.findById(id);
      const expected = await DriverModel.findById(id);
      
      expect(result).toEqual(expected);
    });

    it('should update sucessfully one driver found by his id', async () =>{
      const id = '66d82e4de18598e19077e3a2';
      let driver = {
        "driverRef": "nakajima",
        "number": "\\N",
        "code": "NAK",
        "forename": "Kazuki",
        "surname": "Nakajima",
        "dob": "1985-01-11T00:00:00.000Z",
        "nationality": "Japanese",
        "url": "http://en.wikipedia.org/wiki/Kazuki_Nakajima"
      }

      const updated = await controller.update(id, driver);
      const updatedAsObject = updated.toObject();

      driver['driverId'] = 6;
      driver = setupCrud.addIdAndVersion(driver, id);

      expect(updatedAsObject).toEqual(driver);

    });

    it('should delete sucessfully one driver found by his id', async () =>{
      const id = '66d82e4de18598e19077e3a1';
      let objectToDelete = {
        "driverId": 5,
        "driverRef": "kovalainen",
        "number": "\\N",
        "code": "KOV",
        "forename": "Heikki",
        "surname": "Kovalainen",
        "dob": "1981-10-19T00:00:00.000Z",
        "nationality": "Finnish",
        "url": "http://en.wikipedia.org/wiki/Heikki_Kovalainen"
      }

      objectToDelete = setupCrud.addIdAndVersion(objectToDelete, id)
      
      const deleted = await controller.remove(id);
      const deletedAsObject = deleted.toObject();

      const expected = await DriverModel.findById(id);

      expect(deletedAsObject).toEqual(objectToDelete);
      expect(expected).toBeNull();

    });
    
  });

});
