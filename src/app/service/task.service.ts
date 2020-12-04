import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from 'src/app/model/task'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
   })
}

const url = 'http://leandro-tasklist-api.herokuapp.com/task'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${url}/getAll`);
  }

  saveTask(task: ITask): Observable<String> {
    return this.http.post<String>(`${url}/save`, task)
  }

  modifyTask(task: ITask): Observable<String> {
    return this.http.put<String>(`${url}/modify`, task)
  }

  deleteTask(task: ITask): Observable<String> {
    return this.http.delete<String>(`${url}/remove/${task.id}`)
  }
}
