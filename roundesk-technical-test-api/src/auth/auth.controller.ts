import {Body, Controller, Post, Request, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {RegisterDto} from "./dto/register.dto";
import {LoginRequestDto} from "./dto/login.request.dto";

@Controller('auth')
export class AuthController {

    constructor(
       private  authService: AuthService
    ) {}

    @Post('register')
     register(@Body(ValidationPipe) registerDto: RegisterDto){
        return this.authService.register(registerDto);
    }


    @Post('login')
    async login(@Body(ValidationPipe) loginRequestDto: LoginRequestDto) {
        return this.authService.login(loginRequestDto);
    }
}
