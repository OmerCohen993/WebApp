import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  userId: number;
  isUserId = null;
  oldPassword = "";
  newPassword = "";
  user: UserModel = new UserModel();
  constructor(private userService: UserService, private router: ActivatedRoute, private alert: ToastrService) { }

  userData = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.isUserId = this.router.snapshot.params.id;

    if (this.userId != null) {
      this.pagetitle = "Edit User";
      this.isEdit = true;

      this.userService.getUserById(this.userId).subscribe(
        (result: any) => {
          this.userData = new FormGroup(
            {
              userName: new FormControl(result['userName'], Validators.required),
              email: new FormControl(result['email'], [Validators.required, Validators.email]),
              password: new FormControl('', Validators.required)
            });
        });
    }
  }

  SaveData() {
    if (!this.isEdit) {
      this.createUser();
    } else {
      this.editUser();
    }
  }

  EditPassword() {
    this.iseditPassword = !this.iseditPassword;
    console.log(this.iseditPassword);
  }

  createUser() {
    this.userId = this.router.snapshot.params.id;
    let user = this.userService.getUserById(this.userId);
    if (!user) {
      this.alert.error('User not found', "Error deleting user");
    } else if (this.userData.valid) {
      // todo: validate email and user name
      const newUser = Object.assign(this.userData.value);
      this.userService.saveUserData(newUser).subscribe(result => {
        console.log(result);
        this.alert.success("User created successfully!!", "Good job")
        this.userData.reset({});
      });
    } else {
      this.alert.error('Pleas fill all the fileds', "Error creating a user");
    }


  }

  editUser() {
    this.userId = this.router.snapshot.params.id;
    let user = this.userService.getUserById(this.userId);
    if (!user) {
      this.alert.error('User not found', "Error deleting user");
    } else if (this.userData.valid) {
      this.userService.getUserById(this.router.snapshot.params.id).subscribe(res => {
        this.user = res;
        if (this.user.password === this.oldPassword && this.iseditPassword == true && this.newPassword != null) {
          this.userData.patchValue({
            password: this.newPassword
          });
          this.oldPassword = "";
          this.newPassword = "";
        }
        const existUser = Object.assign(this.userData.value);
        this.userService.updateUser(this.router.snapshot.params.id, existUser).subscribe(result => {
          this.alert.success("User Updated successfully!!", "Well done!");
          this.EditPassword();
          this.ngOnInit();
        });
      });
    } else {
      this.alert.error('Pleas fill all the fileds', "Error updating a user");
    }


  }

}
