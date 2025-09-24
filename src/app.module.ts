import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { LoansModule } from './loans/loans.module';
import { SavingsModule } from './savings/savings.module';
import { ReportsController } from './reports/reports.controller';
import { ReportsService } from './reports/reports.service';
import { UsersModule } from './users/users.module';
import { getTypeOrmConfig } from './config/ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => getTypeOrmConfig(configService), // ✅ pass configService here
    }),
    AuthModule,
    TransactionsModule,
    LoansModule,
    SavingsModule,
    UsersModule, // ✅ import the module, do not list controllers/services again
  ],
  controllers: [AppController, ReportsController], // only controllers not provided by modules
  providers: [AppService, ReportsService],        // only providers not provided by modules
})
export class AppModule {}
