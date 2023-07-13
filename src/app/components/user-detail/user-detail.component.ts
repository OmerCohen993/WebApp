import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/sherd/models/user.model';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {

  constructor(private userService: UserService, private router: ActivatedRoute, private route: Router, private alert: ToastrService) { }

  userId: number;
  userHeader: any;
  userData = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit(): void {
    this.userId = this.router.snapshot.params.id;
    this.userService.getUserById(this.userId).subscribe(
      (result: any) => {
        this.userData = new FormGroup(
          {
            userName: new FormControl(result['userName']),
            email: new FormControl(result['email']),
            password: new FormControl('')
          });
        this.userHeader = this.userData.value?.userName;
      });
  }


  deleteUser() {
    this.userId = this.router.snapshot.params.id;
    if (confirm('Are you sure you want to delete?')) {
      let user = this.userService.getUserById(this.userId);
      if (!user) {
        this.alert.error('User not found', "Error deleting user");
      } else {
        this.userService.deleteUser(this.userId).subscribe(data => {
          this.alert.warning("User deleted successfully")
          this.route.navigate(['/users']);
        });
      }
    }
  }
}



