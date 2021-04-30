import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication.service";
import { Book } from "../shared/book";
import { BookFactory } from "../shared/book-factory";
import { BookStoreService } from "../shared/book-store.service";

@Component({
  selector: "bs-book-details",
  templateUrl: "./book-details.component.html"
})
export class BookDetailsComponent implements OnInit {
  book: Book = BookFactory.empty();
  @Output() showListEvent = new EventEmitter<any>();

  constructor(
    private bs: BookStoreService,
    private route: ActivatedRoute,
    private router: Router,

    private authService: AuthenticationService,
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.bs.getSingle(params["isbn"]).subscribe(res => {
      this.book = res;
    });
  }

  getRating(num: number) {
    return new Array(num);
  }

  showBookList() {
    this.showListEvent.emit();
  }

  removeBook() {
    if (confirm("Wollen Sie das buch wirklich löschen?")) {
      this.bs.remove(this.book.isbn).subscribe(res => {
        this.router.navigate(["../"], { relativeTo: this.route });
      });
    }
  }
}
