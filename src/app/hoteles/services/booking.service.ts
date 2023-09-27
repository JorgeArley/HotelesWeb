import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from '../../../environments/environments';
import { Room } from '../interfaces/room.interface';
import { Booking } from '../interfaces/booking.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  addReserva( reserva: Booking ): Observable<Booking> {
    let { ...newValuesToSend } = reserva;
    return this.http.post<Booking>(`${ this.baseUrl }/reservas`, newValuesToSend);
  }

}


// {
//   "_id": {
//     "$oid": "65122d6c7f9c7222b0be3e4e"
//   },
//   "fecha_ingreso": "hoy",
//   "fecha_salida": "mañana",
//   "cantidad_personas": "3",
//   "ciudad_destino": "colombia",
//   "contacto_emergencia": "wisnaldo lopez",
//   "tel_contacto": "32145685958",
//   "usuario": {
//     "$oid": "651228d57f9c7222b0be3e16"
//   },
//   "habitacion": {
//     "$oid": "65122d2f7f9c7222b0be3e43"
//   },
//   "__v": 0
// }