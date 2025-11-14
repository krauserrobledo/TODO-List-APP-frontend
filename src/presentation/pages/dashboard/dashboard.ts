import { Component } from '@angular/core';
import { TaskList } from '../../components/task/task-list/task-list';


@Component({
  selector: 'app-dashboard',
  imports: [TaskList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class DashboardComponent {

}
