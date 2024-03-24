import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, ArticlesModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
