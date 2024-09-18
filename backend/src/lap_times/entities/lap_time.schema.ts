import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class LapTime {
    @Prop() raceId: number;

    @Prop() driverId: number;

    @Prop() lap: number;

    @Prop() position: number;

    @Prop() time: string;

    @Prop() milliseconds: number;    
}

export const LapTimeSchema = SchemaFactory.createForClass(LapTime);
