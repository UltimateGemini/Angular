import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';
import { UIService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authChanged = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChanged.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.authChanged.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = true;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.isLoading.next(true);
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      this.uiService.isLoading.next(false);
    })
    .catch(error => {
      this.uiService.isLoading.next(false);
      this.uiService.showSnackBar(error.message, null, 3000);
    });
  }

  login(authData: AuthData) {
    this.uiService.isLoading.next(true);
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then( result => {
      this.uiService.isLoading.next(false);
      console.log(result);
    })
    .catch(error => {
      this.uiService.isLoading.next(false);
      this.uiService.showSnackBar(error.message, null, 3000);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
