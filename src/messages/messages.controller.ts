import {Controller, Get, Post, Body, Param} from '@nestjs/common';
import {CreateMessageDto} from "./dto/create-message.dto";
import { MessagesService } from "./messages.service";

@Controller('messages')
export class MessagesController {

    constructor(
        private readonly messagesService:MessagesService
    ) {
    }

    @Get()
    listMessages() {
        return this.messagesService.getMessages();
    }

    @Get('/:id')
    getMessages(@Param('id') id: string) {
       return this.messagesService.getMessage(id);
    }

    @Post()
    createMessage(@Body() body: CreateMessageDto) {
       return this.messagesService.createMessage(body.content);
    }

}
