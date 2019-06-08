import { Component, OnInit } from '@angular/core';
import { LocalStorageHandler } from '../../helpers/local-storage-handler';
import { UserRepository } from '../../repositories/user-repository';
import { BaseComponent } from '../base-component';
import { UserModel } from '../../models/user-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers: [UserRepository]
})
export class ContentComponent extends BaseComponent implements OnInit {
  hasAuthorize: boolean = false;
  userID: number;
  user: UserModel;
  constructor(private userRepo: UserRepository) { super(); }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userID = +LocalStorageHandler.getUserID();
    if (!this.userID) {
      return;
    }
    this.userRepo
      .get(this.userID)
      .then(res => {
        if (res.hasError) {
          this.hasError = true;
          this.errorMessage = res.getFirstErrorMessage();
        } else {
          this.hasError = false;
          this.user = res.entity;
          this.controlAuthorization(this.user.token);
        }
      })
      .catch(err => {
        this.hasError = true;
        this.errorMessage =
          "Bağlantı kurulurken bir hata oluştu. Lütfen tekrar deneyiniz.";
      });
  }

  controlAuthorization(userToken: string) {
    let token = LocalStorageHandler.getToken();
    this.hasAuthorize = userToken == token;
  }

}
