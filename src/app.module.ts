import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './auth/passport-strategy/jwt.strategy';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { PaginationModule } from './pagination/pagination.module';
import { StatisticsModule } from './statistics/statistics.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    ProductModule,
    ReviewModule,
    CategoryModule,
    OrderModule,
    PaginationModule,
    StatisticsModule,
    RoleModule,
  ],
  providers: [PrismaService, JwtStrategy],
})

export class AppModule {
}
