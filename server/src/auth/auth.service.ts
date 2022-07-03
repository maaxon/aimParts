import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {LoginUserDto} from "../users/dto/login-user.dto";
import {User} from "../users/schemas/user.schema";


@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {}

    private tokenExpiresInMs =  24*60*60*1000

    async login(userDto: LoginUserDto) {
        const user = await this.validateUser(userDto)
        const {token} = await this.generateToken(user)
        const tokenExpiresIn = Date.now() + this.tokenExpiresInMs
        return {tokenData:{token,expiresIn:tokenExpiresIn},user}
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.create({...userDto, password: hashPassword})
        const {token} = await this.generateToken(user)
        const tokenExpiresIn = Date.now() + this.tokenExpiresInMs
        return {tokenData:{token,expiresIn:tokenExpiresIn},user}
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, roles: user.role}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: LoginUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
           return user
        }
        throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
    }
}
