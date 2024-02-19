import { IsNotEmpty, MinLength } from 'class-validator';
import {UserRole} from "../../user/entity/user.entity";

export class RegisterDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    role?: UserRole;
}
