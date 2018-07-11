import { BaseModelVm } from 'shared/base.model';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IPortfolioMetadata } from '../portfolio-metadata.enum';

export class PortfolioVm extends BaseModelVm {
  @ApiModelProperty() title: string;
  @ApiModelProperty() body: string;
  @ApiModelProperty() metadata: IPortfolioMetadata;
  @ApiModelProperty() view: string;
}
