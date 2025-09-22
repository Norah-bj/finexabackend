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

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // false in production
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    TransactionsModule,
    LoansModule,
    SavingsModule,
    UsersModule, // ✅ import the module, do not list controllers/services again
  ],
  controllers: [AppController, ReportsController], // only controllers not provided by modules
  providers: [AppService, ReportsService], // only providers not provided by modules
})
export class AppModule {}
