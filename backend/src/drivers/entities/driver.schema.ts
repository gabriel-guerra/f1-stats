import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Driver {
    @Prop()
    driverId: number;

    @Prop()
    driverRef: string;

    @Prop()
    number: string;

    @Prop()
    code: string;

    @Prop()
    forename: string;

    @Prop()
    surname: string;

    @Prop()
    dob: string;

    @Prop()
    nationality: string;

    @Prop()
    url: string;

}

export const DriverSchema = SchemaFactory.createForClass(Driver);
