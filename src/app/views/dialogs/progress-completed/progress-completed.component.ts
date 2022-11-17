import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-progress-completed',
  templateUrl: './progress-completed.component.html',
  styleUrls: ['./progress-completed.component.css']
})
export class ProgressCompletedComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProgressCompletedComponent>
  ) { }

  ngOnInit(): void {
  }

  ok(){
    this.dialogRef.close();
  }

}
