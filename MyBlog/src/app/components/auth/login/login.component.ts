import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title: string = 'Kullanıcı Girişi';
  form: FormGroup;
  submitted: boolean = false;
  
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm();
  }

  loginForm(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

}
