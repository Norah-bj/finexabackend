import { Module } from '@nestjs/common';
import { SavingsController } from './savings.controller';
import { SavingsService } from './savings.service';

@Module({
  controllers: [SavingsController],
  providers: [SavingsService]
})
export class SavingsModule {}
