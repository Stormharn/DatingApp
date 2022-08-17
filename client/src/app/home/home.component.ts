import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor() { }

  ngOnInit(): void {
  }

  startRegister() {
    this.registerMode = true;
  }

  cancelRegister(event: boolean) {
    this.registerMode = event;
  }
}
