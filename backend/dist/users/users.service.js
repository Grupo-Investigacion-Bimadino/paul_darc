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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
let UsersService = class UsersService {
    firebaseService;
    firestore;
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
        this.firestore = this.firebaseService.getAdmin.firestore();
    }
    async register(createUserDto) {
        const { email, password, nombre, apellidos } = createUserDto;
        try {
            const userRecord = await this.firebaseService.getAdmin.auth().createUser({
                email,
                password,
                displayName: `${nombre} ${apellidos}`,
            });
            const userProfile = {
                nombre,
                apellidos,
                email,
                fechaRegistro: new Date(),
                rol: 'Usuario',
            };
            await this.firestore.collection('users').doc(userRecord.uid).set(userProfile);
            return { uid: userRecord.uid, ...userProfile };
        }
        catch (error) {
            if (error.code === 'auth/email-already-exists') {
                throw new common_1.ConflictException('El email ya está registrado');
            }
            throw error;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(firebase_service_1.FirebaseService)),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], UsersService);
//# sourceMappingURL=users.service.js.map