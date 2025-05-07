import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoService, Todo, TaskStatus } from '../services/todo.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Output() todoAdded = new EventEmitter<void>();
  
  todo: Todo = {
    title: '',
    status: TaskStatus.NOT_STARTED,
    created_at: new Date()
  };
  error = '';
  ok = false;
  constructor(private todoService: TodoService) {}

  onSubmit() {
    if (this.todo.title.trim()) {
      this.todoService.createTodo(this.todo).subscribe({
        next: () => {
          this.ok = true;
          this.todo = {
            title: '',
            status: TaskStatus.NOT_STARTED,
            created_at: new Date()
          };
          this.todoAdded.emit();
        },
        error: (err) => {
          this.error = 'Erreur lors de la création de la tâche';
          console.error('Erreur:', err);
        }
      });
    }
  }
}
