import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import Swal from 'sweetalert2';
import { Genre } from 'src/app/auth/interfaces/genre';
import * as moment from 'moment';
import { Resident, User } from 'src/app/auth/interfaces/user';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-new-reserve',
  templateUrl: './new-reserve.component.html',
  styleUrls: ['./new-reserve.component.css']
})
export class NewReserveComponent {

  public idHotel: string ='';
  public idHRoom: string ='';
  public Residents: Resident[] =[];
  public msg: string = 'Notificacion de reserva en la habitacion: ';
  public genres: Genre[] = [
    {value: 'hombre', viewValue: 'Hombre'},
    {value: 'indefinido', viewValue: 'Indefinido'},
    {value: 'mujer', viewValue: 'Mujer'}
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  get user():User | undefined {
    return this.authService.currentUser;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idHotel = params['idHotel'] || null;
      this.idHRoom = params['idRoom'] || null;
    });
  }

  public reserveForm: FormGroup = this.fb.group({
    fecha_ingreso: ['', [ Validators.required ]],
    fecha_salida: ['', [ Validators.required ]],
    cantidad_personas: [1, [ Validators.required ]],
    ciudad_destino: ['', [ Validators.required ]],
    contacto_emergencia: ['', [ Validators.required ]],
    tel_contacto: ['', [ Validators.required ]],
    habitacion: [''],
    residents: [[]]
  });

  public formResident: FormGroup = this.fb.group({
    nombre:    ['', [ Validators.required, Validators.minLength(6) ]],
    apellidos: ['', [ Validators.required, Validators.minLength(6) ]],
    email: ['', [ Validators.required, Validators.email ]],
    fecha_nacimiento: ['', [ Validators.required, Validators.minLength(6) ]],
    genero: ['', [ Validators.required ]],
    tipo_documento: ['', [ Validators.required, Validators.minLength(6) ]],
    doc_user: ['', [ Validators.required, Validators.minLength(6) ]],
    telefono: ['', [ Validators.required, Validators.minLength(6) ]]
  });

  onSaveReserve(){
    this.reserveForm.patchValue({habitacion: this.idHRoom});
    this.reserveForm.patchValue({residents: this.Residents});

    this.reserveForm.patchValue({
      fecha_salida: this.formatDate(this.formatDate(this.reserveForm.value.fecha_salida))});
    this.reserveForm.patchValue({
      fecha_ingreso: this.formatDate(this.formatDate(this.reserveForm.value.fecha_ingreso))});

    this.bookingService.addReserva(this.reserveForm.value)
      .subscribe({
        next: (resp) => {
          Swal.fire('Hecho', `Reserva Hecha!! fue notificado al correo`, 'success');
          this.sendEmail(resp);
        },
        error: (message) => Swal.fire('Error', message.error.msg, 'error')
      })   
    }
    
    sendEmail(resp: any) {
      const queryToSend = { reserva:  `${this.msg} ${resp.Reserva.id}`, email: this.user!.email}
      this.bookingService.sendEmail(queryToSend)
        .subscribe({
          next: (resp) => console.log('email enviado'),
          error: (message) => Swal.fire('Error', message.error.msg, 'error')
        })      
    }

  saveResident() {
    this.formResident.patchValue({
      fecha_nacimiento: this.formatDate(this.formResident.value.fecha_nacimiento)});
    this.Residents.push(this.formResident.value);
  }

  formatDate(date: string) {
    return moment(date).format("YYYY-MM-DD");
  }

}
