import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserModel } from 'src/app/sherd/models/user.model';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  pagetitle = "Create User";
  isedit = false;
  constructor(private userService: UserService) { }

  addUser = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  SaveData() {
    console.log(this.addUser.value)
    this.userService.saveUserData(this.addUser.value).subscribe(result => {
      console.log(result);
      this.addUser.reset({});
    });
  }
}
