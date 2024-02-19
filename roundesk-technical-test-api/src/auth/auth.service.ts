import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/service/user.service";
import * as bcrypt from 'bcrypt';
import {User, UserRole} from "../user/entity/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private  jwtService: JwtService,
        private  userService: UserService
    ) {}
    async  validateUser(username: string, password: string): Promise<any>{
        const user = await this.userService.findOneByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(user: any) {
        const user2 = await this.validateUser(user.username, user.password)
        const payload = { username: user2.username, sub: user2.userId };
        return {
            access_token: this.jwtService.sign(payload),
            user: user2
        };
    }

    async register(user: any) {
        console.log(user);
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await this.userService.create({
            ...user,
            password: hashedPassword,
            role: user.role || UserRole.USER,
        });
        const { password, ...result } = newUser;
        return result;
    }

    async getAuthenticatedUser(userId: number): Promise<User | undefined> {
        return this.userService.findById(userId);
    }
}
