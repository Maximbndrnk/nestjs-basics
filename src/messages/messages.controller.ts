import {Controller, Get, Post} from '@nestjs/common';

@Controller('messages')
export class MessagesController {

    @Get()
    listMessages(){
        return 'Get all messages';
    }

    @Get('/:id')
    getMessages(){
        return 'Get by id messages';
    }

    @Post()
    createMessage(){
        return 'Create a message';
    }

}
