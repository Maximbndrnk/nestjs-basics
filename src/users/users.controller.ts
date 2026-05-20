import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query, Session, UseInterceptors, UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from "./decorators/current-user.decorator";
import { CurrentUserInterceptor } from "../interceptors/current-user.interceptor";
import { User } from "./entities/user.entity";
import { AuthGuard } from "../guards/auth.guard";

@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor) // to add an interceptor to controller
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('whoami')
  @UseGuards(AuthGuard) //Guuuaaard!!!
  whoAmI(@CurrentUser() user: User){
    return user;
  }

  @Post('/signup')
  async signupUser(@Body() body: CreateUserDto, @Session() session:any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id
    return user;
  }

  @Post('/signin')
  async signinUser(@Body() body: CreateUserDto, @Session() session:any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id
    return user;
  }

  @Post('/signout')
  async signoutUser( @Session() session:any) {
    session.userId = null;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/findByEmail')
  findByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
