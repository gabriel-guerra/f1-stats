import mongoose from "mongoose";

class SetupCrud{
    async dbConnect(code: string){
        await mongoose.connect(
            `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@0.0.0.0:${process.env.DB_PORT}`, 
            {dbName: `f1-stats-${process.env.ENV_LOWER}-${code}`}
        );
    }

    formatData(mockDB: any){
        let mockData = mockDB.map(
            (item: any) => ({
              ...item,
              _id: new mongoose.Types.ObjectId(item._id)
            })
        );
        mockData.map((item) => item['__v'] = 0);
        return mockData;
    }

    addIdAndVersion(item: any, id: string){
        item['_id'] = new mongoose.Types.ObjectId(id);
        item['__v'] = 0;

        return item;
    }

}

export default new SetupCrud();