import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ){}

  public myForm: FormGroup = this.fb.group({
    email:    ['jorge@gmail.com', [ Validators.required, Validators.email ]],
    password: ['123456', [ Validators.required, Validators.minLength(6) ]],
  });


  onLogin() {
    const { email, password } = this.myForm.value;

    this.authService.login(email,password)
    .subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (message) => {
        console.log(message)
      }
    })  
    
  }
}
