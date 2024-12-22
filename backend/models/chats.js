import mongoose from 'mongoose';
const chatSchema = mongoose.Schema({
	name: {
		type: String
	},
	sessionId: { type: String }, 
    messages: [
        {
            message: { type: String },
            botResponse: { type: String },
            timestamp: { type: Date, default: Date.now },
        },
    ],
});
const Chat = mongoose.model('Chat', chatSchema);
export default Chat;