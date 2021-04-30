import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../shared/book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute) { }

  bookSelected(book:Book){
      this.router.navigate(['../books', book.isbn], {relativeTo: this.route});
  }

  ngOnInit() {
  }

}