export class MessageModel {
    constructor (
        public id: string,
        public subject: string,
        public msgText: string,
        public sender: string
    ) { }

    
}