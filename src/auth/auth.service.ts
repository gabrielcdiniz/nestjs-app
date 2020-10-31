import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) { }

    public async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        return this.userRepository.signUp(authCredentialsDTO);
    }

    public async signIn(authCredentialsDTO: AuthCredentialsDTO) {
        const username = await this.userRepository.validatePassword(authCredentialsDTO);
        
        if (!username) {
            throw new UnauthorizedException('invalid credentials');
        }
    }

}
