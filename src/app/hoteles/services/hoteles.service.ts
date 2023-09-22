import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, map, of } from 'rxjs';
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

  addHotel( hotel: Hotel ): Observable<Hotel> {
    return this.http.post<Hotel>(`${ this.baseUrl }/hoteles`, hotel );
  }

  updateHotel( hotel: Hotel ): Observable<Hotel> {
    if ( !hotel.id ) throw Error('Hotel id is required');

    return this.http.patch<Hotel>(`${ this.baseUrl }/hoteles/${ hotel.id }`, hotel );
  }

  deleteHotelById( id: string ): Observable<boolean> {

    return this.http.delete(`${ this.baseUrl }/hoteles/${ id }`)
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }

}