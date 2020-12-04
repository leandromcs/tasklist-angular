import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITask } from 'src/app/model/task';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.sass']
})
export class DialogContentComponent implements OnInit {

  descricao: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) data: ITask){
    this.descricao = data.descricao;
  }

  ngOnInit(): void {
  }

}
