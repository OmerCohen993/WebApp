import { Component } from '@angular/core';
import { UserService } from '../../user.service'
import { UserModel } from 'src/app/sherd/models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  constructor(private userService: UserService, private alert: ToastrService) { }

  usersData: UserModel[] = [];

  ngOnInit() {
    this.userService.getAllUsers().subscribe(data => {
      this.usersData = data;
    });
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      let user = this.userService.getUserById(id);
      if (!user) {
        this.alert.error('User not found', "Error deleting user");
      } else {
        this.userService.deleteUser(id).subscribe(data => {
          this.alert.warning("User deleted successfully")
          this.ngOnInit();
        });
      }
    }
  }
}
