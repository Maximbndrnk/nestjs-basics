import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {
    }

    create({email, password}: CreateUserDto) {
        const user = this.repo.create({email, password});
        return this.repo.save(user);
    }

    findAll() {
        return this.repo.find();
    }

    findOneById(id: number) {
        if (!id) {
            throw new BadRequestException('User not found');
        }
        return this.repo.findOneBy({id});
    }

    findByEmail(email: string) {
        return this.repo.findOneBy({email});
    }

    update(id: number, updateUserDto: Partial<UpdateUserDto>) {
        return this.repo.update({id}, updateUserDto);
    }

    remove(id: number) {
        return this.repo.delete({id});
    }
}
