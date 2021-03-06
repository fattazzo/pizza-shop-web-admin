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

import { VariationProduct } from '../model/variationProduct';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class ProductvariationsService {

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
     * Create a VariationProduct
     * Creates a new instance of a &#x60;VariationProduct&#x60;.
     * @param body A new &#x60;VariationProduct&#x60; to be created.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createVariationProduct(body: VariationProduct, observe?: 'body', reportProgress?: boolean): Observable<VariationProduct>;
    public createVariationProduct(body: VariationProduct, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<VariationProduct>>;
    public createVariationProduct(body: VariationProduct, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<VariationProduct>>;
    public createVariationProduct(body: VariationProduct, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createVariationProduct.');
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

        return this.httpClient.request<VariationProduct>('post',`${this.basePath}/product/variations`,
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
     * Delete a VariationProduct
     * Deletes an existing &#x60;VariationProduct&#x60;.
     * @param variationId A unique identifier for a &#x60;VariationProduct&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteVariationProduct(variationId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteVariationProduct(variationId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteVariationProduct(variationId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteVariationProduct(variationId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (variationId === null || variationId === undefined) {
            throw new Error('Required parameter variationId was null or undefined when calling deleteVariationProduct.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/product/variations/${encodeURIComponent(String(variationId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get a VariationProduct
     * Gets the details of a single instance of a &#x60;VariationProduct&#x60;.
     * @param variationId A unique identifier for a &#x60;VariationProduct&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getVariationProduct(variationId: number, observe?: 'body', reportProgress?: boolean): Observable<VariationProduct>;
    public getVariationProduct(variationId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<VariationProduct>>;
    public getVariationProduct(variationId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<VariationProduct>>;
    public getVariationProduct(variationId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (variationId === null || variationId === undefined) {
            throw new Error('Required parameter variationId was null or undefined when calling getVariationProduct.');
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

        return this.httpClient.request<VariationProduct>('get',`${this.basePath}/product/variations/${encodeURIComponent(String(variationId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List All VariationProducts
     * Gets a list of all &#x60;VariationProduct&#x60; entities.
     * @param includeDisabled If true, the list of all entities include enabled and disabled &#x60;VariationProduct&#x60;
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getVariationProducts(includeDisabled?: boolean, observe?: 'body', reportProgress?: boolean): Observable<Array<VariationProduct>>;
    public getVariationProducts(includeDisabled?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<VariationProduct>>>;
    public getVariationProducts(includeDisabled?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<VariationProduct>>>;
    public getVariationProducts(includeDisabled?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.request<Array<VariationProduct>>('get',`${this.basePath}/product/variations`,
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
     * Update a VariationProduct
     * Updates an existing &#x60;VariationProduct&#x60;.
     * @param body Updated &#x60;VariationProduct&#x60; information.
     * @param variationId A unique identifier for a &#x60;VariationProduct&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateVariationProduct(body: VariationProduct, variationId: number, observe?: 'body', reportProgress?: boolean): Observable<VariationProduct>;
    public updateVariationProduct(body: VariationProduct, variationId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<VariationProduct>>;
    public updateVariationProduct(body: VariationProduct, variationId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<VariationProduct>>;
    public updateVariationProduct(body: VariationProduct, variationId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateVariationProduct.');
        }

        if (variationId === null || variationId === undefined) {
            throw new Error('Required parameter variationId was null or undefined when calling updateVariationProduct.');
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

        return this.httpClient.request<VariationProduct>('put',`${this.basePath}/product/variations/${encodeURIComponent(String(variationId))}`,
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
