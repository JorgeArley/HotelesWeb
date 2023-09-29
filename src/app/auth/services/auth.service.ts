import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser():User|undefined {
    if ( !this.user ) return undefined;
    return structuredClone( this.user );
  }

  login( email: string, password: string ):Observable<User> {
    return this.http.post<User>(`${ this.baseUrl}/login`,{ email, password })
      .pipe(
        tap( user => this.user = user ),
        tap( (user:any) => localStorage.setItem('token', user.token )),
        tap( (user:any) => localStorage.setItem('role', user.type)),
      );
  }

  checkAuthentication(): Observable<boolean> {

    if ( !localStorage.getItem('token') ) return of(false);

    return this.http.get<User>(`${ this.baseUrl }/login/renew`)
      .pipe(
        tap( user => this.user = user ),
        map( user => !!user ),
        catchError( err => of(false) )
      );

  }


  logout() {
    this.user = undefined;
    localStorage.clear();
  }

}
