import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IPortfolioMetadata } from '../portfolio-metadata.enum';

export class PortfolioParams {
  @ApiModelProperty() title: string;
  @ApiModelPropertyOptional() body: string;
  @ApiModelPropertyOptional() metadata: IPortfolioMetadata;
  @ApiModelPropertyOptional() view: string;
}
