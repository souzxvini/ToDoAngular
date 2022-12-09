import { Observable, switchMap, tap } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TaskService } from './../../services/task/task.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { Status } from 'src/app/models/status.model';
import { EditTaskDialogComponent } from '../dialogs/edit-task-dialog/edit-task-dialog.component';
import { ProgressCompletedComponent } from '../dialogs/progress-completed/progress-completed.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: string;
  todoTasksList$: Observable<Task[]>;
  doneTasksList$: Observable<Task[]>;
  form: FormGroup

  totalTasks: number
  doneTasks: number
  progress: number
  isLoading: boolean = false
  loadingTodoTasks: boolean = false;
  loadingDoneTasks: boolean = false;

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private userService: UserService,

    ) {
    }

  ngOnInit(): void {
    this.userName = this.authService.getSignedinUserName();
    this.getTodoTasks();
    this.getDoneTasks();
    this.createForm();
    this.clearUserRandomCodeAndRole();

  }

  clearUserRandomCodeAndRole(){
    this.userService.clearUserRandomCodeAndRole(this.authService.getSignedinUserEmail()).subscribe(() => {
    });
  }

  createForm(){
    this.form = this.fb.group({
      task: [null, Validators.required]
    })
  }

  getTodoTasks(){
    this.loadingTodoTasks = true
    this.todoTasksList$ = this.taskService.getTodoTasks().pipe(
      tap(() => {
        this.loadingTodoTasks = false
        this.getProgress()
      })
    )
  }

  getDoneTasks(){
    this.doneTasksList$ = this.taskService.getDoneTasks().pipe(
      tap(() => {
        this.getProgress()
      })
    )

  }

  addTask(){
    this.isLoading = true
    this.loadingTodoTasks = true

    let task = new Task();
    task.description = this.form.get('task').value

    this.todoTasksList$ = this.taskService.addTask(task).pipe(
      switchMap(() => this.taskService.getTodoTasks()),
      tap(() => {
        this.isLoading = false
        this.loadingTodoTasks = false
        this.form.get('task').enable()
        this.alert("top", "New task added!", "success")
        this.form.reset();
        this.form.get('task').clearAsyncValidators();
        this.getProgress()
      }
    ))
  }

  deleteTodoTask(taskId: number){
    Swal.fire({
      title: '<p style="font-family: Paytone One;">Do you really want to delete this task?</p>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<p style="font-family: Paytone One; margin: auto">Yes!</p>',
      cancelButtonText: '<p style="font-family: Paytone One; margin: auto">Cancel</p>',
      allowOutsideClick: false
    }).then((result) => {
      if(result.isConfirmed) {
        this.loadingTodoTasks = true
        this.todoTasksList$ = this.taskService.deleteTask(taskId).pipe(
          switchMap(() => this.taskService.getTodoTasks()),
          tap(() => {
            this.loadingTodoTasks = false
            this.alert("top", "Task deleted!", "success")
            this.getProgress("deleted")
          })
        )
      }
    })
  }

  deleteDoneTask(taskId: number){
    Swal.fire({
      title: '<p style="font-family: Paytone One;">Do you really want to delete this task?</p>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<p style="font-family: Paytone One; margin: auto">Yes!</p>',
      cancelButtonText: '<p style="font-family: Paytone One; margin: auto">Cancel</p>',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.doneTasksList$ = this.taskService.deleteTask(taskId).pipe(
          switchMap(() => this.taskService.getDoneTasks()),
          tap(() => {
            this.getProgress()
            this.alert("top", "Task deleted!", "success")
          })
        )
      }
    })
  }

  editTodoTask(id: number){
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '600px'
     });
     dialogRef.componentInstance.id = id;
     dialogRef.afterClosed().subscribe(() => {
      this.getTodoTasks()
      this.getProgress()
     })
  }

  isTaskDone(status: any){
    if(status == Status.DONE){
      return true
    } else{
      return false
    }
  }

  changeTaskStatus(id: number){
    let subs = this.taskService.changeTaskStatus(id).subscribe( () =>{
      subs.unsubscribe()
      this.getDoneTasks()
      this.getTodoTasks()
      this.getProgress("changeStatus")
    })

  }

  getProgress(string?: string){
    let subs = this.taskService.getAllTasks().subscribe(data => {
      subs.unsubscribe();
      this.totalTasks = data.length
    })
    let subs2 = this.taskService.getDoneTasks().subscribe(data => {
      subs2.unsubscribe();
      this.doneTasks = data.length
      this.progress = this.doneTasks / this.totalTasks * 100;
      if(string){
        if(this.progress == 100){
          const dialogRef = this.dialog.open(ProgressCompletedComponent, {
            width: '600px'
           });
           dialogRef.afterClosed().subscribe(() => {
           })
      }
      }

    })
  }

  alert(position: SweetAlertPosition, message: string, icon: SweetAlertIcon){
    const Toast = Swal.mixin({
      toast: true,
      position: `${position}`,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: `${icon}`,
      title: `<p style="font-family: Paytone One; margin: auto">${message}</p> `
    })
  }

}
