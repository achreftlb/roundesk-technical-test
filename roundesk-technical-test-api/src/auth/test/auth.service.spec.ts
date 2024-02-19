import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {UnauthorizedException} from "@nestjs/common";

describe('AuthService', () => {
    let service: AuthService;
    let userService: UserService;
    let jwtService: JwtService;

    beforeEach(async () => {
        // Mock UserService and JwtService
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: {
                        findOneByUsername: jest.fn(),
                        create: jest.fn(),
                        findById: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        userService = module.get<UserService>(UserService);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('validateUser', () => {
        it('should validate and return user without password', async () => {
            const mockUser = { userId: 1, username: 'test', password: 'test' };
            jest.spyOn(userService, 'findOneByUsername').mockResolvedValue(mockUser);
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

            const result = await service.validateUser('test', 'test');
            expect(result).toEqual({ userId: 1, username: 'test' });
            expect(userService.findOneByUsername).toHaveBeenCalledWith('test');
        });

        it('should throw UnauthorizedException if user not found', async () => {
            jest.spyOn(userService, 'findOneByUsername').mockResolvedValue(null);

            await expect(service.validateUser('test', 'test')).rejects.toThrow(UnauthorizedException);
        });
    });

    describe('login', () => {
        it('should return access token', async () => {
            const mockUser = { userId: 1, username: 'test', password: 'test' };
            const mockPayload = { username: 'test', sub: 1 };
            jest.spyOn(service, 'validateUser').mockResolvedValue(mockUser);
            jest.spyOn(jwtService, 'sign').mockReturnValue('mockToken');

            const result = await service.login({ username: 'test', password: 'test' });
            expect(result).toEqual({ access_token: 'mockToken' });
            expect(jwtService.sign).toHaveBeenCalledWith(mockPayload);
        });
    });

    // Add more tests for register and getAuthenticatedUser methods similar to above
});
