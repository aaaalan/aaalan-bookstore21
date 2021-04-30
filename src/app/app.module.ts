import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
// FormsModule vs ReactiveFormsModule
import { AppComponent } from "./app.component";
import { BookListComponent } from "./book-list/book-list.component";
import { BookListItemComponent } from "./book-list-item/book-list-item.component";
import { BookDetailsComponent } from "./book-details/book-details.component";
import { BookStoreService } from "./shared/book-store.service";
import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SearchComponent } from "./search/search.component";
import { BookFormComponent } from "./book-form/book-form.component";
import { LoginComponent } from "./login/login.component";
import { AuthenticationService } from "./shared/authentication.service";
import { TokenInterceptorService } from "./shared/token-interceptor.service";
import { JwtInterceptorService } from "./shared/jwt.interceptor.service";
import { registerLocaleData } from "@angular/common";
import localeDECH from '@angular/common/locales/de-CH';
import { IsbnPipe } from './shared/isbn.pipe';

registerLocaleData(localeDECH);

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    BookListComponent,
    BookListItemComponent,
    BookDetailsComponent,
    HomeComponent,
    SearchComponent,
    BookFormComponent,
    LoginComponent,
    IsbnPipe
  ],
  bootstrap: [AppComponent],
  providers: [
    BookStoreService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
      provide: LOCALE_ID, useValue:'de-ch',
    }
  ]
})
export class AppModule {}
