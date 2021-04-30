import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  ActivatedRoute
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class CanNavigateToAdminGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      window.alert(
        "Sie müssen sich einloggen, um den Admin Bereich nutzen zu können"
      );
      this.router.navigate(["../"], { relativeTo: this.route });
      return false;
    }

    return true;
  }
}
