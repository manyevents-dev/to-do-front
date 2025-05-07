import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo, TaskStatus } from '../services/todo.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
})
export class TaskComponent {
  @Input() todo!: Todo;
  @Output() statusChange = new EventEmitter<Todo>();
  @Output() titleChange = new EventEmitter<Todo>();
  @Output() deleteTask = new EventEmitter<number>();
  
  TaskStatus = TaskStatus;
  error = '';

  onStatusChange(todo: Todo) {
    this.statusChange.emit(todo);
  }

  onTitleChange(todo: Todo) {
    this.titleChange.emit(todo);
  }

  onDelete(id: number) {
    this.deleteTask.emit(id);
  }
}
