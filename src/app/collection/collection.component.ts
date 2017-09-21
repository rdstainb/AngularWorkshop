import { Component, OnInit } from '@angular/core';
import { IBook } from '../ibook';
import { MdSnackBar, MdDialog } from "@angular/material";
import { DataService } from "../services/data.service"
import { BookDetailComponent } from "../book-detail/book-detail.component";
import { Router } from "@angular/router";

@Component({
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  constructor(private _dataService: DataService, private _snackBar: MdSnackBar, private _dialog: MdDialog, private _router: Router) {
    this.startTime = new Date();
    this.startTime.setHours(10, 0);
    this.endTime = new Date();
    this.endTime.setHours(15, 0);
  }

  ngOnInit(): void {
    this.getBooks();
  }

  pageTitle:string = 'Books';

  public books:Array<IBook>;
  
  startTime:Date;

  endTime:Date;

  showOperatingHours:boolean = false;

  getBooks(): void {
    this._dataService.getBooks()
    .subscribe(
      books => this.books = books,
      error => this.updateMessage(<any>error, 'ERROR'));
  }

updateMessage(message: string, type: string): void {
  if (message) {
    this._snackBar.open(`${type}: ${message}`, 'DISMISS', {
      duration: 3000
    });

  }
}

onRatingUpdate(book: IBook): void {
    this.updateBook(book);
    this.updateMessage(book.title, "Rating has been updated");
  }

  updateBook(book: IBook): void {
    this._dataService.updateBook(book)
    .subscribe(
      books => {
        this.books = books;
        this._snackBar.open(`"${book.title}" has been updated!`, 'DISMISS', {
          duration: 3000
        });
      }, error => this.updateMessage(<any>error, 'ERROR'));
  }

    openDialog(bookId: number): void {
      let config = { width: '650px', height: '400px', position: { top: '50px'}
};
      let dialogRef = this._dialog.open(BookDetailComponent, config);
      dialogRef.componentInstance.bookId = bookId;
      dialogRef.afterClosed().subscribe(res => {
        this.getBooks();
      });
    }

    openRoute(bookId: number): void {
      this._router.navigate(['/collection', bookId]);
    }
}