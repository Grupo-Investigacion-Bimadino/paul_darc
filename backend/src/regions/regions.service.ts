// backend/src/regions/regions.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin'; 
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

// Importamos la interfaz para la región
// NOTA: Si usas una interfaz compartida, ajústala aquí. 
// Por ahora, usamos el tipo Region de tu DTO para tipado interno.
type Region = CreateRegionDto & { id: string };

@Injectable()
export class RegionsService {
  private db = admin.firestore();
  private readonly REGIONS_COLLECTION = 'regions';

  async findAll(): Promise<Region[]> {
    const snapshot = await this.db.collection(this.REGIONS_COLLECTION).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Region[];
  }

  async create(createRegionDto: CreateRegionDto): Promise<Region> {
    const newRegion: Region = { 
      ...createRegionDto,
      id: createRegionDto.id, // Aseguramos que el ID se usa como clave
    };
    
    await this.db.collection(this.REGIONS_COLLECTION).doc(newRegion.id).set(newRegion);
    console.log(`[DB] Región creada: ${newRegion.name}`);
    return newRegion;
  }

  // Corrección en la función update: Firestore necesita un objeto simple, no un DTO
  // Usamos 'any' en el tipo de actualización para satisfacer a Firestore, ya que PatchType es complejo
  async update(id: string, updateRegionDto: UpdateRegionDto): Promise<Region> {
    const regionRef = this.db.collection(this.REGIONS_COLLECTION).doc(id);
    
    // Firestore solo actualiza los campos proporcionados
    await regionRef.update(updateRegionDto as any); 
    
    const updatedDoc = await regionRef.get();
    if (!updatedDoc.exists) {
        throw new NotFoundException(`Región con ID ${id} no encontrada.`);
    }
    
    console.log(`[DB] Región actualizada: ${id}`);
    return { id: updatedDoc.id, ...updatedDoc.data() } as Region;
  }

  async remove(id: string): Promise<{ id: string, message: string }> {
    await this.db.collection(this.REGIONS_COLLECTION).doc(id).delete();
    console.log(`[DB] Región eliminada: ${id}`);
    return { id, message: 'Región eliminada exitosamente.' };
  }
}