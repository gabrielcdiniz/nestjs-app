import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JWTPayloadInterface } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private JWTService: JwtService
    ) { }

    public async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        return this.userRepository.signUp(authCredentialsDTO);
    }

    public async signIn(authCredentialsDTO: AuthCredentialsDTO) {
        const username = await this.userRepository.validatePassword(authCredentialsDTO);

        if (!username) {
            throw new UnauthorizedException('invalid credentials');
        }

        const payload: JWTPayloadInterface = { username };

        const accessToken = this.JWTService.sign(payload);

        return { accessToken };
    }

}
