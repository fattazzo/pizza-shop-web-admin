/**
 * PizzaShop
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
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

import { ShippingMethod } from '../model/shippingMethod';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class ShippingmethodsService {

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
     * Create a ShippingMethod
     * Creates a new instance of a &#x60;ShippingMethod&#x60;.
     * @param body A new &#x60;ShippingMethod&#x60; to be created.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createShippingMethod(body: ShippingMethod, observe?: 'body', reportProgress?: boolean): Observable<ShippingMethod>;
    public createShippingMethod(body: ShippingMethod, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ShippingMethod>>;
    public createShippingMethod(body: ShippingMethod, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ShippingMethod>>;
    public createShippingMethod(body: ShippingMethod, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createShippingMethod.');
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

        return this.httpClient.request<ShippingMethod>('post',`${this.basePath}/shippingmethods`,
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
     * Delete a ShippingMethod
     * Deletes an existing &#x60;ShippingMethod&#x60;.
     * @param shippingmethodId A unique identifier for a &#x60;ShippingMethod&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteShippingMethod(shippingmethodId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteShippingMethod(shippingmethodId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteShippingMethod(shippingmethodId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteShippingMethod(shippingmethodId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (shippingmethodId === null || shippingmethodId === undefined) {
            throw new Error('Required parameter shippingmethodId was null or undefined when calling deleteShippingMethod.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/shippingmethods/${encodeURIComponent(String(shippingmethodId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get a ShippingMethod
     * Gets the details of a single instance of a &#x60;ShippingMethod&#x60;.
     * @param shippingmethodId A unique identifier for a &#x60;ShippingMethod&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getShippingMethod(shippingmethodId: number, observe?: 'body', reportProgress?: boolean): Observable<ShippingMethod>;
    public getShippingMethod(shippingmethodId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ShippingMethod>>;
    public getShippingMethod(shippingmethodId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ShippingMethod>>;
    public getShippingMethod(shippingmethodId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (shippingmethodId === null || shippingmethodId === undefined) {
            throw new Error('Required parameter shippingmethodId was null or undefined when calling getShippingMethod.');
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

        return this.httpClient.request<ShippingMethod>('get',`${this.basePath}/shippingmethods/${encodeURIComponent(String(shippingmethodId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List All shippingmethods
     * Gets a list of all &#x60;ShippingMethod&#x60; entities.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getShippingMethods(observe?: 'body', reportProgress?: boolean): Observable<Array<ShippingMethod>>;
    public getShippingMethods(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ShippingMethod>>>;
    public getShippingMethods(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ShippingMethod>>>;
    public getShippingMethods(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<Array<ShippingMethod>>('get',`${this.basePath}/shippingmethods`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update a ShippingMethod
     * Updates an existing &#x60;ShippingMethod&#x60;.
     * @param body Updated &#x60;ShippingMethod&#x60; information.
     * @param shippingmethodId A unique identifier for a &#x60;ShippingMethod&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateShippingMethod(body: ShippingMethod, shippingmethodId: number, observe?: 'body', reportProgress?: boolean): Observable<ShippingMethod>;
    public updateShippingMethod(body: ShippingMethod, shippingmethodId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ShippingMethod>>;
    public updateShippingMethod(body: ShippingMethod, shippingmethodId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ShippingMethod>>;
    public updateShippingMethod(body: ShippingMethod, shippingmethodId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateShippingMethod.');
        }

        if (shippingmethodId === null || shippingmethodId === undefined) {
            throw new Error('Required parameter shippingmethodId was null or undefined when calling updateShippingMethod.');
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

        return this.httpClient.request<ShippingMethod>('put',`${this.basePath}/shippingmethods/${encodeURIComponent(String(shippingmethodId))}`,
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
