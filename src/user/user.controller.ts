import { Controller, Get, Inject } from "@nestjs/common";
import { UsersStore } from "./users.store";
import { log } from "console";

@Controller('/user')
export class UserController{
  // constructor( private store:UsersStore){
  // console.log(this.store);
  // }
  constructor(@Inject('DATABASE_CONNECTION') private connection:any){
    console.log(connection)
  }
    @Get('/status')
       getStatus() {
        return "Hello I am a Happy 😊 user."
    }
    @Get('/profile')
      getProfile(){
        return "My name is Adam"
      }
}