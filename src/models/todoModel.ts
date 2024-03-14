import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: [true, "Please Provide user id."],
	},
	title: {
		type: String,
		required: [true, "Please provide a title for the task."]
	},
	desc: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

export const TodoModel =
	mongoose.models["todos"] ||
	mongoose.model("todos", TodoSchema);
