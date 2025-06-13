import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // 1. Importar MongooseModule
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users, UsersSchema } from './schemas/users.schema'; // 2. Importar el Modelo y el Schema

@Module({
  imports: [
    // 3. Registrar el modelo en el módulo
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  // 4. Exportar el servicio si otros módulos lo necesitan (muy común para la autenticación)
  exports: [UsersService],
})
export class UsersModule {}