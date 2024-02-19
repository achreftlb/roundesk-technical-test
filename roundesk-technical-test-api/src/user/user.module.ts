import { Module } from '@nestjs/common';
import {AuthModule} from "../auth/auth.module";
import {UserController} from "./controller/user.controller";

@Module({
    imports: [AuthModule],
    controllers: [UserController]
})

export class UserModule {}
