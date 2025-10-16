// filters/all-exceptions.filter.ts
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import mongoose from 'mongoose';
  import { ApiResponse } from '../dto/api-response.dto'; // adjust path
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Something went wrong. Please try again later.';
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const res = exception.getResponse();
        message =
          typeof res === 'string'
            ? res
            : (res as any).message || message;
        message = 'Request Failed';
      } else if (exception instanceof mongoose.Error.ValidationError) {
        status = HttpStatus.BAD_REQUEST;
        message = 'Validation Failed';
        //message = 'Invalid data provided.';
        const errors = Object.values(exception.errors).map((err: any) => err.message);
        message = errors.join(', ') || 'Invalid data provided.';
      } else if (exception.code === 11000) {
        status = HttpStatus.CONFLICT;
        const field = Object.keys(exception.keyValue)[0];
        message = 'Duplicate Records';
        message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
      } else if (exception instanceof mongoose.Error.CastError) {
        status = HttpStatus.BAD_REQUEST;
        message = 'Invalid Identifier';
        message = `Invalid ${exception.path}: ${exception.value}`;
      } else if (exception?.message) {
        message = exception.message;
      }
  
      const apiResponse = new ApiResponse({
        message,
        success: false,
      });
  
      response.status(status).json(apiResponse);
    }
  }
  