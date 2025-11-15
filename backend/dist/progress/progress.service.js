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
exports.ProgressService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
const activities_service_1 = require("../activities/activities.service");
let ProgressService = class ProgressService {
    firebaseService;
    activitiesService;
    firestore;
    constructor(firebaseService, activitiesService) {
        this.firebaseService = firebaseService;
        this.activitiesService = activitiesService;
        this.firestore = this.firebaseService.getAdmin.firestore();
    }
    async submitAnswer(userId, submitAnswerDto) {
        const { activityId, userAnswer } = submitAnswerDto;
        const activity = await this.activitiesService.findOne(activityId);
        if (!activity) {
            throw new common_1.NotFoundException(`Actividad con ID ${activityId} no encontrada`);
        }
        const correctAnswer = activity.correctAnswer;
        const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);
        const score = isCorrect ? activity.score || 10 : 0;
        const progress = {
            userId,
            activityId,
            userAnswer,
            isCorrect,
            score,
            submittedAt: new Date(),
        };
        const docRef = await this.firestore.collection('progress').add(progress);
        return { id: docRef.id, ...progress };
    }
};
exports.ProgressService = ProgressService;
exports.ProgressService = ProgressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(firebase_service_1.FirebaseService)),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
        activities_service_1.ActivitiesService])
], ProgressService);
//# sourceMappingURL=progress.service.js.map