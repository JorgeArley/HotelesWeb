import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { environments } from 'src/environments/environments';
import { tap } from 'rxjs';

const base_url = environments.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  postUser( formData: User) {
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap( (user:any) => localStorage.setItem('token', user.token )),
      );
  }
}
