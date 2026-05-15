import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
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
    async  getMessages(@Param('id') id: string) {
       const message = await this.messagesService.getMessage(id);
       if (!message) {
           throw new NotFoundException(`Message with id ${id} not found`)
       }
       return message;
    }

    @Post()
    createMessage(@Body() body: CreateMessageDto) {
       return this.messagesService.createMessage(body.content);
    }

}
