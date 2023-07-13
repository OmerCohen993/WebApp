import { Component } from '@angular/core';
import { UserService } from '../../user.service'
import { UserModel } from 'src/app/sherd/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  constructor(private userService: UserService) { }

  usersData: UserModel[] = [];

  ngOnInit() {
    this.userService.getAllUsers().subscribe(data => {
      this.usersData = data;
    });
  }

  deleteUser(id: number) {
    if (confirm('Delete User? ')) {
      //todo: check if id exists
      this.userService.deleteUser(id).subscribe(data => {
        this.ngOnInit();
      });
    }
  }
}
