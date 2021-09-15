import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface Pet{
  id? : string,
  status? : boolean,
  name : string,
  age : number,
  owner : string
}



@Injectable({
  providedIn: 'root'
})
export class PetService {  
  private url: string = 'http://localhost:8081';  
  private token: string = 'thisshouldbereplaced';
  constructor(private http:HttpClient) {    
  }
  list() {    
    return this.http.get<Pet[]>(`${this.url}/pet/` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('token' , this.token )
    });
  }
  getOne(id:string){
    return this.http.get<Pet>(`${this.url}/pet/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('token' , this.token )
    });
  }
  update(pet : Pet){
    const { id } = pet;
    return this.http.patch<Pet>(`${this.url}/pet/${id}` , pet,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('token' , this.token )
    });
  }
  insert(pet : Pet){
    return this.http.post<Pet>(`${this.url}/pet/` ,pet, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('token' , this.token )
    });
  }

}
