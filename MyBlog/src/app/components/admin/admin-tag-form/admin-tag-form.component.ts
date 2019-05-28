import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TagService } from 'src/app/services/tag.service';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-tag-form',
  templateUrl: './admin-tag-form.component.html',
  styleUrls: ['./admin-tag-form.component.css']
})
export class AdminTagFormComponent implements OnInit {
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data, private tagService: TagService, private fb: FormBuilder) { }

  ngOnInit() {
    this.tagInsertingForm();

    if(this.data.tag) {
      this.tagUpdatingForm(this.data.tag);
    }
  }

  get field() { return this.form.controls; }

  onSubmit(form: NgForm): void {
    if (this.data.tag) {
      this.tagService.putResource(this.data.tag.id, form.value).subscribe(response => console.log('Etiket başarılı bir şekilde güncellendi.'));
    }
    else {
      this.tagService.postResource(form.value).subscribe(response => console.log('Etiket başarılı bir şekilde eklendi.'));
    }
  }

  tagInsertingForm(): void {
    this.form = this.fb.group({
      tagName: [null, [Validators.required, Validators.maxLength(25)]],
    });
  }

  tagUpdatingForm(tag: any): void {
    this.form.addControl('id', new FormControl(tag.id));

    this.form.patchValue({
      tagName: tag.tagName
    });
  }

}
