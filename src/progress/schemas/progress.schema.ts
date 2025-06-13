import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose'; // Importar Schema como MongooseSchema para evitar conflictos de nombre
import { Achievement } from '../../achievements/schemas/achievement.schema';
import { Users } from 'src/users/schemas/users.schema';
export type ProgressDocument = Progress & Document;

@Schema({ timestamps: true, collection: 'progresses' })
export class Progress {
  // _id será generado por Mongoose

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users', required: true }) // Usar MongooseSchema.Types.ObjectId y referenciar a 'Users'
  user: Users | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Achievement', required: true })
  achievement: Achievement | Types.ObjectId;

  // ERD dice float, Mongoose usa Number para esto.
  @Prop({ type: Number, required: true, min: 0, max: 100 })
  porcentaje: number;
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);

// Asegurar que un usuario solo tenga un registro de progreso por logro.
ProgressSchema.index({ user: 1, achievement: 1 }, { unique: true });