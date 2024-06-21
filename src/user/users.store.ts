import { Injectable } from "@nestjs/common";
interface User{
    name:String;
    age:number;
    id:number;
}


@Injectable()
export class UsersStore {
   private store = new Map<number,User>();
  addUser(user:User){
    this.store.set(user.id,user);
  }

  
}