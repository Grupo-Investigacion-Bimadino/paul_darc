import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Region } from '../../regions/schemas/region.schema';

export type AlertDocument = Alert & Document;

@Schema({ timestamps: true, collection: 'alerts' })
export class Alert {
  // _id será generado por Mongoose

  @Prop({ required: true, trim: true })
  mensaje: string;

  @Prop({ trim: true })
  rutaSonido?: string;

  // Una alerta "pertenece a" o es "generada por" una Región.
  @Prop({ type: Types.ObjectId, ref: 'Region', required: true })
  region: Region | Types.ObjectId;
}

export const AlertSchema = SchemaFactory.createForClass(Alert);