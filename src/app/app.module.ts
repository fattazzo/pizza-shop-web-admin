import { LOCATION_INITIALIZED } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit as farEdit } from '@fortawesome/free-regular-svg-icons';
import { faChevronRight, faCreditCard as fasCreditCard, faHourglassHalf, faMapMarkedAlt as fasMapMarkedAlt, faMoneyBillWave, faMoneyCheckAlt, faPizzaSlice, faQuestionCircle, faSpinner, faTrashAlt as fasTrashAlt, faUser as fasUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { TranslateCompiler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RxStompService } from '@stomp/ng2-stompjs';
import { MESSAGE_FORMAT_CONFIG, TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { PickListModule } from 'primeng/picklist';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { TreeTableModule } from 'primeng/treetable';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardWidgetComponent } from './components/dashboard-widget/dashboard-widget.component';
import { CurrencyDirective } from './directive/currency.directive';
import { NumericDirective } from './directive/numeric.directive';
import { HttpConfigInterceptor } from './http/http-config-interceptor';
import { ApiModule, Configuration, ConfigurationParameters } from './open-api';
import { AboutWidgetComponent } from './pages/about/about-widget/about-widget.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthGuard } from './pages/auth/auth.guard';
import { AuthService } from './pages/auth/auth.service';
import { LoginComponent } from './pages/auth/login/login.component';
import { UnauthorizedComponent } from './pages/auth/unauthorized/unauthorized.component';
import { BranchGeneralFormComponent } from './pages/data/branches/branches-form/branch-general-form/branch-general-form.component';
import { BranchZoneFormComponent } from './pages/data/branches/branches-form/branch-zone-form/branch-zone-form.component';
import { BranchesFormComponent } from './pages/data/branches/branches-form/branches-form.component';
import { BranchesTableComponent } from './pages/data/branches/branches-table/branches-table.component';
import { BranchesComponent } from './pages/data/branches/branches.component';
import { CompanyComponent } from './pages/data/company/company.component';
import { DeliveryAdressesFormComponent } from './pages/data/delivery-adresses/delivery-adresses-form/delivery-adresses-form.component';
import { DeliveryAdressesComponent } from './pages/data/delivery-adresses/delivery-adresses.component';
import { GroupsFormComponent } from './pages/data/groups/groups-form/groups-form.component';
import { GroupsTablesComponent } from './pages/data/groups/groups-tables/groups-tables.component';
import { GroupsComponent } from './pages/data/groups/groups.component';
import { PizzaCategoriesComponent } from './pages/data/items/pizza/pizza-categories/pizza-categories.component';
import { DoughsComponent } from './pages/data/items/pizza/pizza-variations/doughs/doughs.component';
import { VariationsComponent } from './pages/data/items/pizza/pizza-variations/pizza-variations.component';
import { SizesComponent } from './pages/data/items/pizza/pizza-variations/sizes/sizes.component';
import { ToppingPricesComponent } from './pages/data/items/pizza/pizza-variations/topping-prices/topping-prices.component';
import { ToppingsComponent } from './pages/data/items/pizza/pizza-variations/toppings/toppings.component';
import { PizzaExtrasSummaryComponent } from './pages/data/items/pizza/pizzas/pizza-extras-summary/pizza-extras-summary.component';
import { PizzaFormPricesComponent } from './pages/data/items/pizza/pizzas/pizza-form-prices/pizza-form-prices.component';
import { PizzaFormComponent } from './pages/data/items/pizza/pizzas/pizza-form/pizza-form.component';
import { PizzasTableComponent } from './pages/data/items/pizza/pizzas/pizzas-table/pizzas-table.component';
import { PizzasComponent } from './pages/data/items/pizza/pizzas/pizzas.component';
import { ProductCategoriesFormComponent } from './pages/data/items/product/product-categories/product-categories-form/product-categories-form.component';
import { ProductCategoriesTableComponent } from './pages/data/items/product/product-categories/product-categories-table/product-categories-table.component';
import { ProductCategoriesComponent } from './pages/data/items/product/product-categories/product-categories.component';
import { ProductVariationsFormComponent } from './pages/data/items/product/product-variations/product-variations-form/product-variations-form.component';
import { ProductVariationsTableComponent } from './pages/data/items/product/product-variations/product-variations-table/product-variations-table.component';
import { ProductVariationsComponent } from './pages/data/items/product/product-variations/product-variations.component';
import { ProductFormPricesComponent } from './pages/data/items/product/products/product-form-prices/product-form-prices.component';
import { ProductFormComponent } from './pages/data/items/product/products/product-form/product-form.component';
import { ProductsTableComponent } from './pages/data/items/product/products/products-table/products-table.component';
import { ProductsComponent } from './pages/data/items/product/products/products.component';
import { SettingsComponent } from './pages/data/settings/settings.component';
import { ShippingMethodsFormComponent } from './pages/data/shipping-methods/shipping-methods-form/shipping-methods-form.component';
import { ShippingMethodsTableComponent } from './pages/data/shipping-methods/shipping-methods-table/shipping-methods-table.component';
import { ShippingMethodsComponent } from './pages/data/shipping-methods/shipping-methods.component';
import { UsersFormComponent } from './pages/data/users/users-form/users-form.component';
import { UsersTableComponent } from './pages/data/users/users-table/users-table.component';
import { UsersComponent } from './pages/data/users/users.component';
import { HomeOrdersPendingComponent } from './pages/home/home-orders-pending/home-orders-pending.component';
import { HomeOrdersProcessingComponent } from './pages/home/home-orders-processing/home-orders-processing.component';
import { HomeComponent } from './pages/home/home.component';
import { MyCurrencyPipe } from './pipes/my-currency.pipe';
import { AppMessageService } from './services/app-message.service';
import { MenuService } from './services/menu.service';
import { SessionService } from './services/session.service';
import { SideBarService } from './services/sidebar/sidebar.service';
import { ThemeService } from './services/theme/theme.service';
import { TopBarComponent } from './top-bar/top-bar.component';
import { createMultiTranslateLoader } from './translation/multi-translate-http-loader';
import { AuthUtils } from './utils/auth-utils';
import { OrdersEventsService } from './websocket/services/orders/oders-events.service';

export function createTranslateLoader(http: HttpClient) {
  return createMultiTranslateLoader(http);
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
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
    translate.setDefaultLang('en');
    try {
      var locale = null;
      translate.getLangs().forEach((lang: string) => {
        if (navigator.language.includes(lang)) {
          locale = lang;
        }
      })
      if (locale === null) {
        locale = 'en';
      }

      await translate.use(locale).toPromise();
    } catch (err) { }
  };
}

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: environment.baseApiRestUrl,
    accessToken: () => sessionStorage.getItem('access-token'),
  };
  return new Configuration(params);
}

