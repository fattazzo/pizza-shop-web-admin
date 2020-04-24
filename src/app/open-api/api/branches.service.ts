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

import { Branch } from '../model/branch';
import { BranchDetails } from '../model/branchDetails';
import { ShippingZone } from '../model/shippingZone';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class BranchesService {

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
     * Create a Branch for company
     * Creates a new instance of a &#x60;Branch&#x60;.
     * @param body A new &#x60;Branch&#x60; to be created.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createBranch(body: BranchDetails, observe?: 'body', reportProgress?: boolean): Observable<BranchDetails>;
    public createBranch(body: BranchDetails, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BranchDetails>>;
    public createBranch(body: BranchDetails, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BranchDetails>>;
    public createBranch(body: BranchDetails, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createBranch.');
        }

        let headers = this.defaultHeaders;

        // authentication (Authentication) required
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

        return this.httpClient.request<BranchDetails>('post',`${this.basePath}/branches`,
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
     * Delete a Branch
     * Deletes an existing &#x60;Branch&#x60;.
     * @param branchId A unique identifier for a &#x60;Branch&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteBranch(branchId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteBranch(branchId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteBranch(branchId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteBranch(branchId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (branchId === null || branchId === undefined) {
            throw new Error('Required parameter branchId was null or undefined when calling deleteBranch.');
        }

        let headers = this.defaultHeaders;

        // authentication (Authentication) required
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

        return this.httpClient.request<any>('delete',`${this.basePath}/branches/${encodeURIComponent(String(branchId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get a Branch
     * Gets the details of a single instance of a &#x60;Branch&#x60;.
     * @param branchId A unique identifier for a &#x60;Branch&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getBranch(branchId: number, observe?: 'body', reportProgress?: boolean): Observable<BranchDetails>;
    public getBranch(branchId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BranchDetails>>;
    public getBranch(branchId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BranchDetails>>;
    public getBranch(branchId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (branchId === null || branchId === undefined) {
            throw new Error('Required parameter branchId was null or undefined when calling getBranch.');
        }

        let headers = this.defaultHeaders;

        // authentication (Authentication) required
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

        return this.httpClient.request<BranchDetails>('get',`${this.basePath}/branches/${encodeURIComponent(String(branchId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List All branches of company
     * Gets a list of all &#x60;Branch&#x60; entities.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getBranches(observe?: 'body', reportProgress?: boolean): Observable<Array<Branch>>;
    public getBranches(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Branch>>>;
    public getBranches(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Branch>>>;
    public getBranches(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (Authentication) required
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

        return this.httpClient.request<Array<Branch>>('get',`${this.basePath}/branches`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List All shippingzones
     * Gets a list of all &#x60;ShippingZone&#x60; entities.
     * @param branchId A unique identifier for a &#x60;Branch&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getShippingZones(branchId: number, observe?: 'body', reportProgress?: boolean): Observable<Array<ShippingZone>>;
    public getShippingZones(branchId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ShippingZone>>>;
    public getShippingZones(branchId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ShippingZone>>>;
    public getShippingZones(branchId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (branchId === null || branchId === undefined) {
            throw new Error('Required parameter branchId was null or undefined when calling getShippingZones.');
        }

        let headers = this.defaultHeaders;

        // authentication (Authentication) required
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

        return this.httpClient.request<Array<ShippingZone>>('get',`${this.basePath}/branches/${encodeURIComponent(String(branchId))}/shippingzones`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update a Branch
     * Updates an existing &#x60;Branch&#x60;.
     * @param body Updated &#x60;Branch&#x60; information.
     * @param branchId A unique identifier for a &#x60;Branch&#x60;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateBranch(body: BranchDetails, branchId: number, observe?: 'body', reportProgress?: boolean): Observable<BranchDetails>;
    public updateBranch(body: BranchDetails, branchId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BranchDetails>>;
    public updateBranch(body: BranchDetails, branchId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BranchDetails>>;
    public updateBranch(body: BranchDetails, branchId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateBranch.');
        }

        if (branchId === null || branchId === undefined) {
            throw new Error('Required parameter branchId was null or undefined when calling updateBranch.');
        }

        let headers = this.defaultHeaders;

        // authentication (Authentication) required
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

        return this.httpClient.request<BranchDetails>('put',`${this.basePath}/branches/${encodeURIComponent(String(branchId))}`,
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
