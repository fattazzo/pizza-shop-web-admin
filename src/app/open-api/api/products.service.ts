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

import { Item } from '../model/item';
import { ItemProduct } from '../model/itemProduct';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class ProductsService {

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
     * Create a ItemProduct
     * Creates a new instance of a &#x60;ItemProduct&#x60;.
     * @param body A new &#x60;ItemProduct&#x60; to be created.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createItemProduct(body: ItemProduct, observe?: 'body', reportProgress?: boolean): Observable<ItemProduct>;
    public createItemProduct(body: ItemProduct, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ItemProduct>>;
    public createItemProduct(body: ItemProduct, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ItemProduct>>;
    public createItemProduct(body: ItemProduct, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createItemProduct.');
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

        return this.httpClient.request<ItemProduct>('post',`${this.basePath}/product/items`,
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
     * Delete a ItemProduct
     * Deletes an existing &#x60;ItemProduct&#x60;.
     * @param itemId A unique identifier for a &#x60;ItemProduct&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteItemProduct(itemId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteItemProduct(itemId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteItemProduct(itemId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteItemProduct(itemId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (itemId === null || itemId === undefined) {
            throw new Error('Required parameter itemId was null or undefined when calling deleteItemProduct.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/product/items/${encodeURIComponent(String(itemId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete a ItemProduct image
     * Deletes an existing &#x60;ItemProduct&#x60; image.
     * @param itemId A unique identifier for a &#x60;ItemProduct&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteItemProductImage(itemId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteItemProductImage(itemId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteItemProductImage(itemId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteItemProductImage(itemId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (itemId === null || itemId === undefined) {
            throw new Error('Required parameter itemId was null or undefined when calling deleteItemProductImage.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/product/items/${encodeURIComponent(String(itemId))}/image`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get a ItemProduct
     * Gets the details of a single instance of a &#x60;ItemProduct&#x60;.
     * @param itemId A unique identifier for a &#x60;ItemProduct&#x60;.
     * @param includeInvalidPrices Include prices from disabled categories and prices equal to zero
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getItemProduct(itemId: number, includeInvalidPrices?: boolean, observe?: 'body', reportProgress?: boolean): Observable<ItemProduct>;
    public getItemProduct(itemId: number, includeInvalidPrices?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ItemProduct>>;
    public getItemProduct(itemId: number, includeInvalidPrices?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ItemProduct>>;
    public getItemProduct(itemId: number, includeInvalidPrices?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (itemId === null || itemId === undefined) {
            throw new Error('Required parameter itemId was null or undefined when calling getItemProduct.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (includeInvalidPrices !== undefined && includeInvalidPrices !== null) {
            queryParameters = queryParameters.set('includeInvalidPrices', <any>includeInvalidPrices);
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

        return this.httpClient.request<ItemProduct>('get',`${this.basePath}/product/items/${encodeURIComponent(String(itemId))}`,
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
     * Get a ItemProduct image
     * Gets a &#x60;ItemProduct&#x60; image.
     * @param itemId A unique identifier for a &#x60;ItemProduct&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getItemProductImage(itemId: number, observe?: 'body', reportProgress?: boolean): Observable<Blob>;
    public getItemProductImage(itemId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Blob>>;
    public getItemProductImage(itemId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Blob>>;
    public getItemProductImage(itemId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (itemId === null || itemId === undefined) {
            throw new Error('Required parameter itemId was null or undefined when calling getItemProductImage.');
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
            'image/png'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Blob>('get',`${this.basePath}/product/items/${encodeURIComponent(String(itemId))}/image`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List All ItemProduct
     * Gets a list of all &#x60;ItemProduct&#x60; entities.
     * @param includeDisabled If true, the list of all entities include enabled and disabled &#x60;Product&#x60;
     * @param categoryId Filter all products by the category if present
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getItemProducts(includeDisabled?: boolean, categoryId?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Item>>;
    public getItemProducts(includeDisabled?: boolean, categoryId?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Item>>>;
    public getItemProducts(includeDisabled?: boolean, categoryId?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Item>>>;
    public getItemProducts(includeDisabled?: boolean, categoryId?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {



        let headers = this.defaultHeaders;
        if (includeDisabled !== undefined && includeDisabled !== null) {
            headers = headers.set('includeDisabled', String(includeDisabled));
        }
        if (categoryId !== undefined && categoryId !== null) {
            headers = headers.set('categoryId', String(categoryId));
        }

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

        return this.httpClient.request<Array<Item>>('get',`${this.basePath}/product/items`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update a ItemProduct
     * Updates an existing &#x60;ItemProduct&#x60;.
     * @param body Updated &#x60;ItemProduct&#x60; information.
     * @param itemId A unique identifier for a &#x60;ItemProduct&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateItemProduct(body: ItemProduct, itemId: number, observe?: 'body', reportProgress?: boolean): Observable<ItemProduct>;
    public updateItemProduct(body: ItemProduct, itemId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ItemProduct>>;
    public updateItemProduct(body: ItemProduct, itemId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ItemProduct>>;
    public updateItemProduct(body: ItemProduct, itemId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateItemProduct.');
        }

        if (itemId === null || itemId === undefined) {
            throw new Error('Required parameter itemId was null or undefined when calling updateItemProduct.');
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

        return this.httpClient.request<ItemProduct>('put',`${this.basePath}/product/items/${encodeURIComponent(String(itemId))}`,
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
     * Update a ItemProduct image
     * Updates an existing &#x60;ItemProduct&#x60; image.
     * @param file 
     * @param itemId A unique identifier for a &#x60;ItemProduct&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateItemProductImage(file: Blob, itemId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateItemProductImage(file: Blob, itemId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateItemProductImage(file: Blob, itemId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateItemProductImage(file: Blob, itemId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (file === null || file === undefined) {
            throw new Error('Required parameter file was null or undefined when calling updateItemProductImage.');
        }

        if (itemId === null || itemId === undefined) {
            throw new Error('Required parameter itemId was null or undefined when calling updateItemProductImage.');
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
            'multipart/form-data'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): void; };
        let useForm = false;
        let convertFormParamsToString = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        }

        if (file !== undefined) {
            formParams = formParams.append('file', <any>file) as any || formParams;
        }

        return this.httpClient.request<any>('put',`${this.basePath}/product/items/${encodeURIComponent(String(itemId))}/image`,
            {
                body: convertFormParamsToString ? formParams.toString() : formParams,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
