import { LOCATION_INITIALIZED } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ButtonModule } from 'primeng/button';
import { SlideMenuModule } from 'primeng/slidemenu';
import { AppComponent } from './app.component';
import { SideBarService } from './services/sidebar/sidebar.service';
import { ThemeService } from './services/theme/theme.service';
import { TopBarComponent } from './top-bar/top-bar.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function appInitializerFactory(
  translate: TranslateService,
  injector: Injector
) {
  return async () => {
    await injector.get(LOCATION_INITIALIZED, Promise.resolve(null));

    translate.addLangs(['en', 'it']);
    translate.setDefaultLang('it');
    try {
      await translate.use('it').toPromise();
    } catch (err) { }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'it',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot([]),
    ButtonModule,
    SlideMenuModule,
  ],
  exports: [TranslateModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    },
    SideBarService,
    ThemeService,
    {
      provide: APP_INITIALIZER,
      useFactory: (ts: ThemeService) => () => ts.init(),
      deps: [ThemeService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