@NgModule({
  declarations: [
    MyCurrencyPipe,
    NumericDirective,
    CurrencyDirective,
    AppComponent,
    TopBarComponent,
    HomeComponent,
    LoginComponent,
    UsersComponent,
    UnauthorizedComponent,
    GroupsComponent,
    GroupsTablesComponent,
    GroupsFormComponent,
    UsersTableComponent,
    UsersFormComponent,
    DeliveryAdressesComponent,
    DeliveryAdressesFormComponent,
    ShippingMethodsComponent,
    ShippingMethodsTableComponent,
    ShippingMethodsFormComponent,
    CompanyComponent,
    BranchesComponent,
    BranchesTableComponent,
    BranchesFormComponent,
    BranchZoneFormComponent,
    BranchGeneralFormComponent,
    VariationsComponent,
    DoughsComponent,
    SizesComponent,
    ToppingsComponent,
    SettingsComponent,
    PizzaCategoriesComponent,
    PizzasComponent,
    PizzasTableComponent,
    PizzaFormComponent,
    ToppingPricesComponent,
    PizzaExtrasSummaryComponent,
    DashboardWidgetComponent,
    AboutComponent,
    AboutWidgetComponent,
    PizzaFormPricesComponent,
    ProductsComponent,
    ProductCategoriesComponent,
    ProductVariationsComponent,
    ProductCategoriesTableComponent,
    ProductCategoriesFormComponent,
    ProductVariationsTableComponent,
    ProductVariationsFormComponent,
    ProductsTableComponent,
    ProductFormComponent,
    ProductFormPricesComponent,
    HomeOrdersPendingComponent,
    HomeOrdersProcessingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ApiModule.forRoot(apiConfigFactory),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler,
      }
    }),
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ButtonModule,
    SlideMenuModule,
    ToastModule,
    MenuModule,
    DropdownModule,
    CardModule,
    PanelModule,
    InputTextModule,
    CheckboxModule,
    TableModule,
    PickListModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    FieldsetModule,
    TooltipModule,
    ListboxModule,
    TabViewModule,
    DialogModule,
    SelectButtonModule,
    TreeTableModule
  ],
  exports: [TranslateModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector, ThemeService],
      multi: true
    },
    //{
    //  provide: BASE_PATH,
    //  useValue: environment.baseApiRestUrl
    //},
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, deps: [Injector], multi: true },
    { provide: MESSAGE_FORMAT_CONFIG, useValue: { locales: ['it', 'en'] } },
    SideBarService,
    ThemeService,
    SessionService,
    AuthGuard,
    AuthService,
    AuthUtils,
    MessageService,
    MenuService,
    ConfirmationService,
    AppMessageService,
    DialogService,
    RxStompService,
    OrdersEventsService
  ],
  entryComponents: [DeliveryAdressesFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private library: FaIconLibrary) {
    // regular
    this.library.addIcons(farEdit);
    // solid
    this.library.addIcons(fasUser, fasMapMarkedAlt, faQuestionCircle, fasTrashAlt, faMoneyCheckAlt,
      faChevronRight, faUserFriends, faPizzaSlice, faSpinner, faMoneyBillWave, fasCreditCard, faHourglassHalf);
    // brand
    this.library.addIcons();
  }
}
