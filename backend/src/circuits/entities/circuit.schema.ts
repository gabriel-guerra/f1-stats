import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Circuit {

    @Prop()
    circuitId: number;

    @Prop()
    circuitRef: string;

    @Prop()
    name: string;

    @Prop()
    location: string;

    @Prop()
    country: string;

    @Prop()
    lat: number;

    @Prop()
    lng: number;

    @Prop()
    alt: number;

    @Prop()
    url: string;

}

export const CircuitSchema = SchemaFactory.createForClass(Circuit);