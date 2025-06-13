import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'avatares' })
export class Avatar extends Document {
  @Prop({ required: true, unique: true, trim: true })
  nombre: string;

  @Prop({ required: true })
  ruta_imagen: string; // Podrías usar un validador de URL en el DTO

  @Prop({ required: true })
  nivel_desbloqueo: number;

  @Prop({ trim: true }) // El color es opcional
  color_asociado: string;
}

export const AvatarSchema = SchemaFactory.createForClass(Avatar);