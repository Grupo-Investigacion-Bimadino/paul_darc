"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitiesService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
let ActivitiesService = class ActivitiesService {
    firebaseService;
    firestore;
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
        this.firestore = this.firebaseService.getAdmin.firestore();
    }
    async create(createActivityDto) {
        const newActivity = {
            ...createActivityDto,
            createdAt: new Date(),
        };
        const docRef = await this.firestore.collection('activities').add(newActivity);
        return { id: docRef.id, ...newActivity };
    }
    async findAll() {
        const activitiesSnapshot = await this.firestore.collection('activities').get();
        return activitiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async findOne(id) {
        const activityDoc = await this.firestore.collection('activities').doc(id).get();
        if (!activityDoc.exists) {
            throw new common_1.NotFoundException(`Actividad con ID ${id} no encontrada`);
        }
        return { id: activityDoc.id, ...activityDoc.data() };
    }
    async update(id, updateActivityDto) {
        const activityRef = this.firestore.collection('activities').doc(id);
        await activityRef.update({ ...updateActivityDto });
        return { id, ...updateActivityDto };
    }
    async remove(id) {
        await this.firestore.collection('activities').doc(id).delete();
        return { message: `Actividad con ID ${id} eliminada.` };
    }
};
exports.ActivitiesService = ActivitiesService;
exports.ActivitiesService = ActivitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(firebase_service_1.FirebaseService)),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], ActivitiesService);
//# sourceMappingURL=activities.service.js.map