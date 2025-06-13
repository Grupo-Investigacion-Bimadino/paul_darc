// src/app.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config'; // <-- IMPORTANTE: importa también ConfigService

// Importa todos tus módulos
import { UsersModule } from './users/users.module';
import { RegionsModule } from './regions/regions.module';
import { QuestionsModule } from './questions/questions.module';
import { AvatarsModule } from './avatars/avatars.module';
import { AlertsModule } from './alerts/alerts.module';
import { AchievementsModule } from './achievements/achievements.module';

@Module({
  imports: [
    // 1. Configuración para variables de entorno (MONGODB_URI)
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles en toda la app
    }),
    
    // 2. Forma SEGURA y CORRECTA de conectar a MongoDB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        if (!uri) {
          // Si la variable no existe, la aplicación no arrancará y te dará un error claro.
          throw new Error('La variable de entorno MONGODB_URI no está definida en el archivo .env');
        }
        return {
          uri: uri,
        };
      },
      inject: [ConfigService],
    }),

    // 3. Importa todos tus módulos de funcionalidades
    UsersModule,
    RegionsModule,
    QuestionsModule,
    AvatarsModule,
    AlertsModule,
    AchievementsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}