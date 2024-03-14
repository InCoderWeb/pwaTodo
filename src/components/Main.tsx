"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";
import { UserButton, useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { newTodoSchema } from "@/schema/newTodoSchema";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";

const Main = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [desc, setDesc] = useState("");
	const [data, setData] = useState<any>();
	const { userId } = useAuth();

	const form = useForm<z.infer<typeof newTodoSchema>>({
		resolver: zodResolver(newTodoSchema),
		defaultValues: {
			title: "",
		},
	});

	async function onSubmit(values: z.infer<typeof newTodoSchema>) {
		const response = await axios.post("/api/todo", {
			userId,
			title: form.watch("title"),
			desc: desc,
			requestType: "post",
			updatedAt: new Date(Date.now()).toISOString(),
		});
		if (response.data.status) {
			form.setValue("title", "");
			setDesc("");
			setIsOpen(!isOpen);

			toast.success("Task added successfully!");
		}
	}

	async function fetchData() {
		const response = await axios.post("/api/todo", {
			userId,
			requestType: "get",
		});
		if (response.data.status) {
			setData(response.data.todo);
		}
	}

	useEffect(() => {
		fetchData();
	}, [desc, form.watch("title")]);

	return (
		<>
			<div className="appWrapper">
				<div className="pwaApp">
					<header className="appHeader w-full flex justify-between items-center">
						<h1 className="text-4xl text-left font-semibold text-gray-800">
							Todos
						</h1>
						<UserButton />
					</header>
					<main className="appBody">
						{data != undefined ? (
							data?.map((d: any) => {
								return <>
									<div className="todo">
										<h4>{d.title}</h4>
									</div>
								</>;
							})
						) : (
							<img
								src="/assets/svg/note.svg"
								alt="Note Image"
								className="h-[20rem] mt-[4rem] mx-auto"
							/>
						)}
						<Button
							className="newTodoBtn"
							onClick={() => setIsOpen(!isOpen)}
						>
							<FaPlus className="size-[1.5em]" />
						</Button>
					</main>
					<section className={`newTodo ${isOpen ? "active" : ""}`}>
						<header className="flex justify-between items-center">
							<Button
								className="text-gray-700 p-0"
								onClick={() => {
									form.setValue("title", "");
									setIsOpen(!isOpen);
								}}
							>
								<FaArrowLeft className="size-[1.5em]" />
							</Button>
							<h3 className="font-semibold text-gray-800 text-2xl text-center">
								New Todo
							</h3>
						</header>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-8 mt-4"
							>
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input
													className="!rounded-lg"
													placeholder="Want to create maggie."
													{...field}
												/>
											</FormControl>
											<FormMessage className="text-red-800" />
										</FormItem>
									)}
								/>
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											className="!rounded-lg"
											placeholder="Enter the description"
											value={desc}
											onChange={(e) =>
												setDesc(e.target.value)
											}
										/>
									</FormControl>
								</FormItem>
								<Button type="submit" className="submitBtn">
									Done
								</Button>
							</form>
						</Form>
					</section>
				</div>
			</div>
		</>
	);
};

export default Main;
