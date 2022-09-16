import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsletterService } from 'src/services/newsletter.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { MatTable } from '@angular/material/table';

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
  selector: 'app-add-newsletter',
  templateUrl: './add-newsletter.component.html',
  styleUrls: ['./add-newsletter.component.scss']
})
export class AddNewsletterComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  newsLetters = []
  displayedColumns: string[] = ['id', 'name', 'action'];
  errorMsg = ''
  successMsg = ''
  interval = null
  apiCall = false

  constructor(
    private api: NewsletterService,
    public dialog: MatDialog
  ) {
    this.api.getNewsletter().subscribe((resp: any) => {
      if (resp.success) {
        this.newsLetters = resp.data
      }
    })
  }

  ngOnInit(): void {
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(NewsletterComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(resp => {
      console.log('The dialog was closed', resp);
      if (resp?.success) {
        this.successMsg = resp?.msg
        this.newsLetters.push(resp.data)
        this.table.renderRows()
      } else {
        this.errorMsg = resp?.errors.general
      }
      this.setTimeout()
    });
  }

  deleteNewsletter(id) {
    const params = {
      id: id
    }
    const index = this.newsLetters.findIndex(r => r.id === id)
    this.apiCall = true
    this.api.deleteNewsletter(params).subscribe((resp: DBResp) => {
      this.apiCall = false

      if (resp?.success) {
        this.successMsg = resp?.msg
        if (index > -1) {
          this.newsLetters.splice(index, 1)
        }
        this.table.renderRows()
      } else {
        this.errorMsg = resp?.errors.general
      }
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
