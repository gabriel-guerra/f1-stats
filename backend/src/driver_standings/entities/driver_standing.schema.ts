import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class DriverStanding {
    @Prop()
    driverStandingsId: number;

    @Prop()
    raceId: number;

    @Prop()
    driverId: number;

    @Prop()
    points: number;

    @Prop()
    position: number;

    @Prop()
    positionText: string;

    @Prop()
    wins: number;
}

export const DriverStandingSchema = SchemaFactory.createForClass(DriverStanding);
