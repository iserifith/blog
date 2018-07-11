import 'automapper-ts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MapperService {
  mapper: AutoMapperJs.AutoMapper;

  constructor() {
    this.mapper = automapper;
    this.initializeMapper();
  }

  private initializeMapper(): void {
    this.mapper.initialize(MapperService.configure);
  }

  private static configure(config: AutoMapperJs.IConfiguration): void {
    config
      .createMap('User', 'UserVm')
      .forSourceMember('_id', opts => opts.ignore())
      .forSourceMember('password', opts => opts.ignore());

    config
      .createMap('Post', 'PostVm')
      .forSourceMember('_id', opts => opts.ignore());

    config
      .createMap('Post[]', 'PostVm[]')
      .forSourceMember('_id', opts => opts.ignore());

    config
      .createMap('Portfolio', 'PortfolioVm')
      .forSourceMember('_id', opts => opts.ignore());

    config
      .createMap('Portfolio[]', 'PortfolioVm[]')
      .forSourceMember('_id', opts => opts.ignore());
  }
}
