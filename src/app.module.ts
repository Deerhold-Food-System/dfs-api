import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './feature/test/test.module';
import { UsersModule } from './feature/users/users.module';
import { AuthModule } from './feature/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './feature/auth/guard/jwt-auth.guard';
import { DogsModule } from './feature/dogs/dogs.module';

@Module({
  imports: [AuthModule, TestModule, DogsModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
