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

  constructor(
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
     private fb: FormBuilder,
     private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      task: [null, Validators.required]
    })

    this.getTask();

  }

  getTask(){
    this.taskService.taskDetails(this.id).subscribe(data => {
      this.task = data
      this.fillForm()
    })
  }

  fillForm(){
    this.form.get('task').setValue(this.task.description)
  }

  updateTask(){
    let task = new Task()
    task.description = this.form.get('task').value

    this.taskService.updateTask(task, this.id).subscribe(() =>{
      this.cancel()
      this.alert("top", "Task updated!", "success")

    })
  }

  cancel(): void{
    this.dialogRef.close();
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
