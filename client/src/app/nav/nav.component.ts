import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  model: any = {}

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService,
              private memberService: MembersService) { }

  ngOnInit(): void {

  }

  login() {
    this.subscription = this.accountService.login(this.model).subscribe({
      next: response => {
        this.memberService.login();
        this.router.navigateByUrl("/members");
      },
      error: error => {
        console.log(error);
      }
    })
  }

  logout() {
    this.memberService.logout();
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
