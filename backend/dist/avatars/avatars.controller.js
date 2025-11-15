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
exports.AvatarsController = void 0;
const common_1 = require("@nestjs/common");
const avatars_service_1 = require("./avatars.service");
const create_avatar_dto_1 = require("./dto/create-avatar.dto");
const update_avatar_dto_1 = require("./dto/update-avatar.dto");
let AvatarsController = class AvatarsController {
    avatarsService;
    constructor(avatarsService) {
        this.avatarsService = avatarsService;
    }
    create(createAvatarDto) {
        return this.avatarsService.create(createAvatarDto);
    }
    findAll() {
        return this.avatarsService.findAll();
    }
    findOne(id) {
        return this.avatarsService.findOne(id);
    }
    update(id, updateAvatarDto) {
        return this.avatarsService.update(id, updateAvatarDto);
    }
    remove(id) {
        return this.avatarsService.remove(id);
    }
};
exports.AvatarsController = AvatarsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_avatar_dto_1.CreateAvatarDto]),
    __metadata("design:returntype", void 0)
], AvatarsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AvatarsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AvatarsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_avatar_dto_1.UpdateAvatarDto]),
    __metadata("design:returntype", void 0)
], AvatarsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AvatarsController.prototype, "remove", null);
exports.AvatarsController = AvatarsController = __decorate([
    (0, common_1.Controller)('avatars'),
    __metadata("design:paramtypes", [avatars_service_1.AvatarsService])
], AvatarsController);
//# sourceMappingURL=avatars.controller.js.map