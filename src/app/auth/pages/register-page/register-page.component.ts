import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Genre } from '../../interfaces/genre';
import { UsuarioService } from '../../services/usuario.service';
import * as moment from 'moment';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  public genres: Genre[] = [
    {value: 'hombre', viewValue: 'Hombre'},
    {value: 'indefinido', viewValue: 'Indefinido'},
    {value: 'mujer', viewValue: 'Mujer'}
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ){}

  public formRegister: FormGroup = this.fb.group({
    nombre:    ['jorges', [ Validators.required, Validators.minLength(6) ]],
    apellidos: ['123456', [ Validators.required, Validators.minLength(6) ]],
    email: ['jorge@gmail.com', [ Validators.required, Validators.email ]],
    fecha_nacimiento: ['2010/12/12', [ Validators.required, Validators.minLength(6) ]],
    genero: ['mujer', [ Validators.required ]],
    tipo_documento: ['123456', [ Validators.required, Validators.minLength(6) ]],
    doc_user: ['123456', [ Validators.required, Validators.minLength(6) ]],
    telefono: ['123456', [ Validators.required, Validators.minLength(6) ]],
    password: ['123456', [ Validators.required, Validators.minLength(6) ]],
  });

  onRegister() {
    const newDate = moment(this.formRegister.value).format("YYYY-MM-DD");
    this.formRegister.patchValue({fecha_nacimiento: newDate});
    this.usuarioService.postUser(this.formRegister.value)
      .subscribe({
        next: (resp) => this.router.navigateByUrl('/'),
        error: (message) => {
          Swal.fire('Error', message.error.msg, 'error');
        }
      })  
  }

}