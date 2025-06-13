// src/users/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'; // <-- IMPORTANTE: necesitamos Types para las referencias
import * as bcrypt from 'bcrypt';

// Tus enums son una excelente práctica, los mantenemos.
export enum UserGender {
  MALE = 'masculino',
  FEMALE = 'femenino',
  OTHER = 'otro',
}

export enum UserRole {
  ADMIN = 'administrador',
  STUDENT = 'estudiante',
  TEACHER = 'profesor',
}

@Schema({
  timestamps: true,
  collection: 'usuarios',
})
export class Users extends Document { // Extender de Document nos da métodos como .save()
  // NO usamos un idUsuario numérico. Nos apoyamos 100% en el _id que Mongoose genera.

  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ type: String, enum: UserGender, required: true })
  sexo: string;

  @Prop({ required: true, trim: true })
  grado: string;

  @Prop({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'El correo electrónico no es válido'],
  })
  correo: string;

  @Prop({ required: true, trim: true })
  institucion: string;

  @Prop({ required: true, select: false }) // select: false es perfecto para contraseñas
  contrasena: string;

  @Prop({ type: String, enum: UserRole, required: true, default: UserRole.STUDENT })
  rol: string;

  // --- AQUÍ EMPIEZA LA MAGIA: TRADUCIENDO EL ERD ---

  /**
   * Relación con LOGROS (Achievements)
   * Un usuario puede tener muchos logros. Guardamos un array de IDs que apuntan a la colección 'achievements'.
   * Esto reemplaza la relación 'alcanza'.
   */
  @Prop([{ type: Types.ObjectId, ref: 'Achievement' }])
  logros: Types.ObjectId[];

  /**
   * Relación con PREGUNTAS (Questions)
   * Guardamos un historial de las respuestas del usuario. Esto es un array de documentos embebidos.
   * Reemplaza la tabla de unión USUARIOS_PREGUNTAS.
   */
  @Prop([{
      _id: false, // No necesitamos un ID para este sub-documento
      pregunta: { type: Types.ObjectId, ref: 'Question', required: true },
      respuestaDada: { type: String, required: true },
      esCorrecta: { type: Boolean, required: true },
      fecha: { type: Date, default: Date.now },
  }])
  historialRespuestas: {
      pregunta: Types.ObjectId;
      respuestaDada: string;
      esCorrecta: boolean;
      fecha: Date;
  }[];

  /**
   * Relación con PROGRESOS (Progress)
   * En lugar de una tabla separada, embebemos el progreso directamente en el usuario.
   * Esto es mucho más eficiente para lecturas.
   */
  @Prop({
      type: {
          porcentajeGeneral: { type: Number, default: 0, min: 0, max: 100 },
          progresoPorRegion: { type: Map, of: Number, default: {} } // Ejemplo: { "Andina": 75, "Caribe": 50 }
      },
      default: { porcentajeGeneral: 0, progresoPorRegion: {} }
  })
  progreso: {
      porcentajeGeneral: number;
      progresoPorRegion: Map<string, number>;
  };
}

export const UsersSchema = SchemaFactory.createForClass(Users);

// Tu middleware de bcrypt es perfecto, lo mantenemos igual.
UsersSchema.pre<Users>('save', async function (next) {
  if (!this.isModified('contrasena')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.contrasena = await bcrypt.hash(this.contrasena, salt);
    return next();
  } catch (error) {
    return next(error as Error);
  }
});
