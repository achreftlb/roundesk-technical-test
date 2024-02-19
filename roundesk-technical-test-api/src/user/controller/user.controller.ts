import {Controller, Get, NotFoundException, Request, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {AuthService} from "../../auth/auth.service";


@Controller('user')
export class UserController {
    constructor(private authService: AuthService) {}
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getProfile(@Request() req) {
        const user = await this.authService.getAuthenticatedUser(req.user.sub);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const { password, ...result } = user;
        return result;
    }
}
