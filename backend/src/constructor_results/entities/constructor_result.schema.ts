import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class ConstructorResult {
    @Prop()
    constructorResultsId: number;

    @Prop()
    raceId: number;

    @Prop()
    constructorId: number;

    @Prop()
    points: number;

    @Prop()
    status: string;

}

export const ConstructorResultSchema = SchemaFactory.createForClass(ConstructorResult);
