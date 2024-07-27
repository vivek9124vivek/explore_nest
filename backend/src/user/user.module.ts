import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UsersStore } from "./users.store";
function createConnection(options = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: "CONNECTED",
          options,
        });
      }, 5000);
    });
  }

@Module({
    controllers:[UserController],
    // ✅class providers
    // providers:[{provide:UsersStore, useClass: UsersStore}],


    // ✅value providers
    // providers:[{provide:"DATABASE_NAME",useValue:"USERS_DATABASE"}]

    // ✅ async providers
           providers:[{
            provide: "DATABASE_CONNECTION",
            // async provider for database connection
            useFactory: async (options: Record<string, any>) => {
              const connection = await createConnection(options);
      
              return connection;
            },
           }]
})
export class UserModule{}