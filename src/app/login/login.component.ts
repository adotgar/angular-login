import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  
  loginForm!: FormGroup
  errorMessage?: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ){ }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  
  login(){
    this.errorMessage = '';
    if (this.loginForm.valid){
      // Disable form and prepare data for request
      this.loginForm.disable();
      let userDetails = this.loginForm.getRawValue();
      let data = {
        username: userDetails.username,
        password: userDetails.password
      }

      // Send request to authenticate user
      this.loginService.getUser(data)
      .pipe(
        catchError((err)=>{
          if(err && err.status == 404 && err.error.message){
            // Add unauthenticated error
            this.errorMessage = 'Invalid username or password'
          }
          this.loginForm.enable();
          return of(err)
      }))
      .subscribe((res: any) =>{
        if(res && res.username){
          localStorage.setItem("userName", res.username);
          this.loginForm.enable();
          this.router.navigate(['/']);
        }
      });
    }
    else{
      this.errorMessage = 'There are missing fields'
    }
  }
 

}
