import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'logros' })
export class Achievement extends Document {
  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ required: true, trim: true })
  descripcion: string;

  @Prop({ required: true })
  nivel: number;

  // Relación: Un logro desbloquea UN avatar.
  @Prop({ type: Types.ObjectId, ref: 'Avatar', required: true })
  avatar: Types.ObjectId;
}

export const AchievementSchema = SchemaFactory.createForClass(Achievement);