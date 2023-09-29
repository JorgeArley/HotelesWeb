import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from '../../../environments/environments';
import { Room } from '../interfaces/room.interface';
import { Booking, Bookingemail } from '../interfaces/booking.interface';

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

  sendEmail( reserva: Bookingemail ) {
    let { ...newValuesToSend } = reserva;
    return this.http.post(`${ this.baseUrl }/sendemail`, newValuesToSend);
  }

}
