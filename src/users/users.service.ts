// src/users/users.service.ts

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './schemas/users.schema'; // Importar Users
@Injectable()
export class UsersService {
 constructor(@InjectModel(Users.name) private userModel: Model<Users>) {}

  // El método create sigue siendo simple. Las relaciones se añaden después.
 async create(createUserDto: CreateUserDto): Promise<Users> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  // findAll puede ahora popular relaciones si es necesario
 async findAll(): Promise<Users[]> {
    // Por defecto no poblamos para no sobrecargar. Se puede añadir como opción.
    return this.userModel.find().exec();
  }

  // findOne es donde 'populate' brilla.
  async findOne(id: string): Promise<Users> {
    if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException(`ID de usuario no válido: ${id}`);
    }
 const user = await this.userModel
      .findById(id)
      .populate('logros') // <-- ¡AQUÍ ESTÁ LA MAGIA! Trae la info completa de los logros
      .exec();

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

 async update(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return { message: `Usuario con ID ${id} eliminado correctamente.` };
  }

  // --- MÉTODOS NUEVOS Y ÚTILES BASADOS EN EL ERD ---

  /**
   * Añade un logro a un usuario si no lo tiene ya.
   * @param userId ID del usuario
   * @param achievementId ID del logro a añadir
   */
  async addAchievement(userId: string, achievementId: string): Promise<Users> {
    // $addToSet es como $push pero evita duplicados. ¡Perfecto para logros!
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { logros: new Types.ObjectId(achievementId) } },
      { new: true }
    ).populate('logros');

    if (!updatedUser) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }
    return updatedUser;
  }

  /**
   * Registra la respuesta de un usuario a una pregunta.
   * @param userId ID del usuario
   * @param data Objeto con la info de la respuesta
   */
  async recordAnswer(userId: string, data: { preguntaId: string, respuestaDada: string, esCorrecta: boolean }): Promise<Users> {
    const answerData = {
      pregunta: new Types.ObjectId(data.preguntaId),
      respuestaDada: data.respuestaDada,
      esCorrecta: data.esCorrecta,
      fecha: new Date(),
    };

    // $push siempre añade el elemento al array.
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { historialRespuestas: answerData } },
      { new: true }
    );

    if (!updatedUser) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }
    
    // Aquí podrías añadir lógica para actualizar el progreso del usuario
    // this.updateProgress(userId, ...);

    return updatedUser;
  }
}