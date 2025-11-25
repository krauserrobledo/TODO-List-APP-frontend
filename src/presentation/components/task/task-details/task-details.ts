import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskModel } from '../../../../domain/models/task/task-model';
import { SubtaskList } from "../../subtask/subtask-list/subtask-list";
import { ListboxModule } from 'primeng/listbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, FormsModule, SubtaskList, ListboxModule,    
    SelectButtonModule,  
    CardModule,          
    TagModule,           
    ChipModule,          
    ButtonModule],
  templateUrl: './task-details.html',
  styleUrls: ['./task-details.css']
})
export class TaskDetails implements OnChanges {
  @Input() task: TaskModel | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<TaskModel>();
  @Output() changeStatus = new EventEmitter<{ task: TaskModel; status: TaskModel['status'] }>();
  @Output() delete = new EventEmitter<TaskModel>();

  selectedStatus: TaskModel['status'] = 'Non Started';

  statusOptions = [
    { label: 'Non Started', value: 'Non Started' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Paused', value: 'Paused' },
    { label: 'Late', value: 'Late' },
    { label: 'Finished', value: 'Finished' }
  ];
  
  ngOnChanges() {
    if (this.task) this.selectedStatus = this.task.status;
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Non Started': return 'non_started';
      case 'In Progress': return 'in_progress';
      case 'Paused': return 'paused';
      case 'Late': return 'late';
      case 'Finished': return 'finished';
      default: return '';
    }
  }
  
}
