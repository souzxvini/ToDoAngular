import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from 'src/app/models/task.model';

const API = environment.API

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) { }

getAllTasks(): Observable<Task[]>{
  return this.http.get<any>(`${API}/task`);
}

getTodoTasks(): Observable<Task[]>{
  return this.http.get<any>(`${API}/task/todo`);
}

getDoneTasks(): Observable<any>{
  return this.http.get<any>(`${API}/task/done`);
}

deleteTask(taskId: number): Observable<any>{
  return this.http.delete<any>(`${API}/task/${taskId}`);
}

addTask(task: Task): Observable<Task>{
  return this.http.post<Task>(`${API}/task`, task);
}

updateTask(task: Task, taskId: number): Observable<Task>{
  return this.http.put<Task>(`${API}/task/${taskId}`, task);
}

taskDetails(id: number): Observable<Task>{
  return this.http.get<Task>(`${API}/task/${id}`);
}

changeTaskStatus(id: number): Observable<boolean>{
  return this.http.get<boolean>(`${API}/task/isTaskStatusDone/${id}`);
}

}
