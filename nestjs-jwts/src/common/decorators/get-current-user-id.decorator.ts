import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

type RequestUserId = Request & {
  user: {
    sub: number;
  };
};

export const getCurrentUserId = createParamDecorator(
  (data: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest<RequestUserId>();
    return request.user.sub;
  },
);
