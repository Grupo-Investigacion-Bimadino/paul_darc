// Contenido CORRECTO para src/regions/regions.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // <-- 1. Importa MongooseModule
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { Region, RegionSchema } from './schemas/region.schema'; // <-- 2. Importa el modelo y el schema

@Module({
  imports: [
    // 3. Registra el modelo aquí
    MongooseModule.forFeature([{ name: Region.name, schema: RegionSchema }]),
  ],
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule {}
