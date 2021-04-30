import { Component, VERSION } from "@angular/core";
import { AuthenticationService } from "./shared/authentication.service";
import { Book } from "./shared/book";

@Component({
  selector: "bs-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private AuthService:AuthenticationService){}

  isLoggedIn(){
    return this.AuthService.isLoggedIn();
  }

  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    }
    return "Login";
  }

}
