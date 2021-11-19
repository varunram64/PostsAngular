import { HttpClient } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import { BadInputError } from '../common/bad-input-error';
import { Observable } from "rxjs";
import { AppError } from "../common/AppError";
import { NotFoundError } from "../common/not-found-error";

export class DataService {

  constructor(private url: string, private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url)
    .pipe(
      map(res => res),
      catchError(this.handleAPIError)
    );
  }

  create(resource: any) {
    return this.http.post(this.url, 
      JSON.stringify(resource)
    )
    .pipe(
      catchError(this.handleAPIError)
    );
  }

  update(resource: any){
    return this.http.patch(this.url + `/${resource?.id}`, JSON.stringify({ isRead: true }))
    .pipe(
      catchError(this.handleAPIError)
    );
  }

  delete(id: number){
    return this.http.delete(this.url + `/${id}`)
    .pipe(
      catchError(this.handleAPIError)
    );
  }

  handleAPIError(error: Response) {
    if(error.status == 400)
    return Observable.throw(new BadInputError(error));
    if(error.status == 404)
    return Observable.throw(new NotFoundError(error));
    
    return Observable.throw(new AppError(error));       
  }
}
