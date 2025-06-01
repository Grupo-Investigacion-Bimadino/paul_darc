import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Avatar } from '../../avatars/schemas/avatar.schema';

export type AchievementDocument = Achievement & Document;

@Schema({ timestamps: true, collection: 'achievements' })
export class Achievement {
  // _id será generado por Mongoose

  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ trim: true })
  descripcion?: string;

  @Prop({ required: true, type: Number })
  nivel: number; // Nivel del logro en sí

  // El ERD indica que un logro "desbloquea" un avatar.
  // Esto implica que un logro está asociado a UN avatar que se desbloquea.
  @Prop({ type: Types.ObjectId, ref: 'Avatar', required: true })
  avatarDesbloqueado: Avatar | Types.ObjectId; // El avatar que este logro desbloquea

  // El ERD tiene `id_avatar` como FK en LOGROS y `ruta_imagen` en AVATARES.
  // Si un logro en sí mismo tiene una imagen *adicional* al avatar que desbloquea,
  // puedes añadirla aquí. Si no, la imagen es la del `avatarDesbloqueado`.
  // @Prop({ trim: true })
  // rutaImagenLogro?: string;
}

export const AchievementSchema = SchemaFactory.createForClass(Achievement);