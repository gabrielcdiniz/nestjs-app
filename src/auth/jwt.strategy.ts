import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { config as dotenv } from 'dotenv';
import { JWTPayloadInterface } from './jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';

dotenv();

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        });
    }

    public async validate(payload: JWTPayloadInterface) {
        const { username } = payload;
        const user = this.userRepository.findOne({ username })

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
};

