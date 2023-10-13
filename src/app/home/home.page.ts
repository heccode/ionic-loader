import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from '../models/form.model'
import { Profile } from '../models/profile.model';
import { Image } from '../models/image.model';
import { INITIAL_FORM_DATA, INITIAL_IMAGES, INITIAL_PROFILE_DATA } from '../utils/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  timeoutFn: number | undefined
  timeout = 1000
  form: Form = INITIAL_FORM_DATA

  // For Loader Component
  loading = false
  images: Image[] = INITIAL_IMAGES

  private profile: Profile = INITIAL_PROFILE_DATA

  constructor(private router: Router) {

  }

  ngOnInit() {

  }

  calculateAge() {
    if (!this.form.datebirth) {
      return 0
    }

    const datebirth = new Date(this.form.datebirth)
    const diffDate = new Date(Date.now() - datebirth.getTime())


    return Math.abs(diffDate.getUTCFullYear() - 1970)
  }

  greeting() {
    return `Hola, me llamo ${this.profile.fullname}, espero que te contactes conmigo.`
  }

  assignValues() {
    this.profile.fullname = `${this.form.name} ${this.form.lastname}`
    this.profile.age = this.calculateAge()
    this.profile.email = this.form.email
    this.profile.greeting = this.greeting()
  }

  onSubmit() {
    this.loading = true
    this.assignValues()

    window.localStorage.setItem('profile', JSON.stringify(this.profile))

    this.timeoutFn = window.setTimeout(() => {
      this.loading = false

      this.router.navigate(['/result'])
    }, this.timeout)
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutFn)
  }
}
