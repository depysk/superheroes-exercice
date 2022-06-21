import { Injectable } from '@angular/core';
import { UriBuilder } from './uri-builder';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, shareReplay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WsClient {
  constructor(private http: HttpClient, private uriBuilder: UriBuilder) {}

  private static handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  public get(uriTemplate: string, urlParams: any = {}): Observable<any> {
    const url = this.uriBuilder.buildUrl(uriTemplate, urlParams);
    return this.http.get<any>(url).pipe(shareReplay(1), catchError(WsClient.handleError.bind(this)));
  }

  public put(uriTemplate: string, urlParams: any, body: any): Observable<any> {
    const url = this.uriBuilder.buildUrl(uriTemplate, urlParams);
    return this.http.put<any>(url, body).pipe(shareReplay(1), catchError(WsClient.handleError.bind(this)));
  }

  public post(uriTemplate: string, urlParams: any, body: any): Observable<any> {
    const url = this.uriBuilder.buildUrl(uriTemplate, urlParams);
    return this.http.post<any>(url, body).pipe(shareReplay(1), catchError(WsClient.handleError.bind(this)));
  }

  public delete(uriTemplate: string, urlParams: any = {}): Observable<any> {
    const url = this.uriBuilder.buildUrl(uriTemplate, urlParams);
    return this.http.delete<any>(url).pipe(shareReplay(1), catchError(WsClient.handleError.bind(this)));
  }
}
