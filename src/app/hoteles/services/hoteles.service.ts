import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, of } from 'rxjs';
import { environments } from '../../../environments/environments';
import { Hotel } from '../interfaces/hotel.interface';

@Injectable({
  providedIn: 'root'
})
export class HotelesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getHoteles():Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${ this.baseUrl }/hoteles`);
  }

  getHotelById( id: string ): Observable<Hotel|undefined> {
    return this.http.get<Hotel>(`${ this.baseUrl }/hoteles/${ id }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  getSuggestions( query: string ): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${ this.baseUrl }/hoteles?q=${ query }&_limit=6`);
  }

}