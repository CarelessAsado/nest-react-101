import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './@publicRoute';

export function checkPublicDecorator(
  reflector: Reflector,
  context: ExecutionContext,
) {
  const isPublic = reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
    context.getHandler(),
    context.getClass(),
  ]);

  return isPublic ? true : false;
}
