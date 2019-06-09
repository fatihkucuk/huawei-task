import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user-model';
import { PageMode } from '../../enums/page-mode-enum';
import { UserRepository } from '../../repositories/user-repository';
import { BaseComponent } from '../base-component';
import { LocalStorageHandler } from '../../helpers/local-storage-handler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserRepository]
})

export class LoginComponent extends BaseComponent implements OnInit {
  user = new UserModel();
  pageMode: PageMode = PageMode.Signup;
  constructor(private router: Router, private userRepo: UserRepository) {
    super();
  }

  ngOnInit() {
  }

  loginButtonClicked() {
    if (!this.user.username) {
      this.hasError = true;
      this.errorMessage = "Username cannot be empty.";
      return;
    }
    if (!this.user.password) {
      this.hasError = true;
      this.errorMessage = "Password cannot be empty.";
      return;
    }
    this.login();
  }

  login() {
    this.startProgress("");
    this.userRepo
      .login(this.user)
      .then(res => {
        if (res.hasError) {
          this.hasError = true;
          this.errorMessage = res.getFirstErrorMessage();
          this.stopProgress();
        } else {
          this.user = res.entity;
          if (this.user) {
            LocalStorageHandler.setUser(this.user);
            this.router.navigateByUrl('dashboard/list');
          }
          this.stopProgress();
        }
      })
      .catch(err => {
        this.hasError = true;
        this.errorMessage = "Bağlantı kurulurken bir hata oluştu. Lütfen tekrar deneyiniz.";
        this.stopProgress();
      });
  }

  signupButtonClicked() {
    if (!this.user.name) {
      this.hasError = true;
      this.errorMessage = "Name cannot be empty.";
      return;
    }
    if (!this.user.username) {
      this.hasError = true;
      this.errorMessage = "Username cannot be empty.";
      return;
    }
    if (!this.user.password) {
      this.hasError = true;
      this.errorMessage = "Password cannot be empty.";
      return;
    }
    if (this.user.password.length < 6) {
      this.hasError = true;
      this.errorMessage = "Password must be at least 6 characters";
      return;
    }
    if (this.user.password != this.user.passwordConfirm) {
      this.hasError = true;
      this.errorMessage = "Passwords do not match";
      return;
    }
    this.signup();
  }

  signup() {
    this.startProgress("");
    this.userRepo
      .signup(this.user)
      .then(res => {
        if (res.hasError) {
          this.hasError = true;
          this.errorMessage = res.getFirstErrorMessage();
          this.stopProgress();
        } else {
          this.user = res.entity;
          LocalStorageHandler.setUser(this.user);
          this.router.navigateByUrl('dashboard/list');
          this.stopProgress();
        }
      })
      .catch(err => {
        this.hasError = true;
        this.errorMessage = "Bağlantı kurulurken bir hata oluştu. Lütfen tekrar deneyiniz.";
        this.stopProgress();
      });
  }

  changePageMode(pageMode: number) {
    this.pageMode = pageMode;
    this.hasError = false;
    this.errorMessage = "";
  }
}
