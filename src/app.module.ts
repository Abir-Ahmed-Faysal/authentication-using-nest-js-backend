import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [PrismaModule, AuthModule, SubscriptionModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
