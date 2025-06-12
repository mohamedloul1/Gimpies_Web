import { Injectable } from '@angular/core';
import { MagicLazyLoaderService } from '@magic-xpa/angular';

@Injectable()

export class LazyLoaderService extends MagicLazyLoaderService {
  override Load(path: string): Promise<any> {
    return import( './' + path + '/magic.gen.lib.module');
  }
}
