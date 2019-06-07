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
    if (!this.user.username) {
      this.errorMessage = "Kullanıcı adı boş bırakılamaz.";
      return;
    }
    if (!this.user.password) {
      this.errorMessage = "Parola boş bırakılamaz.";
      return;
    }
    if (this.user.password.length < 6) {
      this.errorMessage = "Parola en az 6 karakterden oluşmalıdır.";
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
  }
}
