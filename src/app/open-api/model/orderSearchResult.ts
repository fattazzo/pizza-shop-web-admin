/**
 * PizzaShop
 * <h1>REST API for managing a pizzeria.</h1> <br>  The application includes the management of:  <ul>     <li>users (workers and customers)</li>     <li>company branches</li>     <li>products (variations like doughs, dimensions and toppings, categories)</li>     <li>orders (creation, management)</li> <ul>
 *
 * OpenAPI spec version: 1.0.0
 * Contact: gianluca.fattarsi@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { OrderState } from './orderState';
import { ShippingType } from './shippingType';

export interface OrderSearchResult { 
    id: number;
    state: OrderState;
    shippingMethod: string;
    transactionId?: string;
    customerNote?: string;
    backofficeNote?: string;
    dateRequest: Date;
    dateCreation: Date;
    dateRequestConfirmed?: Date;
    total?: number;
    shippingType: ShippingType;
    customerUserName: string;
    deliveryAddressNumber?: string;
    deliveryAddressStreet?: string;
    deliveryAddressPlace?: string;
    deliveryAddressPostalCode?: string;
}