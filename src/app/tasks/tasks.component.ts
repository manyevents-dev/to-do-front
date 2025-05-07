import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo, TaskStatus } from '../services/todo.service';
import { TaskComponent } from '../task/task.component'; 

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  todos: Todo[] = [];
  loading = true;
  error = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  get sortedTodos() {
    return [...this.todos].sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }

  loadTodos() {
    this.loading = true;
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des tâches';
        this.loading = false;
        console.error('Erreur:', err);
      }
    });
  }

  updateStatus(todo: Todo) {
    this.todoService.updateStatus(todo.id!, todo.status).subscribe({
      next: () => {
        this.error = '';
        this.loadTodos();
      },
      error: (err) => {
        this.error = 'Erreur lors de la mise à jour du statut';
        console.error('Erreur:', err);
      }
    });
  }

  updateTitle(todo: Todo) {
    this.todoService.updateTodo(todo.id!, todo).subscribe({
      next: () => {
        this.error = '';
        this.loadTodos();
      },
      error: (err) => {
        this.error = 'Erreur lors de la mise à jour du titre';
        console.error('Erreur:', err);
      }
    });
  }

  deleteTodo(id: number) {
      this.todoService.deleteTodo(id).subscribe({
        next: () => {
          this.loadTodos();
          this.error = '';
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression de la tâche';
          console.error('Erreur:', err);
        }
      });
  }
}
