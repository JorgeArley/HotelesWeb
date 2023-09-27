import { Component } from '@angular/core';
import { HotelesService } from '../../services/hoteles.service';
import { Hotel } from '../../interfaces/hotel.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../interfaces/room.interface';
import { RoomService } from '../../services/room.service';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent {
  conversion!: string;
  potenciaNumero!: number;
  cantidad!: number;
  public listHotels:Hotel[] = [];
  public room:Room | undefined;

  public roomForm = new FormGroup({
    id: new FormControl(''),
    habilitado: new FormControl(true),
    disponible: new FormControl(true),
    hotel: new FormControl(''),
    costo_base: new FormControl('10000'),
    impuesto: new FormControl('1000'),
    tipo: new FormControl('grande'),
    ubicacion: new FormControl('españa'),
    numero: new FormControl('2'),
  });

  constructor(
    private hotelesService: HotelesService,
    private roomService: RoomService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  get currentRoom(): Room {
    const room = this.roomForm.value as Room;
    return room;
  }


  ngOnInit(): void {
    this.getHoteles();
    if (!this.router.url.includes('edit-room')) return;
    this.getHabitacionByID();
  }

  getHabitacionByID() {
    this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => this.roomService.getHabitacionById(id)),
    ).subscribe((resp:any) => {
      if (!resp) {
        return this.router.navigateByUrl('/');
      }

      this.roomForm.reset(resp.habitacion);
      this.roomForm.patchValue({hotel: resp.habitacion.hotel._id});
      return;
    });
  }

  getHoteles() {
    this.hotelesService.getHoteles()
    .subscribe( (hoteles:any) => {
      this.listHotels = hoteles.hoteles
    });
  }

  onSaveRoom() {
    if (this.roomForm.invalid) return;

    if (this.currentRoom.id) {
      this.roomService.updateHabitacion(this.currentRoom)
        .subscribe((resp: any) => {
          Swal.fire('Hecho', `${resp.habitacion.numero} actualizada!`, 'success');
        });

      return;
    }

    this.roomService.addHabitacion(this.currentRoom)
      .subscribe((resp:any) => {
        this.router.navigate(['/hoteles/edit-room', resp.habitacion.id]);
        Swal.fire('Hecho', `${resp.habitacion.numero} creado!`, 'success');

      });
  }

  onDeleteRoom() {
    console.log("eliminar habitacion")
  }
}
