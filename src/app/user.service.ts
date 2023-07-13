import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './sherd/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }
  getAllUsers() {
    return this.http.get<UserModel[]>(this.url);
  }

  saveUserData(data: UserModel) {
    return this.http.post(this.url, data);
  }

  deleteUser(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  getUserById(id: number) {
    return this.http.get<UserModel>(this.url + '/' + id);
  }

  updateUser(id: number, data: UserModel) {
    return this.http.put(this.url + '/' + id, data);
  }
}
