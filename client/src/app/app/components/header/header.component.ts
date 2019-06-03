import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user-model';
import { LocalStorageHandler } from '../../helpers/local-storage-handler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user = new UserModel();
  constructor() { }

  ngOnInit() {
    this.user.userName = LocalStorageHandler.getUserName();
  }

  logoutButtonClicked() {
    LocalStorageHandler.removeUserInfos();
  }

}
