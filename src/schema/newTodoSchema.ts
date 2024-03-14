"use client";

import { z } from "zod";

export const newTodoSchema = z.object({
	title: z.string().min(2, "Title is required.").max(100, "Title maximum character limit is 100."),
});