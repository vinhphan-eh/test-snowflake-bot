import { Service } from './service';

export class HerocliSbxMobileService extends Service {
  constructor() {
    super('sbx-mobile');
    this.e('is running');
    this.s('bundle exec rails c');
    this.e('Loading staging environment');
  }
}
