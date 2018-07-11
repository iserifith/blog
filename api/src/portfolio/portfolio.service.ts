import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from 'shared/base.service';
import { Portfolio } from './models/portfolio.model';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { MapperService } from 'shared/mapper/mapper.service';
import { PortfolioParams } from './models/view-models/portfolio-params.model';

@Injectable()
export class PortfolioService extends BaseService<Portfolio> {
  constructor(
    @InjectModel(Portfolio.modelName)
    private readonly _portfolioModel: ModelType<Portfolio>,
    private readonly _mapperService: MapperService,
  ) {
    super();
    this._model = _portfolioModel;
    this._mapper = _mapperService.mapper;
  }

  async createPortfolio(params: PortfolioParams): Promise<Portfolio> {
    const { title, body, metadata, view } = params;

    const newPortfolio = new this._model();
    newPortfolio.title = title;

    if (body) newPortfolio.body = body;
    if (metadata) newPortfolio.metadata = metadata;
    if (view) newPortfolio.view = view;

    try {
      const result = await this.create(newPortfolio);
      return result.toJSON() as Portfolio;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
