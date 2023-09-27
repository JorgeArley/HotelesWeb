import { Component } from '@angular/core';
import { Room } from '../../interfaces/room.interface';
import { HotelesService } from '../../services/hoteles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { Hotel } from '../../interfaces/hotel.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent {

  public listHotels:Hotel[] = [];
  public listRooms:Room[] = [];
  public idHotel: string = '';

  constructor(
    private hotelesService: HotelesService,
    private roomService: RoomService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHoteles();
  }

  getHoteles() {
    this.hotelesService.getHoteles()
    .subscribe( (hoteles:any) => {
      this.listHotels = hoteles.hoteles
    });
  }

  getHotel(id: string) {
    this.roomService.getHabitacionByHotel(id)
      .subscribe( (rooms:any) => {
        if(!rooms.habitacion.length) {
          Swal.fire('Error', "No hay reservas", 'error');
        }
        this.listRooms = rooms.habitacion
        this.idHotel = id;
      });
  }

  guardarReserva(idRoom: string) {
    this.router.navigateByUrl(`hoteles/new-reserve/${this.idHotel}/${idRoom}`);
  }

}
