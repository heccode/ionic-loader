import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  cover: string = './assets/images/cover.jpeg'
  allowed: boolean = false
  profile: Profile = {
    fullname: '',
    age: 0,
    email: '',
    greeting: ''
  }

  constructor(private router: Router) { }

  ngOnInit() {
    const profileData = window.localStorage.getItem('profile')

    if (profileData) {
      this.profile = JSON.parse(profileData)
      this.allowed = true
    }

    if (!this.allowed) {
      this.router.navigate(['/'])
    }
  }
}
