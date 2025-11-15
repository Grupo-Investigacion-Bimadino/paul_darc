"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseModule = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("./firebase.service");
const config_1 = require("@nestjs/config");
const admin = require("firebase-admin");
const firebaseAdminProvider = {
    provide: 'FIREBASE_ADMIN',
    inject: [config_1.ConfigService],
    useFactory: (configService) => {
        const serviceAccountString = configService.get('FIREBASE_SERVICE_ACCOUNT_KEY');
        if (!serviceAccountString) {
            throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable not found.');
        }
        try {
            const serviceAccount = JSON.parse(serviceAccountString);
            if (!admin.apps.length) {
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                    databaseURL: configService.get('FIREBASE_DATABASE_URL'),
                });
            }
            return admin;
        }
        catch (error) {
            throw new Error(`Failed to initialize Firebase Admin: ${error.message}`);
        }
    },
};
let FirebaseModule = class FirebaseModule {
};
exports.FirebaseModule = FirebaseModule;
exports.FirebaseModule = FirebaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [firebase_service_1.FirebaseService, firebaseAdminProvider],
        exports: [firebase_service_1.FirebaseService, firebaseAdminProvider],
    })
], FirebaseModule);
//# sourceMappingURL=firebase.module.js.map