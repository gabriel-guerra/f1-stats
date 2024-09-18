import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Constructor {
    
    @Prop()
    constructorId: number;
    
    @Prop()
    constructorRef: string;

    @Prop()
    name: string;

    @Prop()
    nationality: string;

    @Prop()
    url: string;
}

export const ConstructorSchema = SchemaFactory.createForClass(Constructor);