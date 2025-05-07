import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum TaskStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export interface Todo {
  id?: number;
  title: string;
  status: TaskStatus;
  created_at: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/tasks`);
  }

  createTodo(todo: Todo): Observable<Todo> {
    const todoWithStatus = { ...todo, status: TaskStatus.NOT_STARTED };
    return this.http.post<Todo>(`${this.apiUrl}/tasks`, todoWithStatus);
  }

  updateTodo(id: number, todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/tasks/${id}/title`, { title: todo.title });
  }

  updateStatus(id: number, status: TaskStatus): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/tasks/${id}/status`, { status });
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`);
  }
}
