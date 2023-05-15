import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      gender: ['male'],
      interestedIn: ['any'],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string) : ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }

  register() {
    this.subscription = this.accountService.register(this.model).subscribe({
      next: response => {
        this.cancel();
      },
      error: error => {
        console.log(error);
        this.toastr.error(error.error);
      }
      });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
