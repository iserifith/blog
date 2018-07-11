import {
  Controller,
  Post,
  HttpStatus,
  Body,
  HttpException,
  Get,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Portfolio } from './models/portfolio.model';
import { PortfolioVm } from './models/view-models/portfolio-vm.model';
import { PortfolioParams } from './models/view-models/portfolio-params.model';
import { ApiException } from 'shared/api-exception.model';
import { GetOperationId } from 'shared/utilities/get-operation-id';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
@ApiUseTags(Portfolio.modelName)
@ApiBearerAuth()
export class PortfolioController {
  constructor(private readonly _portfolioService: PortfolioService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: PortfolioVm })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Portfolio.modelName, 'Create'))
  async create(@Body() params: PortfolioParams): Promise<PortfolioVm> {
    const { title, body, metadata, view } = params;

    if (!title) {
      throw new HttpException('Title is required.', HttpStatus.BAD_REQUEST);
    }

    try {
      const newPortfolio = await this._portfolioService.createPortfolio(params);
      return this._portfolioService.map<PortfolioVm>(newPortfolio);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: PortfolioVm, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Portfolio.modelName, 'Get All'))
  async get(): Promise<PortfolioVm[]> {
    try {
      const portfolios = await this._portfolioService.findAll();
      return this._portfolioService.map<PortfolioVm[]>(
        portfolios.map(portfolio => portfolio.toJSON()),
      );
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
