import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; // No necesitamos Types de mongoose aquí si no hay refs
import * as bcrypt from 'bcrypt';

// Opcional: Enums para 'sexo' y 'rol' si tienen valores fijos
export enum UserGender {
  MALE = 'masculino',
  FEMALE = 'femenino',
  OTHER = 'otro',
  PREFER_NOT_TO_SAY = 'prefiero_no_decir',
}

export enum UserRoleERD { // Nombro UserRoleERD para diferenciarlo del UserRole de antes
  ADMIN = 'administrador', // Ajusta estos valores a los que esperas
  STUDENT = 'estudiante',
  TEACHER = 'profesor',
}

export type UserDocument = User & Document;

@Schema({
  timestamps: true, // Añade createdAt y updatedAt. Quitar si no se desea.
  collection: 'usuarios', // Nombre de la colección según el ERD (pluralizado)
})
export class User {
  // Si id_usuario es un ID de negocio que quieres mantener desde el ERD
  @Prop({
    type: Number, // Como en el ERD es 'int'
    unique: true,
    sparse: true, // Permite que varios documentos tengan 'idUsuario' null si no se provee, pero si se provee, debe ser único
    // Si es autoincremental, Mongoose no lo maneja nativamente, necesitarías un plugin como mongoose-sequence o lógica custom.
    // Por ahora, asumimos que se provee o que confiaremos en _id para las operaciones internas.
  })
  idUsuario?: number; // El PK 'id_usuario' del ERD

  @Prop({
    required: true,
    trim: true,
  })
  nombre: string; // Corresponde a 'nombre' en el ERD

  @Prop({
    type: String,
    enum: UserGender, // Opcional, si usas el enum
    // required: true, // Descomenta si 'sexo' es obligatorio
    trim: true,
  })
  sexo?: string; // Corresponde a 'sexo' en el ERD

  @Prop({
    // required: true, // Descomenta si 'grado' es obligatorio
    trim: true,
  })
  grado?: string; // Corresponde a 'grado' en el ERD

  @Prop({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'El correo electrónico no es válido'],
    index: true,
  })
  correo: string; // Corresponde a 'correo' en el ERD

  @Prop({
    // required: true, // Descomenta si 'institucion' es obligatoria
    trim: true,
  })
  institucion?: string; // Corresponde a 'institucion' en el ERD

  @Prop({
    required: true,
    select: false, // No se devuelve en consultas por defecto
  })
  contrasena: string; // Corresponde a 'contrasena' en el ERD

  @Prop({
    type: String,
    enum: UserRoleERD, // Opcional, si usas el enum
    // required: true, // Descomenta si 'rol' es obligatorio
    trim: true,
  })
  rol?: string; // Corresponde a 'rol' en el ERD

  // Los campos username, status, picture, que estaban antes, se omiten porque no están en el ERD de USUARIOS.
}

export const UserSchema = SchemaFactory.createForClass(User);

// Middleware para hashear la contraseña
UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('contrasena')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.contrasena = await bcrypt.hash(this.contrasena, salt);
    next();
  } catch (error) {
    if (error instanceof Error) {
        return next(error);
    }
    return next(new Error('Error al hashear la contraseña'));
  }
});

// Si idUsuario es un ID que quieres que sea el principal para búsquedas y único,
// asegúrate de manejar su generación o asignación adecuadamente.
// Si `idUsuario` fuera el `_id` que quieres usar (y no el ObjectId de Mongoose),
// tendrías que configurar el schema de forma diferente:
// @Schema({ _id: false, timestamps: true, collection: 'usuarios' })
// y luego definir `idUsuario` como el campo que actúa como `_id`:
// @Prop({ type: Number, required: true, unique: true, alias: '_id' })
// idUsuario: number;
// Pero esto es menos común y puede complicar las referencias con Types.ObjectId.
// Es más simple mantener `idUsuario` como un campo separado si es un ID de negocio.
