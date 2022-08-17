import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  model: any = {}

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {

  }

  login() {
    this.subscription = this.accountService.login(this.model).subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  logout() {
    this.accountService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
