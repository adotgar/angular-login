import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TerritoriesService {

  territoriesApi = 'https://uh5t8wrijl.execute-api.ap-southeast-1.amazonaws.com/default/territories/all'

  constructor(
    private http: HttpClient
  ) { }

  public getTerritories(){
    return this.http.get(this.territoriesApi)
  }
}
