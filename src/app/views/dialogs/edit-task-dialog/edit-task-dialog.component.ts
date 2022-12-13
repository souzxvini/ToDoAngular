import { TaskService } from './../../../services/task/task.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  id: number
  form: FormGroup
  task: Task
  isLoading: boolean = false
  isLoadingTask: boolean = false

  constructor(
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
     private fb: FormBuilder,
     private taskService: TaskService
  ) {dialogRef.disableClose = true }

  ngOnInit(): void {
    this.form = this.fb.group({
      task: [null, Validators.required]
    })

    this.getTask();

  }

  getTask(){
    this.isLoadingTask = true
    this.form.get('task').disable()
    this.taskService.taskDetails(this.id).subscribe(data => {
      this.isLoadingTask = false
      this.form.get('task').enable()
      this.task = data
      this.fillForm()
    })
  }

  fillForm(){
    this.form.get('task').setValue(this.task.description)
  }

  updateTask(){
    this.isLoading = true
    let task = new Task()
    task.description = this.form.get('task').value

    this.taskService.updateTask(task, this.id).subscribe(() =>{
      this.isLoading = false
      this.cancel(true)
      this.alert("top", "Task updated!", "success")

    })
  }

  cancel(recarregar: boolean): void{
    this.dialogRef.close({recarregar: recarregar});
    this.form.reset();
  }

  alert(position: SweetAlertPosition, message: string, icon: SweetAlertIcon){
    const Toast = Swal.mixin({
      toast: true,
      position: `${position}`,
      showConfirmButton: false,
      timer: 5000,
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
