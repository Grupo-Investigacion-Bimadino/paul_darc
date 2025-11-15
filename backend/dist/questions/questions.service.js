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
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
let QuestionsService = class QuestionsService {
    firebaseAdmin;
    firestore;
    questionsCollection;
    constructor(firebaseAdmin) {
        this.firebaseAdmin = firebaseAdmin;
        this.firestore = this.firebaseAdmin.firestore();
        this.questionsCollection = this.firestore.collection('questions');
    }
    async create(createQuestionDto) {
        const newDocRef = await this.questionsCollection.add(createQuestionDto);
        const newDocSnapshot = await newDocRef.get();
        return { id: newDocSnapshot.id, ...newDocSnapshot.data() };
    }
    async findAll() {
        const snapshot = await this.questionsCollection.get();
        if (snapshot.empty) {
            return [];
        }
        const questions = [];
        snapshot.forEach(doc => {
            questions.push({ id: doc.id, ...doc.data() });
        });
        return questions;
    }
    async findOne(id) {
        const doc = await this.questionsCollection.doc(id).get();
        if (!doc.exists) {
            throw new common_1.NotFoundException(`Question with ID ${id} not found`);
        }
        return { id: doc.id, ...doc.data() };
    }
    async update(id, updateQuestionDto) {
        const docRef = this.questionsCollection.doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            throw new common_1.NotFoundException(`Question with ID ${id} not found`);
        }
        await docRef.update({ ...updateQuestionDto });
        const updatedDoc = await docRef.get();
        return { id: updatedDoc.id, ...updatedDoc.data() };
    }
    async remove(id) {
        const docRef = this.questionsCollection.doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            throw new common_1.NotFoundException(`Question with ID ${id} not found`);
        }
        await docRef.delete();
        return { message: `Question with ID ${id} has been deleted.` };
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('FIREBASE_ADMIN')),
    __metadata("design:paramtypes", [Object])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map