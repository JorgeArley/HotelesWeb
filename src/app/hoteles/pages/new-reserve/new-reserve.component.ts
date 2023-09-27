import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-reserve',
  templateUrl: './new-reserve.component.html',
  styleUrls: ['./new-reserve.component.css']
})
export class NewReserveComponent {

  public idHotel: string ='';
  public idHRoom: string ='';

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idHotel = params['idHotel'] || null;
      this.idHRoom = params['idRoom'] || null;
    });
  }

  public reserveForm: FormGroup = this.fb.group({
    
    fecha_ingreso: ['mayo', [ Validators.required ]],
    fecha_salida: ['diciembre', [ Validators.required ]],
    cantidad_personas: [6, [ Validators.required ]],
    ciudad_destino: ['mujer', [ Validators.required ]],
    contacto_emergencia: ['123456', [ Validators.required ]],
    tel_contacto: ['123456', [ Validators.required ]],
    habitacion: ['']
  });

  onSaveReserve(){
    this.reserveForm.patchValue({habitacion: this.idHRoom});

    this.bookingService.addReserva(this.reserveForm.value)
    .subscribe({
      next: (resp) => Swal.fire('Hecho', `Reserva hecha!`, 'success'),
      error: (message) => Swal.fire('Error', message.error.msg, 'error')
    })  

  }


}
