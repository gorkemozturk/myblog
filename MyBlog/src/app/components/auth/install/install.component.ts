import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.css']
})
export class InstallComponent implements OnInit {
  title: string = 'Uyugulama Kurulumu';
  form: FormGroup;
  submitted: boolean = false;
  
  result: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private userService: UsersService) { }

  ngOnInit() {
    this.installationForm();
    this.getUsers();
  }

  installationForm(): void {
    this.form = this.fb.group({
      firstName: [null, [Validators.required, Validators.maxLength(50)]],
      lastName: [null, [Validators.required, Validators.maxLength(25)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, 
    {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (this.form.invalid) { return; }

    this.authService.install(form.value).subscribe(response => {
      this.router.navigateByUrl('/login');
    });
  }

  getUsers(): void {
    this.userService.getResources().subscribe(response => {
      if (response.length > 0) {
        this.result = true;
      }
    });
  }

}
