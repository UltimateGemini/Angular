import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() openSidenav = new EventEmitter<void>();
  public isAuth = false;
  public authSubscription: Subscription;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChanged.subscribe( authStatus => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onToggle() {
    this.openSidenav.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
