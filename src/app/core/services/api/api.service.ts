import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(
      private http: HttpClient
  ) { }

  post(endpoint: string, body) {
    return this.http.post(`${this.baseUrl}/${endpoint}`, body)
        .pipe(
            catchError(this.handleErr)
        );
  }

  get(endpoint: string) {
    return this.http.get(`${this.baseUrl}/${endpoint}`)
        .pipe(
            catchError(this.handleErr)
        );
  }

  private handleErr(err: any) {
    // TODO: handle err
    console.log(err);
    return of(err);
  }
}
