"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAvatarDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_avatar_dto_1 = require("./create-avatar.dto");
class UpdateAvatarDto extends (0, mapped_types_1.PartialType)(create_avatar_dto_1.CreateAvatarDto) {
}
exports.UpdateAvatarDto = UpdateAvatarDto;
//# sourceMappingURL=update-avatar.dto.js.map