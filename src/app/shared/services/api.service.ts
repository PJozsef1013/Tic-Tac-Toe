import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardRequest } from '../interfaces/board-request';
import { BoardResponse } from '../interfaces/board-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  id: number;
  name: string;

  private backendUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  saveGame(request: BoardRequest): Observable<BoardResponse> {
    const url = `${this.backendUrl}/boards`;
    return this.http.post<BoardResponse>(url, request);
  }

  listSavedGames(name?: string): Observable<BoardResponse[]> {
    const url = name ? `${this.backendUrl}/boards?name=${name}` : `${this.backendUrl}/boards`;
    return this.http.get<BoardResponse[]>(url);
  }

  loadSavedGame(id: number): Observable<BoardResponse> {
    const url = `${this.backendUrl}/boards/${id}`;
    return this.http.get<BoardResponse>(url);
  }

  deleteSavedGame(id: number): Observable<string> {
    const url = `${this.backendUrl}/boards/${id}`;
    return this.http.delete<string>(url);
  }

  modifySavedGame(id: number, request: BoardRequest): Observable<BoardResponse> {
    const url = `${this.backendUrl}/boards/${id}`;
    return this.http.patch<BoardResponse>(url, request);
  }
}
