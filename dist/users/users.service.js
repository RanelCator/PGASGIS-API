"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const user_schema_1 = require("./schema/user.schema");
const mongoose_2 = require("@nestjs/mongoose");
const api_response_dto_1 = require("../common/dto/api-response.dto");
const bcrypt = __importStar(require("bcrypt"));
let UsersService = class UsersService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findAll() {
        const users = await this.userModel.find().lean();
        return users.map(user => ({
            id: user._id.toString(),
            firstname: user.firstname,
            lastname: user.lastname,
            middlename: user.middlename,
            emailaddress: user.emailaddress,
            UserType: user.UserType
        }));
    }
    async create(createUserDto) {
        if (!createUserDto.username || createUserDto.username.trim() === '') {
            const emailLocalPart = createUserDto.emailaddress.split('@')[0];
            createUserDto.username = emailLocalPart;
        }
        const createdUser = new this.userModel(createUserDto);
        await createdUser.save();
        return new api_response_dto_1.ApiResponse({
            message: 'The user has been registered successfully.',
            success: true,
        });
    }
    async update(id, updateUserDto) {
        const SALT = parseInt(process.env.SALT || '10', 10);
        try {
            const user = await this.userModel.findById(id);
            if (!user) {
                return new api_response_dto_1.ApiResponse({
                    message: `No user with id ${id} exists.`,
                    success: false,
                });
            }
            if (updateUserDto.IsPGAS === 0) {
                if (updateUserDto.password)
                    updateUserDto.password = await bcrypt.hash(updateUserDto.password, SALT);
            }
            Object.assign(user, updateUserDto);
            await user.save();
            return new api_response_dto_1.ApiResponse({
                message: 'The user has been updated successfully.',
                success: true,
            });
        }
        catch (err) {
            return new api_response_dto_1.ApiResponse({
                message: err.message,
                success: false,
            });
        }
    }
    async findOne(id) {
        const user = await this.userModel.findById(id).lean();
        if (!user) {
            return new api_response_dto_1.ApiResponse({
                message: `No user with id ${id} exists.`,
                success: false,
            });
        }
        const mappedUser = {
            id: user._id.toString(),
            firstname: user.firstname,
            lastname: user.lastname,
            middlename: user.middlename,
            emailaddress: user.emailaddress,
            Usersuccess: user.UserType,
        };
        return new api_response_dto_1.ApiResponse({
            message: 'User Found',
            success: true,
            data: mappedUser,
        });
    }
    async remove(id) {
        try {
            const user = await this.userModel.findByIdAndDelete(id).exec();
            if (!user) {
                return new api_response_dto_1.ApiResponse({
                    message: `No user with id ${id} exists.`,
                    success: false,
                });
            }
            return new api_response_dto_1.ApiResponse({
                message: 'The user has been deleted successfully.',
                success: true,
            });
        }
        catch (err) {
            return new api_response_dto_1.ApiResponse({
                message: err.message,
                success: false,
            });
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map