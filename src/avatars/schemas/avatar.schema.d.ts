import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AvatarDocument = Avatar & Document;

@Schema({ timestamps: true, collection: 'avatars' }) // `collection` especifica el nombre en MongoDB
export class Avatar {
  // _id será generado por Mongoose

  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ required: true, trim: true })
  rutaImagen: string;

  @Prop({ required: true, type: Number })
  nivelDesbloqueo: number;

  @Prop({ trim: true })
  colorAsociado?: string;
}

export const AvatarSchema = SchemaFactory.createForClass(Avatar);