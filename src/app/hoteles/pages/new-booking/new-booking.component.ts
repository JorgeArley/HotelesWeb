import { Component } from '@angular/core';
import { Room } from '../../interfaces/room.interface';
import { HotelesService } from '../../services/hoteles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { Hotel } from '../../interfaces/hotel.interface';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';

export interface Search {
  name: string;
  id: string
}

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent {

  public listRooms:Room[] = [];
  public idHotel: string = '';

  myControl = new FormControl<string | Search>('');
  options: any = []
  role: string | null = '';
  filteredOptions: Observable<Search[]> | undefined;

  constructor(
    private hotelesService: HotelesService,
    private roomService: RoomService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.getHoteles();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(user: Search): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Search[] {
    const filterValue = name.toLowerCase();
    return this.options.filter((option: any) => option.name.toLowerCase().includes(filterValue));
  }

  getHoteles() {
    this.hotelesService.getHoteles()
      .subscribe( (resp:any) => {
        resp.hoteles.map( (hotel: any) => this.options.push(
          { name: hotel.nombre, id: hotel.id}
        ))
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

  EditarRoom(idRoom: string) {
    this.router.navigateByUrl(`hoteles/edit-room/${idRoom}`);
  }

}