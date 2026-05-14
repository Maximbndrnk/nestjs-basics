import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from "node:fs/promises";

@Injectable()
export class MessagesRepository {

    async findOne(id: string) {
        const messages = await this.getMessages();
        return messages[id] ?? null;
    }

    async findAll() {
        const messages = await this.getMessages();
        return messages;
    }

    async create(content: string) {
        const messages = await this.getMessages();
        const id = Object.keys(messages).length + 1 || 1;
        messages[id] = {id, content};
        await writeFile('messages.json', JSON.stringify(messages));
        return messages[id];
    }

    private async getMessages() {
        const content = await readFile('messages.json', 'utf-8');
        return JSON.parse(content || "{}");
    }
}
