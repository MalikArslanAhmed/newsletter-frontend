import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UIHelpers } from 'src/helpers/ui-helpers';
import { NewsletterService } from 'src/services/newsletter.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
  addNewsletterForm: FormGroup
  apiCall = false
  successMsg = ''
  errorMsg = ''
  constructor(
    public dialogRef: MatDialogRef<NewsletterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private api: NewsletterService,
    public ui: UIHelpers,
  ) {
    this.addNewsletterForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
  }

  get g() {
    return this.addNewsletterForm.controls
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.apiCall = true
    this.api.addNewsletter(this.addNewsletterForm.value).subscribe((resp: any) => {
      if (resp.success) {
        this.dialogRef.close(resp);
        this.addNewsletterForm.reset()
      }
      this.apiCall = false
    })
  }
}
