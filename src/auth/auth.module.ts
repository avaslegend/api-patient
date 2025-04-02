import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './jwt-auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'my-secret-token',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtAuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtAuthService],
})
export class AuthModule {}