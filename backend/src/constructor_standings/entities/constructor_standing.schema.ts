import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class ConstructorStanding {
    @Prop()
    constructorStandingsId: number;
    
    @Prop()
    raceId: number;
    
    @Prop()
    constructorId: number;
    
    @Prop()
    points: number;
    
    @Prop()
    position: number;
    
    @Prop()
    positionText: string;
    
    @Prop()
    wins: number;   
}

export const ConstructorStandingSchema = SchemaFactory.createForClass(ConstructorStanding);
