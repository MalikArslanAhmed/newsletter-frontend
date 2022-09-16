import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UIHelpers } from 'src/helpers/ui-helpers';
import { NewsletterService } from 'src/services/newsletter.service';
export interface DBResp {
  data?: data;
  msg?: string;
  success: boolean;
  errors?: errors
}
export interface data {
  id: number
  email: string
}
export interface errors {
  general: string
}
@Component({
  selector: 'app-add-email',
  templateUrl: './add-email.component.html',
  styleUrls: ['./add-email.component.scss']
})
export class AddEmailComponent implements OnInit {
  addEmailForm: FormGroup
  deleteEmailForm: FormGroup
  errorMsg = ''
  successMsg = ''
  apiCall = false
  interval = null
  constructor(
    private fb: FormBuilder,
    private api: NewsletterService,
    public ui: UIHelpers,

  ) {
  }

  ngOnInit(): void {
    this.addEmailForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    })
    this.deleteEmailForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  get g() {
    return this.addEmailForm.controls
  }

  get g1() {
    return this.deleteEmailForm.controls
  }

  subscribe() {
    this.apiCall = true
    this.api.addEmail(this.addEmailForm.value).subscribe((resp: DBResp) => {
      if (resp.success) {
        this.successMsg = resp.msg
      } else {
        this.errorMsg = resp.errors.general
      }
      this.apiCall = false
      this.addEmailForm.reset()
      this.setTimeout()
    })
  }

  unsubscribe() {
    this.apiCall = true
    this.api.deleteEmail(this.deleteEmailForm.value).subscribe((resp: DBResp) => {
      if (resp.success) {
        this.successMsg = resp.msg
      } else {
        this.errorMsg = resp.errors.general
      }
      this.apiCall = false
      this.deleteEmailForm.reset()
      this.setTimeout()
    })
  }

  setTimeout() {
    this.interval = setTimeout(() => {
      this.successMsg = this.errorMsg = ''
      clearTimeout(this.interval)
    }, 5000);
  }
}
