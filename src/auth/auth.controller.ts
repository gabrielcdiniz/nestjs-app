import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('/signup')
    public signUp(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        return this.authService.signUp(authCredentialsDTO);
    }

    @Post('/signin')
    public signIn(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDTO);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    public test(@GetUser() user: User) {
        console.log('user :>> ', user);
    }
    
}
