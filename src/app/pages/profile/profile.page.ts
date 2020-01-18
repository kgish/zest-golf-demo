import { Component, OnInit } from '@angular/core';

import { AuthService, IUser } from '../../services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  currentUser: IUser;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
  }

  get title() {
    return 'Profile';
  }
}
