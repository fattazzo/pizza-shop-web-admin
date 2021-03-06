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

import { Topping } from '../model/topping';
import { VariationDough } from '../model/variationDough';
import { VariationSize } from '../model/variationSize';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class PizzavariationsService {

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
     * Create a Dough
     * Creates a new instance of a &#x60;Dough&#x60;.
     * @param body A new &#x60;Dough&#x60; to be created.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createDough(body: VariationDough, observe?: 'body', reportProgress?: boolean): Observable<VariationDough>;
    public createDough(body: VariationDough, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<VariationDough>>;
    public createDough(body: VariationDough, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<VariationDough>>;
    public createDough(body: VariationDough, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createDough.');
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

        return this.httpClient.request<VariationDough>('post',`${this.basePath}/pizza/variations/doughs`,
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
     * Create a Size
     * Creates a new instance of a &#x60;Size&#x60;.
     * @param body A new &#x60;Size&#x60; to be created.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createSize(body: VariationSize, observe?: 'body', reportProgress?: boolean): Observable<VariationSize>;
    public createSize(body: VariationSize, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<VariationSize>>;
    public createSize(body: VariationSize, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<VariationSize>>;
    public createSize(body: VariationSize, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createSize.');
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

        return this.httpClient.request<VariationSize>('post',`${this.basePath}/pizza/variations/sizes`,
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
     * Create a Topping
     * Creates a new instance of a &#x60;Topping&#x60;.
     * @param body A new &#x60;Topping&#x60; to be created.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createTopping(body: Topping, observe?: 'body', reportProgress?: boolean): Observable<Topping>;
    public createTopping(body: Topping, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Topping>>;
    public createTopping(body: Topping, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Topping>>;
    public createTopping(body: Topping, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createTopping.');
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

        return this.httpClient.request<Topping>('post',`${this.basePath}/pizza/variations/toppings`,
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
     * Delete a Dough
     * Deletes an existing &#x60;Dough&#x60;.
     * @param doughId A unique identifier for a &#x60;Dough&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteDough(doughId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteDough(doughId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteDough(doughId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteDough(doughId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (doughId === null || doughId === undefined) {
            throw new Error('Required parameter doughId was null or undefined when calling deleteDough.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/pizza/variations/doughs/${encodeURIComponent(String(doughId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete a Size
     * Deletes an existing &#x60;Size&#x60;.
     * @param sizeId A unique identifier for a &#x60;Size&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteSize(sizeId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteSize(sizeId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteSize(sizeId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteSize(sizeId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (sizeId === null || sizeId === undefined) {
            throw new Error('Required parameter sizeId was null or undefined when calling deleteSize.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/pizza/variations/sizes/${encodeURIComponent(String(sizeId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete a Topping
     * Deletes an existing &#x60;Topping&#x60;.
     * @param toppingId A unique identifier for a &#x60;Topping&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteTopping(toppingId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteTopping(toppingId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteTopping(toppingId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteTopping(toppingId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (toppingId === null || toppingId === undefined) {
            throw new Error('Required parameter toppingId was null or undefined when calling deleteTopping.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/pizza/variations/toppings/${encodeURIComponent(String(toppingId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get a Dough
     * Gets the details of a single instance of a &#x60;Dough&#x60;.
     * @param doughId A unique identifier for a &#x60;Dough&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getDough(doughId: number, observe?: 'body', reportProgress?: boolean): Observable<VariationDough>;
    public getDough(doughId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<VariationDough>>;
    public getDough(doughId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<VariationDough>>;
    public getDough(doughId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (doughId === null || doughId === undefined) {
            throw new Error('Required parameter doughId was null or undefined when calling getDough.');
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

        return this.httpClient.request<VariationDough>('get',`${this.basePath}/pizza/variations/doughs/${encodeURIComponent(String(doughId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List All doughs
     * Gets a list of all &#x60;Dough&#x60; entities.
     * @param includeDisabled If true, the list of all entities include enabled and disabled &#x60;Dough&#x60;
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getDoughs(includeDisabled?: boolean, observe?: 'body', reportProgress?: boolean): Observable<Array<VariationDough>>;
    public getDoughs(includeDisabled?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<VariationDough>>>;
    public getDoughs(includeDisabled?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<VariationDough>>>;
    public getDoughs(includeDisabled?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (includeDisabled !== undefined && includeDisabled !== null) {
            queryParameters = queryParameters.set('includeDisabled', <any>includeDisabled);
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

        return this.httpClient.request<Array<VariationDough>>('get',`${this.basePath}/pizza/variations/doughs`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get a Size
     * Gets the details of a single instance of a &#x60;Size&#x60;.
     * @param sizeId A unique identifier for a &#x60;Size&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getSize(sizeId: number, observe?: 'body', reportProgress?: boolean): Observable<VariationSize>;
    public getSize(sizeId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<VariationSize>>;
    public getSize(sizeId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<VariationSize>>;
    public getSize(sizeId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (sizeId === null || sizeId === undefined) {
            throw new Error('Required parameter sizeId was null or undefined when calling getSize.');
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

        return this.httpClient.request<VariationSize>('get',`${this.basePath}/pizza/variations/sizes/${encodeURIComponent(String(sizeId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List All sizes
     * Gets a list of all &#x60;Size&#x60; entities.
     * @param includeDisabled If true, the list of all entities include enabled and disabled &#x60;Size&#x60;
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getSizes(includeDisabled?: boolean, observe?: 'body', reportProgress?: boolean): Observable<Array<VariationSize>>;
    public getSizes(includeDisabled?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<VariationSize>>>;
    public getSizes(includeDisabled?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<VariationSize>>>;
    public getSizes(includeDisabled?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (includeDisabled !== undefined && includeDisabled !== null) {
            queryParameters = queryParameters.set('includeDisabled', <any>includeDisabled);
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

        return this.httpClient.request<Array<VariationSize>>('get',`${this.basePath}/pizza/variations/sizes`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get a Topping
     * Gets the details of a single instance of a &#x60;Topping&#x60;.
     * @param toppingId A unique identifier for a &#x60;Topping&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getTopping(toppingId: number, observe?: 'body', reportProgress?: boolean): Observable<Topping>;
    public getTopping(toppingId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Topping>>;
    public getTopping(toppingId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Topping>>;
    public getTopping(toppingId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (toppingId === null || toppingId === undefined) {
            throw new Error('Required parameter toppingId was null or undefined when calling getTopping.');
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

        return this.httpClient.request<Topping>('get',`${this.basePath}/pizza/variations/toppings/${encodeURIComponent(String(toppingId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List All toppings
     * Gets a list of all &#x60;Topping&#x60; entities.
     * @param includeDisabled If true, the list of all entities include enabled and disabled &#x60;Topping&#x60;
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getToppings(includeDisabled?: boolean, observe?: 'body', reportProgress?: boolean): Observable<Array<Topping>>;
    public getToppings(includeDisabled?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Topping>>>;
    public getToppings(includeDisabled?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Topping>>>;
    public getToppings(includeDisabled?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (includeDisabled !== undefined && includeDisabled !== null) {
            queryParameters = queryParameters.set('includeDisabled', <any>includeDisabled);
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

        return this.httpClient.request<Array<Topping>>('get',`${this.basePath}/pizza/variations/toppings`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update a Dough
     * Updates an existing &#x60;Dough&#x60;.
     * @param body Updated &#x60;Dough&#x60; information.
     * @param doughId A unique identifier for a &#x60;Dough&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateDough(body: VariationDough, doughId: number, observe?: 'body', reportProgress?: boolean): Observable<VariationDough>;
    public updateDough(body: VariationDough, doughId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<VariationDough>>;
    public updateDough(body: VariationDough, doughId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<VariationDough>>;
    public updateDough(body: VariationDough, doughId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateDough.');
        }

        if (doughId === null || doughId === undefined) {
            throw new Error('Required parameter doughId was null or undefined when calling updateDough.');
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

        return this.httpClient.request<VariationDough>('put',`${this.basePath}/pizza/variations/doughs/${encodeURIComponent(String(doughId))}`,
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
     * Update a Size
     * Updates an existing &#x60;Size&#x60;.
     * @param body Updated &#x60;Size&#x60; information.
     * @param sizeId A unique identifier for a &#x60;Size&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateSize(body: VariationSize, sizeId: number, observe?: 'body', reportProgress?: boolean): Observable<VariationSize>;
    public updateSize(body: VariationSize, sizeId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<VariationSize>>;
    public updateSize(body: VariationSize, sizeId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<VariationSize>>;
    public updateSize(body: VariationSize, sizeId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateSize.');
        }

        if (sizeId === null || sizeId === undefined) {
            throw new Error('Required parameter sizeId was null or undefined when calling updateSize.');
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

        return this.httpClient.request<VariationSize>('put',`${this.basePath}/pizza/variations/sizes/${encodeURIComponent(String(sizeId))}`,
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
     * Update a Topping
     * Updates an existing &#x60;Topping&#x60;.
     * @param body Updated &#x60;Topping&#x60; information.
     * @param toppingId A unique identifier for a &#x60;Topping&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateTopping(body: Topping, toppingId: number, observe?: 'body', reportProgress?: boolean): Observable<Topping>;
    public updateTopping(body: Topping, toppingId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Topping>>;
    public updateTopping(body: Topping, toppingId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Topping>>;
    public updateTopping(body: Topping, toppingId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateTopping.');
        }

        if (toppingId === null || toppingId === undefined) {
            throw new Error('Required parameter toppingId was null or undefined when calling updateTopping.');
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

        return this.httpClient.request<Topping>('put',`${this.basePath}/pizza/variations/toppings/${encodeURIComponent(String(toppingId))}`,
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
