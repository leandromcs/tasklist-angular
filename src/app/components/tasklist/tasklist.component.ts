import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { ITask } from 'src/app/model/task'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';

@Component({
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit {

  todoTasks: ITask[] = [];
  doneTasks: ITask[] = [];
  taskToEdit: ITask = {
    id: 0,
    titulo: '',
    descricao: '',
    status: false
  }

  isNewButtonVisible: boolean = true;
  isEditButtonVisible: boolean = false;

  taskForm = new FormGroup({
    titulo: new FormControl(''),
    descricao: new FormControl('')
  })

  constructor(private service: TaskService, public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.service.getAllTasks().subscribe((tasks: ITask[]) => {
      this.doneTasks = [];
      this.todoTasks = [];

      tasks.forEach(task => {
        if (task.status) {
          this.doneTasks.push(task);
        } else {
          this.todoTasks.push(task);
        }
      });
    }, (err) => {
      this.toastr.error(err.error.titulo)
      console.log(err);
    });
  }

  saveTask(task: ITask) {
    if (task.id == 0) {
      this.service.saveTask(task).subscribe(res => {
        this.toastr.success('Tarefa salva com sucesso!');
        this.clearForm();
        this.getAllTasks();
      }, (err) => {
        this.toastr.error(err.error.titulo)
        console.log(err);
      });
    } else {
      this.modifyTask(task);
    }
  }

  cancelEdit() {
    this.taskToEdit.id = 0;
    this.taskToEdit.status = false;
    this.isNewButtonVisible = true;
    this.isEditButtonVisible = false;
    this.clearForm();
  }

  modifyTask(task: ITask) {
    this.service.modifyTask(task).subscribe(res => {
      this.toastr.success('Tarefa modificada com sucesso!')
      this.getAllTasks();
    }, (err) => {
      this.toastr.error(err.error.titulo)
      console.log(err)
    });
  }

  fillForm(task: ITask) {
    this.taskToEdit = task;
    this.isNewButtonVisible = false;
    this.isEditButtonVisible = true;
    this.taskForm.get('titulo')?.setValue(task.titulo)
    this.taskForm.get('descricao')?.setValue(task.descricao)
  }

  deleteTask(task: ITask) {
    this.service.deleteTask(task).subscribe(res => {
      this.toastr.success('Tarefa deletada com sucesso!')
      this.clearForm();
      this.getAllTasks();
    }, (err) => {
      this.toastr.error(err.error.titulo)
      console.log(err)
    });
  }

  onSubmit() {
    const task: ITask = {
      id: this.taskToEdit.id,
      titulo: this.taskForm.get('titulo')?.value,
      status: this.taskToEdit.status,
      descricao: this.taskForm.get('descricao')?.value
    }

    this.saveTask(task);
  }

  clearForm() {
    this.taskToEdit.id = 0;
    this.taskToEdit.status = false;
    this.isNewButtonVisible = true;
    this.isEditButtonVisible = false;
    this.taskForm.get('titulo')?.setValue('');
    this.taskForm.get('descricao')?.setValue('');
  }

  openDialog(task: ITask) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = task;

    this.dialog.open(DialogContentComponent, dialogConfig);
  }

  dropDone(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      let task = this.doneTasks[event.currentIndex];
      task.status = true;

      this.modifyTask(task);
    }
  }

  dropTodo(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      let task = this.todoTasks[event.currentIndex];
      task.status = false;

      this.modifyTask(task);
    }
  }

}
