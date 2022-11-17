import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';

import { MenuOptionsComponent } from 'src/app/views/home/menu-options/menu-options.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {



  constructor(
    private dialog: MatDialog,
   ) { }

  ngOnInit(): void {

  }

  openMenu(){
    const dialogRef = this.dialog.open(MenuOptionsComponent, {
      width: '300px'
     });
     dialogRef.afterClosed().subscribe(() => {
     })
  }



}
