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

  saveUserData(data: any) {
    // console.log(data);
    return this.http.post(this.url, data);
  }

  deleteUser(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  // getStudentById(studentId: any) {
  //   return this.http.get(this.url + '/' + studentId);
  // }

  // updateStudentData(studentId: any, data: any) {
  //   return this.http.put(this.url + '/' + studentId, data);
  // }
}
