import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { ApiService } from '../api/api.service';
import { map, tap, filter, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly endpoint = 'clients.json';

  constructor(private http: ApiService) { }

  register(newUser: UserModel): Observable<any> {
      return this.http.get(this.endpoint)
        .pipe(
            map(users => {
                let filterObj = {};
                Object.keys(users).forEach((userKey) => {
                    const match = userKey && users[userKey].identification === newUser.identification;
                    filterObj = match ?  users[userKey] : {};
                });
                return Object.keys(filterObj).length > 0;
            }),
            switchMap(exists => exists && throwError({ exists: true }) || this.http.post(this.endpoint, newUser))
        );
  }
}
