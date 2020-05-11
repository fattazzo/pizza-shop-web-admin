import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { BranchesService } from './api/branches.service';
import { CategoriesService } from './api/categories.service';
import { CompaniesService } from './api/companies.service';
import { DashboardService } from './api/dashboard.service';
import { GroupsService } from './api/groups.service';
import { PizzacategoriesService } from './api/pizzacategories.service';
import { PizzasService } from './api/pizzas.service';
import { PizzavariationsService } from './api/pizzavariations.service';
import { ProductcategoriesService } from './api/productcategories.service';
import { ProductsService } from './api/products.service';
import { ProductvariationsService } from './api/productvariations.service';
import { RegistrationService } from './api/registration.service';
import { SessionService } from './api/session.service';
import { SettingsService } from './api/settings.service';
import { ShippingmethodsService } from './api/shippingmethods.service';
import { ToppingextrasService } from './api/toppingextras.service';
import { UsersService } from './api/users.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    BranchesService,
    CategoriesService,
    CompaniesService,
    DashboardService,
    GroupsService,
    PizzacategoriesService,
    PizzasService,
    PizzavariationsService,
    ProductcategoriesService,
    ProductsService,
    ProductvariationsService,
    RegistrationService,
    SessionService,
    SettingsService,
    ShippingmethodsService,
    ToppingextrasService,
    UsersService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
