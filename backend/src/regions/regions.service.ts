import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import * as admin from 'firebase-admin';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './region.interface';

@Injectable()
export class RegionsService {
  private firestore: admin.firestore.Firestore;

  constructor(
    @Inject(FirebaseService) private firebaseService: FirebaseService,
  ) {
    this.firestore = this.firebaseService.getAdmin.firestore();
  }

  async findAll(): Promise<Region[]> {
    const regionsSnapshot = await this.firestore.collection('regions').get();
    return regionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Region));
  }

  async findOne(id: string): Promise<Region> {
    const regionDoc = await this.firestore.collection('regions').doc(id).get();
    if (!regionDoc.exists) {
      throw new NotFoundException(`Región con ID ${id} no encontrada`);
    }
    return { id: regionDoc.id, ...regionDoc.data() } as Region;
  }

  async explore(): Promise<any> { // TODO: Return as GeoJSON
    const regionsSnapshot = await this.firestore.collection('regions').get();
    const regions = regionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Convert to GeoJSON FeatureCollection
    const features = regions.map(region => ({
        type: 'Feature',
        properties: {
            id: region.id,
            name: region.name,
            description: region.description,
        },
        geometry: region.location, // Assuming 'location' is a GeoJSON geometry object
    }));

    return {
        type: 'FeatureCollection',
        features: features,
    };
  }

  // You can implement create, update, and remove for Firestore here if needed
}
