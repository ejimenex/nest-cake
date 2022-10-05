import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from '../account.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AccountService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.login(username, password);
    console.log(user)
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}