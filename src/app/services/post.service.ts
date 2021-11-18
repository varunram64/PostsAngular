import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PostService extends DataService {

  constructor(http: HttpClient) { 
    const url: string = 'http://jsonplaceholder.typicode.com/posts';
    super(url, http);
  }
}
