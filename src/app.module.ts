import { Module } from '@nestjs/common';
import { PatientsModule } from './patients/patients.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PatientsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
