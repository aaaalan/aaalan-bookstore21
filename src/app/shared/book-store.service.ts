import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Author, Book, Image } from "./book";

@Injectable()
export class BookStoreService {
  private api = "https://bookstore21.s1810456011.student.kwmhgb.at/api";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Book>> {
    return this.http
      .get<Array<Book>>(`${this.api}/books`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http
      .get<Book>(`${this.api}/book/${isbn}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  remove(isbn: String): Observable<any> {
    return this.http
      .delete(`${this.api}/book/${isbn}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getAllSearch(searchTerm: string): Observable<Array<Book>> {
    return this.http
      .get<Array<Book>>(`${this.api}/books/search/${searchTerm}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }


 create(book: Book): Observable<any> {
    return this.http
      .post(`${this.api}/book`, book)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  update(book: Book): Observable<any> {
    return this.http
      .put(`${this.api}/book/${book.isbn}`, book)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  check(isbn: String): Observable<Boolean> {
    return this.http
      .get<Boolean>(`${this.api}/books/checkisbn/${isbn}`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }


  private errorHandler(error: Error | any) {
    return throwError(error);
  }
}
