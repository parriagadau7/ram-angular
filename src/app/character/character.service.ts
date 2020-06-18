import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../message.service';
import {Character, Result} from './character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private url = 'https://rickandmortyapi.com/api';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient, private messageService: MessageService) { }

  getCharacters(numPage: number): Observable<Result[]> {
    return this.http.get<Character>(`${this.url}/character/?page=${numPage}`, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched characters')),
        map(n => n.results),
        catchError(this.handleError<any>('getCharacters', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`CharacterService: ${message}`);
  }
}
