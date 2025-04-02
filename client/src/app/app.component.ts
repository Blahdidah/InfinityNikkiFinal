import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `<h1>{{ message }}</h1>`,
})
export class AppComponent implements OnInit {
  title = 'client';
  message = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.http.get<{ message: string }>('/api').subscribe(data => {
    //   this.message = data.message;
    // });
  }
}