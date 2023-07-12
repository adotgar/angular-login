import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  signInApi = 'https://uh5t8wrijl.execute-api.ap-southeast-1.amazonaws.com/default/signin'
  // signInApi = 'https://netzwelt-devtest.azurewebsites.net/Account/SignIn'


  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'accept': 'text/plain'
    })
  }; 

  constructor(private http: HttpClient) { }

  public authenticateUser(data?: any){
    return this.http.post(this.signInApi.toString(), data, this.httpOptions)
  }

}
