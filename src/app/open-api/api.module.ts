import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { BranchesService } from './api/branches.service';
import { CompaniesService } from './api/companies.service';
import { DashboardService } from './api/dashboard.service';
import { GroupsService } from './api/groups.service';
import { ProductsService } from './api/products.service';
import { SessionService } from './api/session.service';
import { SettingsService } from './api/settings.service';
import { ShippingmethodsService } from './api/shippingmethods.service';
import { UsersService } from './api/users.service';
import { VariationsService } from './api/variations.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    BranchesService,
    CompaniesService,
    DashboardService,
    GroupsService,
    ProductsService,
    SessionService,
    SettingsService,
    ShippingmethodsService,
    UsersService,
    VariationsService ]
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