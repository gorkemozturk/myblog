import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.css']
})
export class InstallComponent implements OnInit {
  title: string = 'Uyugulama Kurulumu';
  form: FormGroup;
  submitted: boolean = false;
  
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.installationForm();
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

}
