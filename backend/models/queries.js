import mongoose from "mongoose";
const QuerySchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  queries: [
    {   type: {
          type: String
        },
		query: { type: Array },
        answer: { type: Array },
        headers: { type: Array },
        data: { type: Array }, 
      createdAt: { type: Date, default: Date.now }}
  ],
});
const Query = mongoose.model("Query", QuerySchema);
export default Query;