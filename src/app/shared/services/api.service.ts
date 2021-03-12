import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardRequest } from '../interfaces/board-request';
import { BoardResponse } from '../interfaces/board-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private backendUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  saveGame(request: BoardRequest): Observable<BoardResponse> {
    const url = `${this.backendUrl}/boards`;
    return this.http.post<BoardResponse>(url, request);
  }
}
