"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = __importDefault(require("mongoose"));
const api_response_dto_1 = require("../dto/api-response.dto");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Something went wrong. Please try again later.';
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            message =
                typeof res === 'string'
                    ? res
                    : res.message || message;
            message = 'Request Failed';
        }
        else if (exception instanceof mongoose_1.default.Error.ValidationError) {
            status = common_1.HttpStatus.BAD_REQUEST;
            message = 'Validation Failed';
            const errors = Object.values(exception.errors).map((err) => err.message);
            message = errors.join(', ') || 'Invalid data provided.';
        }
        else if (exception.code === 11000) {
            status = common_1.HttpStatus.CONFLICT;
            const field = Object.keys(exception.keyValue)[0];
            message = 'Duplicate Records';
            message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
        }
        else if (exception instanceof mongoose_1.default.Error.CastError) {
            status = common_1.HttpStatus.BAD_REQUEST;
            message = 'Invalid Identifier';
            message = `Invalid ${exception.path}: ${exception.value}`;
        }
        else if (exception?.message) {
            message = exception.message;
        }
        const apiResponse = new api_response_dto_1.ApiResponse({
            message,
            success: false,
        });
        response.status(status).json(apiResponse);
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=all-exceptions.filter.js.map