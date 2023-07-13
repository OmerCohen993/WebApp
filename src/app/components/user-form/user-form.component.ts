import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { connect } from 'rxjs';
import { UserModel } from 'src/app/sherd/models/user.model';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  pagetitle = "Create User";
  isEdit = false;
  iseditPassword = false;
  userId = null;
  oldPassword = "";
  newPassword = "";
  user: UserModel = new UserModel();
  constructor(private userService: UserService, private router: ActivatedRoute) { }

  userData = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit() {
    this.userId = this.router.snapshot.params.id;

    if (this.userId != null) {
      this.pagetitle = "Edit User";
      this.isEdit = true;

      this.userService.getUserById(this.router.snapshot.params.id).subscribe(
        (result: any) => {
          this.userData = new FormGroup(
            {
              userName: new FormControl(result['userName']),
              email: new FormControl(result['email']),
              password: new FormControl('')
            });
        });
    }
  }

  SaveData() {
    if (!this.isEdit) {
      this.userService.saveUserData(this.userData.value).subscribe(result => {
        console.log(result);
        this.userData.reset({});
      });
    } else {
      if (this.iseditPassword) {
        this.userService.getUserById(this.router.snapshot.params.id).subscribe(res => {
          this.user = res;
          if (this.user.password === this.oldPassword) {
            console.log(this.user)
            this.userData.patchValue({
              password: this.newPassword
            });
            console.log(this.userData.value)
            this.oldPassword = "";
            this.newPassword = "";
          }
        });
      }
      this.userService.updateUser(this.router.snapshot.params.id, this.userData.value).subscribe(result => {
        this.ngOnInit();
      });
    }

  }

  EditPassword() {
    this.iseditPassword = !this.iseditPassword;
    console.log(this.iseditPassword);
  }

}
