import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./jwt/jwt.strategy";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/entity/user.entity";
import {UserService} from "../user/service/user.service";
import { AuthController } from './auth.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'JWT_SECRET',

      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, UserService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
