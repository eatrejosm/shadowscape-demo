import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule, 
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DATABASE_HOST || '',
          port: 5433,
          username: process.env.DATABASE_USER || '',
          password: process.env.DATABASE_PASS || '',
          database: process.env.DATABASE_NAME || '',
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
    }),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
