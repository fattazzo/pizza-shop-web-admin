import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export class MultiTranslateHttpLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    public resources: { prefix: string; suffix: string }[] = [],
  ) { }

  /**
   * Gets the translations from the server
   * @param lang
   * @returns {any}
   */
  public getTranslation(lang: string): any {
    return forkJoin(
      this.resources.map(config => {
        return this.http.get(`${config.prefix}${lang}${config.suffix}`);
      }),
    ).pipe(
      map(response => {
        return response.reduce((a, b) => {
          return Object.assign(a, b);
        });
      }),
    );
  }
}

export function createMultiTranslateLoader(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n/base/', suffix: '.json' }
  ]);
}
