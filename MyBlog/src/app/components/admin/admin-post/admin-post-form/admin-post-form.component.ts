import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { TagService } from 'src/app/services/tag.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminTagFormComponent } from '../../admin-tag-form/admin-tag-form.component';

@Component({
  selector: 'app-admin-post-form',
  templateUrl: './admin-post-form.component.html',
  styleUrls: ['./admin-post-form.component.css']
})
export class AdminPostFormComponent implements OnInit {
  title: string = null;

  form: FormGroup;
  submitted: boolean = false;

  id: any = null;

  tags: any [] = [];
  inputTags: number[] = [];

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute, 
    private postService: PostService, 
    private authService: AuthService,
    private tagService: TagService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.postInsertingForm();

    if (this.id === null) {
      this.title = 'Yeni Makale Oluştur';
    }
    else {
      this.title = 'Makaleyi Düzenle';
      this.postService.getResource(this.id).subscribe(response => this.postUpdatingForm(response));
    }

    this.getTags();
  }

  postInsertingForm(): void {
    this.form = this.fb.group({
      title: [null, [Validators.required, Validators.maxLength(150)]],
      slug: [null, [Validators.required, Validators.maxLength(150)]],
      summary: [null, [Validators.required, Validators.maxLength(250)]],
      body: [null, [Validators.required]],
      isPublished: [false],
      userId: [this.authService.currentUser.sub],
      tags: this.inputTags
    });
  }

  postUpdatingForm(post: any): void {
    this.form.addControl('id', new FormControl(post.id));

    this.form.patchValue({
      title: post.title,
      slug: post.slug,
      summary: post.summary,
      body: post.body,
      isPublished: post.isPublished
    });
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (this.form.invalid) { return; }

    if (this.id)
      this.postService.putResource(this.id, form.value).subscribe(response => this.router.navigateByUrl('/admin/posts'));
    else
      this.postService.postResource(form.value).subscribe(response => this.router.navigateByUrl('/admin/posts'));
  }

  getTags(): void {
    this.tagService.getResources().subscribe(response => this.tags = response);
  }

  isInTags(id: number): boolean {
    let result: boolean = false;
    for (let t in this.inputTags) {
      (this.inputTags[t] === id) ? result = true : '';
    }

    return result;
  }

  onSelect(tag: any): void {
    const index = this.inputTags.indexOf(tag.id);
    if (index === -1) {
      this.inputTags.push(tag.id);
      this.form.patchValue({
        tags: this.inputTags
      });
    }
    else {
      this.inputTags.splice(index, 1);
      this.form.patchValue({
        tags: this.inputTags
      });
    }
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

  openTagForm(tag?: any): void {
    const dialogRef = this.dialog.open(AdminTagFormComponent, {
      panelClass: 'customized-dialog',
      disableClose: false,
      autoFocus: false,
      data: { tag }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTags();
    }); 
  }

  onDeleteTag(tag: any): void {
    this.tagService.deleteResource(tag.id).subscribe(response => {
      const index = this.tags.indexOf(tag);
      this.tags.splice(index, 1);
    });
  }

}
