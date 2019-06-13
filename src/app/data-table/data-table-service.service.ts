import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class DataTableService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  _baseUrl: string = '';

  // For Using Fake API by Using It's URL  
  constructor(private http: HttpClient) {
    this._baseUrl = "https://jsonplaceholder.typicode.com/";
  }
  // To fill the Datatable for Default Table [Dummy Data]  
  public GetAllRecords() {
    return this.http.get(this._baseUrl + 'posts')
  }
}
