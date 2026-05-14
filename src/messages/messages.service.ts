import { Injectable } from '@nestjs/common';
import { MessagesRepository } from "./messages.repository";

@Injectable()
export class MessagesService {
    constructor(
        private readonly messagesRepository: MessagesRepository
    ) {}

    getMessage(id: string) {
        return this.messagesRepository.findOne(id);
    }
    getMessages() {
        return this.messagesRepository.findAll();
    }
    createMessage(content: string) {
        return this.messagesRepository.create(content);
    }
}
