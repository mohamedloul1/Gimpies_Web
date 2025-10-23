import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-order-drawer',
  templateUrl: './create-order-drawer.component.html',
  styleUrls: ['./create-order-drawer.component.scss']
})
export class CreateOrderDrawerComponent implements OnInit {

  constructor(private router: Router) {}

  close() {
    this.router.navigate([{ outlets: { drawer: null } }]); // sluit outlet
  }
  ngOnInit() {
  }

}
