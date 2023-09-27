import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from '../../../environments/environments';
import { Room } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getHabitaciones():Observable<Room[]> {
    return this.http.get<Room[]>(`${ this.baseUrl }/habitaciones`);
  }

  getHabitacionById( id: string ): Observable<Room|undefined> {
    return this.http.get<Room>(`${ this.baseUrl }/habitaciones/${ id }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  getHabitacionByHotel( id: string ): Observable<Room|undefined> {
    return this.http.get<Room>(`${ this.baseUrl }/habitaciones/hotel/${ id }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  addHabitacion( habitacion: Room ): Observable<Room> {
    let { id, ...newValuesToSend } = habitacion;
    return this.http.post<Room>(`${ this.baseUrl }/habitaciones`, newValuesToSend );
  }

  updateHabitacion( habitacion: Room ): Observable<Room> {
    if ( !habitacion.id ) throw Error('Habitacion id is required');

    return this.http.put<Room>(`${ this.baseUrl }/habitaciones/${ habitacion.id }`, habitacion );
  }

  deleteHabitacionById( id: string ): Observable<boolean> {

    return this.http.delete(`${ this.baseUrl }/habitaciones/${ id }`)
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }
}
