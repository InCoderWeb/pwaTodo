import { connect } from "@/db/dbConfig";
import { TodoModel } from "@/models/todoModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { userId, title, desc, requestType } = body;
		console.log(userId, title, desc, requestType);

		if (requestType == "get") {
			const todo = await TodoModel.find({ userId: userId }).exec();
			if (todo) {
				return NextResponse.json(
					{
						status: true,
						todo,
						message: "Data fetched successfully.",
					},
					{ status: 201 }
				);
			} else {
				return NextResponse.json(
					{
						status: false,
						todo,
						message: "Something Went wrong.",
					},
					{ status: 400 }
				);
			}
		} else {
			new TodoModel({
				userId,
				title,
				desc,
				createdAt: new Date(),
			}).save();

			return NextResponse.json(
				{
					status: true,
					message: "Todo added Successfully.",
				},
				{ status: 201 }
			);
		}
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const body = await request.json();
		const { id } = body;
		console.log(id);
	} catch (e) {
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
