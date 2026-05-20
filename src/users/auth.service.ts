import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    let existUser = await this.userService.findByEmail(email);
    if (existUser) {
      throw new BadRequestException('User already exists');
    }
    const salt = randomBytes(8).toString('hex');
    console.log('salt', salt);

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');
    const user = await this.userService.create({ email, password: result });
    return user;
  }

  async signin(email: string, password: string) {
    const existUser = await this.userService.findByEmail(email);
    if (!existUser) {
      throw new BadRequestException('User not found');
    }
    const [salt, storedHash] = existUser.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Wrong password');
    }

    return existUser;
  }
}
