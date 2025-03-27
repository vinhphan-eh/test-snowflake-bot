import { Service } from './service';

const EAGER_RETRIES_TIMEOUT = 60 * 1000;
const EAGER_RETRIES_COUNT = 5;

export class HerocliHeropayService extends Service {
  constructor() {
    super('heropay');
  }

  static async buildWithEagerRetries() {
    let service;

    for (let i = 0; i < EAGER_RETRIES_COUNT; i++) {
      service = new HerocliHeropayService();
      service.e('is running');
      service.s('TERM=dumb bundle exec racksh');
      try {
        await service.getAsJSON('1 + 1', EAGER_RETRIES_TIMEOUT);
        return service;
      } catch (e) {
        service.cleanup();
      }
    }

    throw 'Unable to connect with herocli';
  }
}
