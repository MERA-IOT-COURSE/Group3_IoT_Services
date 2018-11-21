class Message {
    constructor(messageId, data) {
        this.messageId = messageId
        this.data = data
    }

    dict() {
        return {
            "mid": this.messageId,
            "data": this.data
        }
    }
}

module.exports.Message = Message