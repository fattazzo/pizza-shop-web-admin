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
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { OrderDetails } from '../model/orderDetails';
import { OrderRequest } from '../model/orderRequest';
import { OrderSearchParameters } from '../model/orderSearchParameters';
import { OrderSearchResult } from '../model/orderSearchResult';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class OrdersService {

    protected basePath = 'https://virtserver.swaggerhub.com/fattazzo/pizza-shop/1.0.0';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Create a Order
     * Creates a new instance of a &#x60;Order&#x60;.
     * @param body A new &#x60;Order&#x60; to be created.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createOrder(body: OrderRequest, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createOrder(body: OrderRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createOrder(body: OrderRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createOrder(body: OrderRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createOrder.');
        }

        let headers = this.defaultHeaders;

        // authentication (BearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('post',`${this.basePath}/orders`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete a Order
     * Deletes an existing &#x60;Order&#x60;.
     * @param orderId A unique identifier for a &#x60;Order&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteOrder(orderId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteOrder(orderId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteOrder(orderId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteOrder(orderId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (orderId === null || orderId === undefined) {
            throw new Error('Required parameter orderId was null or undefined when calling deleteOrder.');
        }

        let headers = this.defaultHeaders;

        // authentication (BearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/orders/${encodeURIComponent(String(orderId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get a Order
     * Gets the details of a single instance of a &#x60;OrderDetails&#x60;.
     * @param orderId A unique identifier for a &#x60;Order&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getOrder(orderId: number, observe?: 'body', reportProgress?: boolean): Observable<OrderDetails>;
    public getOrder(orderId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrderDetails>>;
    public getOrder(orderId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrderDetails>>;
    public getOrder(orderId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (orderId === null || orderId === undefined) {
            throw new Error('Required parameter orderId was null or undefined when calling getOrder.');
        }

        let headers = this.defaultHeaders;

        // authentication (BearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<OrderDetails>('get',`${this.basePath}/orders/${encodeURIComponent(String(orderId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public searchOrders(body: OrderSearchParameters, observe?: 'body', reportProgress?: boolean): Observable<Array<OrderSearchResult>>;
    public searchOrders(body: OrderSearchParameters, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<OrderSearchResult>>>;
    public searchOrders(body: OrderSearchParameters, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<OrderSearchResult>>>;
    public searchOrders(body: OrderSearchParameters, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling searchOrders.');
        }

        let headers = this.defaultHeaders;

        // authentication (BearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<Array<OrderSearchResult>>('post',`${this.basePath}/orders/search`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update a Order
     * Updates an existing &#x60;OrderDetails&#x60;.
     * @param body Updated &#x60;OrderDetails&#x60; information.
     * @param orderId A unique identifier for a &#x60;Order&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateOrder(body: OrderDetails, orderId: number, observe?: 'body', reportProgress?: boolean): Observable<OrderDetails>;
    public updateOrder(body: OrderDetails, orderId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrderDetails>>;
    public updateOrder(body: OrderDetails, orderId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrderDetails>>;
    public updateOrder(body: OrderDetails, orderId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateOrder.');
        }

        if (orderId === null || orderId === undefined) {
            throw new Error('Required parameter orderId was null or undefined when calling updateOrder.');
        }

        let headers = this.defaultHeaders;

        // authentication (BearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<OrderDetails>('put',`${this.basePath}/orders/${encodeURIComponent(String(orderId))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
