import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FollowersService extends DataService {

  constructor(http: HttpClient) { 
    const url: string = 'https://api.github.com/users/mosh-hamedani/followers';
    super(url, http);
  }
}
