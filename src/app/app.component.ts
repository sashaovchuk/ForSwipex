import { Component, HostListener } from '@angular/core';
import { ITask } from './task.interface';
import { NewTask } from './new-task.class';
import { IUser } from './user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test';
  taskName: string;
  index: number;
  comments: Array<string>;
  checker: boolean = true;
  tasks: Array<ITask> = [];
  editIndex: number;
  editTaskName: string;
  editComments: Array<string>;
  users: Array<IUser> = [{ log: 'Username', pass: 'Userpassword' }, { log: 'Swipex', pass: 'theBest' }];
  log: string;
  pass: string;
  rememberLog: string = '';
  commentNumber: number;
  indexComment: number;
  newComment: string;
  constructor() {
    localStorage.setItem('users', JSON.stringify(this.users))
    this.tasks = JSON.parse(localStorage.getItem('tasks'))
    console.log(this.users);
  }
  logIn(): void {
    if (this.users.find(x => x.log == this.log && x.pass == this.pass)) {
      this.rememberLog = this.log
      this.checker = false
      this.log = ''
      this.pass = ''
      document.getElementById('main-login').style.display = 'none'
    }
    else {
      this.rememberLog = undefined
      document.getElementById('main-login').style.display = 'block'
      this.checker = true
    }
  }
  logOut(): void {
    document.getElementById('main-login').style.display = 'block'
    this.rememberLog = ''
    this.checker = true
  }
  cancel(): void {
    this.log = ''
    this.pass = ''
    this.rememberLog = ''
    document.getElementById('main-login').style.display = 'block'
  }
  addNewTask(): void {
    const newTask: ITask = new NewTask(
      this.taskName,
      this.comments = []
    )
    this.tasks.push(newTask)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
    this.taskName = ''
  }
  deleteTask(task: ITask): void {
    this.index = this.tasks.indexOf(task)
    this.tasks.splice(this.index, 1)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }
  showComments(task: ITask): void {
    this.comments = task.comments
    this.indexComment = this.tasks.indexOf(task)
    this.commentNumber = this.indexComment + 1
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event.keyCode);
    if (event.keyCode == 13 && document.getElementById('area').focus && this.newComment != '' && this.checker == false) {
      this.tasks[this.commentNumber - 1].comments.push(this.newComment)
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
      this.newComment = ''
    }
  }
}