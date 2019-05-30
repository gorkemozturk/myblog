import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-admin-page-form',
  templateUrl: './admin-page-form.component.html',
  styleUrls: ['./admin-page-form.component.css']
})
export class AdminPageFormComponent implements OnInit {
  title: string = null;

  form: FormGroup;
  submitted: boolean = false;

  id: any = null;
  
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private pageService: PageService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.pageInsertingForm();

    if (this.id === null) {
      this.title = 'Yeni Sayfa Oluştur';
    }
    else {
      this.title = 'Sayfayı Düzenle';
      this.pageService.getResource(this.id).subscribe(response => this.pageUpdatingForm(response));
    }
  }

  pageInsertingForm(): void {
    this.form = this.fb.group({
      title: [null, [Validators.required, Validators.maxLength(150)]],
      slug: [null, [Validators.required, Validators.maxLength(150)]],
      body: [null, Validators.required],
      isPrimary: [false],
      isPublished: [false],
    });
  }

  pageUpdatingForm(page: any): void {
    this.form.addControl('id', new FormControl(page.id));
    this.form.addControl('publishedAt', new FormControl(page.publishedAt));

    this.form.patchValue({
      title: page.title,
      slug: page.slug,
      body: page.body,
      isPrimary: page.isPrimary,
      isPublished: page.isPublished,
      publishedAt: page.publishedAt
    });
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (this.form.invalid) { return; }

    if (this.id)
      this.pageService.putResource(this.id, form.value).subscribe(response => this.router.navigateByUrl('/admin/pages'));
    else
      this.pageService.postResource(form.value).subscribe(response => this.router.navigateByUrl('/admin/pages'));
  }

  slugGenerate() {
    let title: any = this.form.get('title').value;
    if (!title) { return; }

    let slug = title.toLowerCase().trim();

    slug = slug.replace(/[^a-z0-9\s-]/g, ' ');
    slug = slug.replace(/[\s-]+/g, '-');

    this.form.patchValue({
      slug: slug
    });
  }


}
