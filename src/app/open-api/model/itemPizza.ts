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
import { Category } from './category';
import { Item } from './item';
import { ItemPizzaPrice } from './itemPizzaPrice';
import { ToppingExtra } from './toppingExtra';
import { VariationDough } from './variationDough';
import { VariationSize } from './variationSize';

export interface ItemPizza extends Item { 
    prices?: Array<ItemPizzaPrice>;
    readonly doughs?: Array<VariationDough>;
    readonly sizes?: Array<VariationSize>;
    readonly toppingExtras?: Array<ToppingExtra>;
}