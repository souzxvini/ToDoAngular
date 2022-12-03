import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-exit-dialog',
  templateUrl: './user-exit-dialog.component.html',
  styleUrls: ['./user-exit-dialog.component.css']
})
export class UserExitDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<UserExitDialogComponent>
    ) { dialogRef.disableClose = true}

  ngOnInit(): void {
  }

}
