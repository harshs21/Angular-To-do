import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5585';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl + '/tasks');
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(this.apiUrl + '/tasks/' + task.id);
  }

  updateTaskRemainder(task: Task): Observable<Task> {
    const url = this.apiUrl + '/tasks/' + task.id;
    return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task: Task): Observable<Task> {
    const url = this.apiUrl + '/tasks';
    const newTask = {
      id: Date.now(),
      ...task,
    };
    return this.http.post<Task>(url, newTask, httpOptions);
  }
}
