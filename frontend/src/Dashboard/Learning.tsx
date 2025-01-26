import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";

import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { useState } from "react";

// Learning Task Table
const learningTasks = [
  { identifier: "LT101", name: "Essay Writing", task_description: "Write an essay on global warming." },
  { identifier: "LT102", name: "Video Presentation", task_description: "Create a video explaining photosynthesis." },
];

export default function Learning() {    
    const { toast } = useToast();

    const [grep, setGrep] = useState("");

    const [newLearningTaskIdentifier, setNewLearningTaskIdentifier] = useState("");
    const [newLearningTaskName, setNewLearningTaskName] = useState("");
    const [newLearningTaskDescription, setNewLearningTaskDescription] = useState("")

    const [selectedLearningTaskIdentifier, setSelectedLearningTaskIdentifier] = useState("");
    const [selectedLearningTaskName, setSelectedLearningTaskName] = useState("");
    const [selectedLearningTaskDescription, setSelectedLearningTaskDescription] = useState("")

    const sortedLearningTasks = learningTasks.sort();

    const filteredLearningTasks = sortedLearningTasks.filter((task) => {
	if (grep.length > 0) {
	    if (!task.identifier.includes(grep)) return false;
	}

	return true;
    });

    const createLearningTask = () => {
	const identifier = Math.floor((Math.random() * 1000)).toString();

	if (newLearningTaskName.length > 50) {
	    return { identifier, didSucceed: false, errorMessage: "The maximum length of the exam task name is 50 characters.", };
	}

	learningTasks.push({
	    identifier: identifier,
	    name: newLearningTaskName,
	    task_description: newLearningTaskDescription,
	})

	setNewLearningTaskIdentifier("")
	setNewLearningTaskDescription("")
	setNewLearningTaskName("")

	return { identifier, didSucceed: true, errorMessage: null, };
    };

    const updateLearningTask = () => {
	const existingTask = learningTasks.find(task => task.identifier === selectedLearningTaskIdentifier);

	if (!existingTask) {
	    return {
		didSucceed: false,
		errorMessage: `A Learning Task was not found with the identifier: ${selectedLearningTaskIdentifier}`,
	    };
	}

	// TODO: SEND TO API / DB
	learningTasks[learningTasks.indexOf(existingTask)] = {
	    ...existingTask,
	    name: newLearningTaskName,
	    task_description: newLearningTaskDescription,
	}

	return {
	    didSucceed: true,
	    errorMessage: null,
	};
    };

    const deleteLearningTask = () => {
	const existingTask = learningTasks.find(task => task.identifier === selectedLearningTaskIdentifier);
	
	if (!existingTask) {
	    return {
		didSucceed: false,
		errorMessage: `A Learning Task was not found with the identifier: ${selectedLearningTaskIdentifier}`,
	    };
	}

	// FETCH HERE
	learningTasks.splice(learningTasks.indexOf(existingTask), 1);

	return {
	    didSucceed: true,
	    errorMessage: null,
	}
    };

    return (
	<div className="w-full h-full rounded-md ">
	    <div className="flex flex-col w-full items-start gap-4 px-4 md:px-8 md:gap-6 md:flex-row md:items-center md:justify-between">
		<h1 className="text-2xl font-bold">
		    {"Learning Tasks"}
		</h1>
	    </div>

	    <Separator className="my-6"/>

	    <div className="flex flex-wrap gap-6 w-full items-center px-4 md:px-8 mb-8">
		<Input 
		    id="search"
		    onChange={(ev) => setGrep(ev.target.value)} 
		    type="text"
		    placeholder="Enter a identifier or subject."
		    className="min-w-0 max-w-[400px] w-full"
		/>

		<div className="ml-auto">
		    <Dialog>
			<DialogTrigger asChild>
			    <Button>Add Learning Task</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[700px] max-h-screen overflow-y-scroll">
			    <DialogHeader>
				<DialogTitle>New Learning Task</DialogTitle>
				<DialogDescription>
				    Create a new learning task here. Hit create to save and publish it.
				</DialogDescription>
			    </DialogHeader>

			    <div className="flex flex-col gap-4">
				<div>
				    <Label htmlFor="task_description">
					Task Name
				    </Label>
				    <Textarea
					value={newLearningTaskName}
					onChange={(ev) => setNewLearningTaskName(ev.target.value)}
					placeholder="Give your task a name."
					rows={8}
					id="task_name" 
				    />			
				</div>
				<div>
				    <Label htmlFor="task_description">
					Task Description
				    </Label>
				    <Textarea
					value={newLearningTaskDescription}
					onChange={(ev) => setNewLearningTaskDescription(ev.target.value)}
					placeholder="Please describe the task in detail here."
					rows={8}
					id="task_description" 
				    />
				</div>
			    </div>

			    <DialogFooter>
				<DialogClose asChild>
				    <Button
					type="submit"
					onClick={() => {
					    const { identifier, didSucceed, errorMessage } = createLearningTask();

					    if (!didSucceed) {
						toast({
						  title: "Failed To Create Task",
						  description: `${errorMessage}`,
						})

						return;
					    }

					    toast({
					      title: "Learning Task Created",
					      description: `Identifier: ${identifier}`,
					    })
					}}
				    >
					Create
				    </Button>
				</DialogClose>
			    </DialogFooter>
			</DialogContent>
		    </Dialog>
		</div>
	    </div>

	    <div className="px-4 md:px-8">
		<Dialog>
		    <DialogContent className="sm:max-w-[700px] max-h-screen overflow-y-scroll">
			<DialogHeader>
			    <DialogTitle>Edit Learning Task</DialogTitle>
			    <DialogDescription>
				Click save to update this learning task.
			    </DialogDescription>
			</DialogHeader>

			<div className="flex flex-col gap-4">
			    <div>
				<Label htmlFor="theme">
				    Name
				</Label>
				<Textarea
				    value={selectedLearningTaskName}
				    onChange={(ev) => setSelectedLearningTaskName(ev.target.value)}
				    placeholder="Enter the name of this Learning Task here."
				    id="theme" 
				/>
			    </div>

			    <div>
				<Label htmlFor="task_description">
				    Task Description
				</Label>
				<Textarea
				    value={selectedLearningTaskDescription}
				    onChange={(ev) => setSelectedLearningTaskDescription(ev.target.value)}
				    placeholder="Please describe the task in detail here."
				    rows={8}
				    id="task_description" 
				/>
			    </div>
			</div>

			<DialogFooter>
			    <DialogClose asChild>
				<Button
				    variant="destructive"
				    onClick={() => {
					const { didSucceed, errorMessage } = deleteLearningTask();

					if (!didSucceed) {
					    toast({
					      title: "Failed to delete a learning task.",
					      description: `${errorMessage}`,
					    })

					    return;
					}

					toast({
					  title: "Success!",
					  description: `Successfully deleted a learning task.`,
					})
				    }}
				>
				    Delete
				</Button>
			    </DialogClose>

			    <DialogClose asChild>
				<Button
				    type="submit"
				    onClick={() => {
					const { didSucceed, errorMessage } = updateLearningTask();

					if (!didSucceed) {
					    toast({
					      title: "Failed To Update Task",
					      description: `${errorMessage}`,
					    })

					    return;
					}

					toast({
					  title: "Success!",
					  description: `Successfully updated an learning task.`,
					})
				    }}
				>
				    Save
				</Button>
			    </DialogClose>
			</DialogFooter>
		    </DialogContent>

		    <Table>
			<TableCaption>All Existing Learning Tasks.</TableCaption>
			    <TableHeader>
				<TableRow>
				  <TableHead className="w-[100px]">Identifier</TableHead>
				  <TableHead className="text-right">Name</TableHead>
				  <TableHead className="text-right">Description</TableHead>
				</TableRow>
			      </TableHeader>
			<TableBody>
			    {filteredLearningTasks.map((data, index) => (
				<DialogTrigger
				    key={index}
				    asChild
				>
				    <TableRow 
					key={index}
					className="hover:cursor-pointer" 
					onClick={() => {
					    setSelectedLearningTaskName(`${data.name}`)
					    setSelectedLearningTaskIdentifier(data.identifier)
					    setSelectedLearningTaskDescription(data.task_description)
					}}
				    >
					<TableCell className="font-medium">{`${data.identifier}`}</TableCell>
					<TableCell className="text-right">{data.name.slice(0,25)} {data.name.length > 25 && ("...")}</TableCell>
					<TableCell className="text-right">{data.task_description.slice(0,25)} {data.task_description.length > 25 && ("...")}</TableCell>
				    </TableRow>
				</DialogTrigger>
			    ))}
			</TableBody>
		    </Table>
		</Dialog>
	    </div>

	    <Toaster />
	</div>
    )
}
