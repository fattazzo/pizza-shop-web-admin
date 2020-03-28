import { LOCATION_INITIALIZED } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { SlideMenuModule } from 'primeng/slidemenu';
import { AppComponent } from './app.component';
import { SideBarService } from './services/sidebar/sidebar.service';
import { ThemeService } from './services/theme/theme.service';
import { TopBarComponent } from './top-bar/top-bar.component';
import { createMultiTranslateLoader } from './translation/multi-translate-http-loader';

export function createTranslateLoader(http: HttpClient) {
  return createMultiTranslateLoader(http);
}

export function appInitializerFactory(
  translate: TranslateService,
  injector: Injector,
  themeService: ThemeService
) {
  themeService.init();

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
    FontAwesomeModule,
    ButtonModule,
    SlideMenuModule,
  ],
  exports: [TranslateModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector, ThemeService],
      multi: true
    },
    SideBarService,
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private library: FaIconLibrary) {
    // regular
    this.library.addIcons();
    // solid
    this.library.addIcons();
    // brand
    this.library.addIcons();
  }
}
