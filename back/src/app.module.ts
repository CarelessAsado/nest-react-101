import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guard/checkJWT.guard';
import { RolesGuard } from './auth/guard/CheckRoles.guard';
import { AWS_ENV_VARS } from './constants';
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
  providers: [
    //https://docs.nestjs.com/guards#binding-guards READ HERE
    //u can chain them,if the 1st fails, it never reaches the 2nd
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
