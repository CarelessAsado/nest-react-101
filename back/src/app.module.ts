import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AWS_ENV_VARS } from './constants';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        /* console.log(config); */
        const checkAwsVars = Object.keys(AWS_ENV_VARS).some(
          (i) => !Boolean(config[i]),
        );

        if (!config.MONGO_URI || checkAwsVars)
          throw new Error('Config variables not properly set');
        return config;
      },
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
