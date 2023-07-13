import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/sherd/models/user.model';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {

  constructor(private userService: UserService, private router: ActivatedRoute, private route: Router) { }

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
    if (confirm('Delete User? ')) {
      //todo: check if id exists
      this.userService.deleteUser(this.userId).subscribe(data => {
        this.route.navigate(['/users']);
      });
    }
  }

}
