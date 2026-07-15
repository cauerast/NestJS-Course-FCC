import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { jwtPayloadRt } from '../../auth/types/jwt-payload.types';

type RequestUser = Request & {
  user: jwtPayloadRt;
};

export const getCurrentUser = createParamDecorator(
  (data: keyof RequestUser['user'] | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestUser>();
    if (!data) return request.user;
    return request.user[data];
  },
);
