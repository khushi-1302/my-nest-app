/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx= host.switchToHttp();
    const response= ctx.getResponse<Response>();
    const request=ctx.getRequest<Request>();
    const status= exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message
    })}}
//(exception controller)
// Client
//   |
//   | GET /exception/hello/abc
//   |
//   v
// Controller
//   |
//   v
// ParseIntPipe
//   |
//   +---- Success ----> getHello() ----> Response
//   |
//   +---- Failure ----> BadRequestException
//                            |
//                            v
//                   HttpExceptionFilter
//                            |
//                            v
//                     Custom JSON Error
//                            |
//                            v
//                          Client