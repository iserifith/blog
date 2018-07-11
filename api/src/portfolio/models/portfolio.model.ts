import { BaseModel, schemaOptions } from 'shared/base.model';
import { prop, ModelType } from '../../../node_modules/typegoose';
import { IPortfolioMetadata } from './portfolio-metadata.enum';

export class Portfolio extends BaseModel<Portfolio> {
  @prop({ required: [true, 'Tittle is required'] })
  title: string;
  @prop() metadata: IPortfolioMetadata;
  @prop() body: string;
  @prop() view: string;

  static get model(): ModelType<Portfolio> {
    return new Portfolio().getModelForClass(Portfolio, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}
