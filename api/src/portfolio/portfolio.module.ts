import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { MongooseModule } from '../../node_modules/@nestjs/mongoose';
import { Portfolio } from './models/portfolio.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Portfolio.modelName, schema: Portfolio.model.schema },
    ]),
  ],
  providers: [PortfolioService],
  controllers: [PortfolioController],
})
export class PortfolioModule {}
