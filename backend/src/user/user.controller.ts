import { Controller, Get, Inject } from "@nestjs/common";
import { UsersStore } from "./users.store";
import { log } from "console";

@Controller('/user')
export class UserController{
  // constructor( private store:UsersStore){
  // console.log(this.store);
  // }
  
  constructor(){
    console.log("this is user module.")
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