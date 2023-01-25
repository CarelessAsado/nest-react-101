import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BACKEND_ENDPOINTS, FRONTEND_URL } from './constants';
import { AllExceptionsFilter } from './error/finalErrorHandler';

const PORT = process.env.PORT || 5000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { credentials: true, origin: [FRONTEND_URL] },
  });
  app.setGlobalPrefix(BACKEND_ENDPOINTS.ROOT);
  /* ------------------ERROR HANDLER----------------------------- */
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  /* ------------------------------------------------------------- */
  await app.listen(PORT, () => {
    console.log('connect on PORT: ' + PORT);
  });
}
bootstrap();
