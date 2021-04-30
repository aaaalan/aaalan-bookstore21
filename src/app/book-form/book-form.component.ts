import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Book } from "../shared/book";
import { BookFactory } from "../shared/book-factory";
import { BookStoreService } from "../shared/book-store.service";
import {  BookValidators } from "../shared/book-validators";
import { BookFormErrorMessages } from "./book-form-error-messages";

@Component({
  selector: "app-book-form",
  templateUrl: "./book-form.component.html"
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  book = BookFactory.empty();
  isUpdatingBook = false;
  errors: { [key: string]: string } = {};
  images: FormArray;

  constructor(
    private fb: FormBuilder,
    private bs: BookStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const isbn = this.route.snapshot.params["isbn"];
    if (isbn) {
      this.isUpdatingBook = true;
      this.bs.getSingle(isbn).subscribe(book => {
        this.book = book;
        this.initBook();
      });
    }
    this.initBook();
  }

  initBook() {
    this.buildThumbnailsArray();
    this.bookForm = this.fb.group({
      id: this.book.id,
      title: [this.book.title, Validators.required],
      subtitle: this.book.subtitle,
      isbn: [
        this.book.isbn,
        [
          Validators.required,
          //Validators.minLength(10),
          //Validators.maxLength(13)
          BookValidators.isbnFormat,
        ], this.isUpdatingBook?null:BookValidators.isbnExists(this.bs)
      ],
      description: this.book.description,
      rating: [this.book.rating, [Validators.max(10), Validators.min(0)]],
      published: this.book.published,
      images: this.images
    });
    this.bookForm.statusChanges.subscribe(() => {
      this.updateErrorMessage();
    });
  }

  updateErrorMessage() {
    this.errors = {};
    for (const message of BookFormErrorMessages) {
      const control = this.bookForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  buildThumbnailsArray() {
    this.images = this.fb.array([]);
    for (let img of this.book.images) {
      let fg = this.fb.group({
        id: new FormControl(img.id),
        url: new FormControl(img.url, [Validators.required]),
        title: new FormControl(img.title, [Validators.required])
      });
      this.images.push(fg);
    }
  }

  addThumbnailControl() {
    this.images.push(this.fb.group({ url: null, title: null }));
  }

  submitForm() {
    console.log(this.bookForm.value);
    //filters null values
    this.bookForm.value.images = this.bookForm.value.images.filter(
      thumbnail => thumbnail.url
    );
    const updatedBook: Book = BookFactory.fromObject(this.bookForm.value);
    console.log(updatedBook);
    
    //just a hack - did not care about authors
    updatedBook.user_id = 1;

    updatedBook.authors = this.book.authors;
    if (this.isUpdatingBook) {
      this.bs.update(updatedBook).subscribe(res => {
        this.router.navigate(["../../books", updatedBook.isbn], {
          relativeTo: this.route
        });
      }),(err)=>{
        // to do something
      };
    } else {
      this.bs.create(updatedBook).subscribe(res => {
        this.router.navigate(["../books"], { relativeTo: this.route });
      });
    }
  }
}
