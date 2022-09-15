import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsletterService } from 'src/services/newsletter.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { MatTable } from '@angular/material/table';

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
      // data: {name: this.name, animal: this.animal},
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
      this.interval = setTimeout(() => {
        this.successMsg = this.errorMsg = ''
        clearTimeout(this.interval)
      }, 5000);
    });
  }

  deleteNewsletter(id) {
    const params = {
      id: id
    }
    this.api.deleteNewsletter(params).subscribe((resp: any) => {
      if (resp?.success) {
        this.successMsg = resp?.msg
        const index = this.newsLetters.findIndex(r => r.id === id)
        if (index > -1) {
          this.newsLetters.splice(index, 1)
        }
        this.table.renderRows()
      } else {
        this.errorMsg = resp?.errors.general
      }
      this.interval = setTimeout(() => {
        this.successMsg = this.errorMsg = ''
        clearTimeout(this.interval)
      }, 5000);
    })
  }
}
