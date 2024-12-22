import mongoose from 'mongoose';
const tableSchema = mongoose.Schema({
	query: {
		type: String
	},
	answers: []
});
const table = mongoose.model('tables', tableSchema);
export default table;