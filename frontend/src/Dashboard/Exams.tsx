import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
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
    TableFooter,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { useState } from "react";


// Admin Table
const admins = [
  { username: "admin1", password: "hashedPassword123" },
  { username: "admin2", password: "hashedPassword456" },
];

// Student Table
const students = [
  { student_id: 1, first_name: "John", last_name: "Doe", group_number: "A1" },
  { student_id: 2, first_name: "Jane", last_name: "Smith", group_number: "B2" },
];

// Exam Task Table
const examTasks = [
  {
    task_code: "JKA254",
    topic_area: 1,
    theme: "Math",
    task_description: "Solve for x in the equation 2x + 3 = 7.",
    sample_output: "x = 2",
    locked: false,
    last_used: "2024-01-10",
  },
  {
    task_code: "B8KT09",
    topic_area: 2,
    theme: "Physics",
    task_description: "Explain Newton's second law of motion.",
    sample_output: "F = ma",
    locked: true,
    last_used: "2024-01-12",
  },
];

// Exam Task Performance Table
const examTaskPerformances = [
  {
    performance_id: 1,
    first_name: "John",
    last_name: "Doe",
    group_number: "A1",
    task_code: "JKA254",
    session_code: "S12345",
    start_time: "2024-01-15T10:00:00Z",
    submission: "x = 2",
    status: "approved", // "approved" | "rejected" | null
    exam_completed: true,
  },
  {
    performance_id: 2,
    first_name: "Jane",
    last_name: "Smith",
    group_number: "B2",
    task_code: "B8KT09",
    session_code: "S54321",
    start_time: "2024-01-15T11:00:00Z",
    submission: "F = ma",
    status: "approved",
    exam_completed: true,
  },
];

// Exam Topic Area Table
const examTopicAreas = [
  { topic_id: 1, name: "Mathematics" },
  { topic_id: 2, name: "Physics" },
];

// Learning Task Table
const learningTasks = [
  { identifier: "LT101", name: "Essay Writing", task_description: "Write an essay on global warming." },
  { identifier: "LT102", name: "Video Presentation", task_description: "Create a video explaining photosynthesis." },
];

// Learning Task Performance Table
const learningTaskPerformances = [
  {
    performance_id: 1,
    student_id: 1,
    learning_task: "LT101",
    completion_method: "essay", // "essay" | "video" | "podcast" | "study_circle"
  },
  {
    performance_id: 2,
    student_id: 2,
    learning_task: "LT102",
    completion_method: "video",
  },
];

// Course Performance Table
const coursePerformances = [
  { performance_id: 1, student_id: 1, course_id: 101, completion_date: "2024-01-20" },
  { performance_id: 2, student_id: 2, course_id: 102, completion_date: "2024-01-25" },
];

// Elective Course Table
const electiveCourses = [
  { course_id: 101, name: "Advanced Mathematics", credit_points: 5 },
  { course_id: 102, name: "Introduction to Physics", credit_points: 3 },
];


// fetch via api
const examTaskSubjects = [
    {
	id: 0,
	name: "Math in Python.",
    },
    {
	id: 1,
	name: "Algorithms and data structures.",
    },
    {
	id: 2,
	name: "Binary Tree Searching",
    }
]

export default function Exams() {    
    const { toast } = useToast();

    const [grep, setGrep] = useState("");

    const [orderBy, setOrderBy] = useState("oldest");
    const [showLockedOnly, setShowLockedOnly] = useState(false);

    const [newExamTaskSubject, setNewExamTaskSubject] = useState("0");
    const [newExamTaskTheme, setNewExamTaskTheme] = useState("");
    const [newExamTaskDescription, setNewExamTaskDescription] = useState("")
    const [newExamTaskExampleOutput, setNewExamTaskExampleOutput] = useState("")

    const [selectedExamTaskSubject, setSelectedExamTaskSubject] = useState("0");
    const [selectedExamTaskTheme, setSelectedExamTaskTheme] = useState("");
    const [selectedExamTaskDescription, setSelectedExamTaskDescription] = useState("")
    const [selectedExamTaskExampleOutput, setSelectedExamTaskExampleOutput] = useState("")
    const [selectedExamTaskIsLocked, setSelectedExamTaskIsLocked] = useState(false)
    const [selectedExamTaskLastUsed, setSelectedExamTaskLastUsed] = useState("")
    const [selectedExamTaskCode, setSelectedExamTaskCode] = useState("")

    const sortedExamTasks = examTasks.sort((a, b) => {
	if (orderBy === "oldest") {
	    return new Date(a.last_used).getTime() - 
		new Date(b.last_used).getTime()
	} else {
	    return new Date(b.last_used).getTime() -
		new Date(a.last_used).getTime()
	}
    });

    const filteredExamTasks = sortedExamTasks.filter((examTask) => {
	if (grep.length > 0) {
	    if (!examTask.task_code.includes(grep)) return false;
	}

	if (showLockedOnly && examTask.locked === false) return false;

	return true;
    });

    const createExamTask = () => {
	const code = Math.floor((Math.random() * 1000)).toString();

	if (isNaN(parseInt(newExamTaskSubject))) {
	    return { code, didSucceed: false, errorMessage: "You must choose an exam task subject from the dropdown.", };
	}

	if (newExamTaskTheme.length > 50) {
	    return { code, didSucceed: false, errorMessage: "The maximum length of the exam task theme is 50 characters.", };
	}

	examTasks.push({
	    task_code: code,
	    topic_area: parseInt(newExamTaskSubject),
	    theme: newExamTaskTheme,
	    task_description: newExamTaskDescription,
	    last_used: (new Date(0).toUTCString()),
	    sample_output: newExamTaskExampleOutput,
	    locked: false,
	})

	setNewExamTaskSubject("0")
	setNewExamTaskDescription("")
	setNewExamTaskTheme("")
	setNewExamTaskExampleOutput("")

	return { code, didSucceed: true, errorMessage: null, };
    };

    const updateExamTask = () => {
	const existingTask = examTasks.find(examTask => examTask.task_code === selectedExamTaskCode);

	if (!existingTask) {
	    return {
		didSucceed: false,
		errorMessage: `An Exam Task was not found with the code: ${selectedExamTaskCode}`,
	    };
	}

	if (isNaN(parseInt(selectedExamTaskSubject))) {
	    return { 
		didSucceed: false,
		errorMessage: `The selected subject is not valid. Subject: ${selectedExamTaskSubject}`,
	    };
	}

	// TODO: SEND TO API / DB
	examTasks[examTasks.indexOf(existingTask)] = {
	    ...existingTask,
	    topic_area: parseInt(selectedExamTaskSubject),
	    theme: selectedExamTaskTheme,
	    task_description: selectedExamTaskDescription,
	    locked: selectedExamTaskIsLocked,
	    last_used: selectedExamTaskLastUsed,
	    sample_output: selectedExamTaskExampleOutput,
	}

	return {
	    didSucceed: true,
	    errorMessage: null,
	};
    };

    const deleteExamTask = () => {
	const existingTask = examTasks.find(examTask => examTask.task_code === selectedExamTaskCode);
	
	if (!existingTask) {
	    return {
		didSucceed: false,
		errorMessage: `An Exam Task was not found with the code: ${selectedExamTaskCode}`,
	    };
	}

	// FETCH HERE
	examTasks.splice(examTasks.indexOf(existingTask), 1);

	return {
	    didSucceed: true,
	    errorMessage: null,
	}
    };

    return (
	<div className="w-full h-full rounded-md ">
	    <div className="flex flex-col w-full items-start gap-4 px-4 md:px-8 md:gap-6 md:flex-row md:items-center md:justify-between">
		<h1 className="text-2xl font-bold">
		    {"Exam Tasks"}
		</h1>
		
		<div>
		    <Input 
			id="search"
			onChange={(ev) => setGrep(ev.target.value)} 
			type="text"
			placeholder="Enter a code or subject."
		    />
		</div>
	    </div>

	    <Separator className="my-6"/>

	    <div className="flex flex-wrap gap-6 w-full items-center px-4 md:px-8 mb-8">
		<Select onValueChange={(value) => setOrderBy(value)}>
		    <SelectTrigger className="w-[180px]">
			<SelectValue placeholder="Last Used" />
		    </SelectTrigger>

		    <SelectContent>
			<SelectItem value="oldest">Oldest</SelectItem>
			<SelectItem value="recent">Most Recent</SelectItem>
		    </SelectContent>
		</Select>

		<div className="flex items-center gap-2">
		    <Switch
			checked={showLockedOnly}
			onCheckedChange={setShowLockedOnly}
			id="locked-only" 
		    />
		    <Label htmlFor="locked-only">Show Only Locked Codes</Label>
		</div>

		<div className="ml-auto">
		    <Dialog>
			<DialogTrigger asChild>
			    <Button>Add Exam Task</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[700px] max-h-screen overflow-y-scroll">
			    <DialogHeader>
				<DialogTitle>New Exam Task</DialogTitle>
				<DialogDescription>
				    Create a new exam task here. Hit create to save and publish it.
				</DialogDescription>
			    </DialogHeader>

			    <div className="flex flex-col gap-4">
				<div>
				    <Label htmlFor="subject">
					Subject
				    </Label>

				    <Select
					onValueChange={(value) => setNewExamTaskSubject(value)}
				    >
					<SelectTrigger className="w-[180px]">
					    <SelectValue placeholder="Subject" />
					</SelectTrigger>

					<SelectContent>
					    {examTaskSubjects.map((subject, index) => 
						<SelectItem key={index} value={subject.id.toString()}> 
						    {subject.name}
						</SelectItem> 
					    )}
					</SelectContent>
				    </Select>
				</div>
				<div>
				    <Label htmlFor="task_description">
					Task Description
				    </Label>
				    <Textarea
					value={newExamTaskDescription}
					onChange={(ev) => setNewExamTaskDescription(ev.target.value)}
					placeholder="Please describe the task in detail here."
					rows={8}
					id="task_description" 
				    />
				</div>

				<div>
				    <Label htmlFor="sample_output">
					Sample Output	
				    </Label>
				    <Textarea
					value={newExamTaskExampleOutput}
					onChange={(ev) => setNewExamTaskExampleOutput(ev.target.value)}
					placeholder="Enter your sample output code here."
					id="sample_output" 
				    />
				</div>

				<div>
				    <Label htmlFor="theme">
					Theme	
				    </Label>
				    <Textarea
					value={newExamTaskTheme}
					onChange={(ev) => setNewExamTaskTheme(ev.target.value)}
					placeholder="Enter the theme of this Exam Task here."
					id="theme" 
				    />
				</div>
			    </div>

			    <DialogFooter>
				<DialogClose asChild>
				    <Button
					type="submit"
					onClick={() => {
					    const { code, didSucceed, errorMessage } = createExamTask();

					    if (!didSucceed) {
						toast({
						  title: "Failed To Create Task",
						  description: `${errorMessage}`,
						})

						return;
					    }

					    toast({
					      title: "Exam Task Created",
					      description: `Code: ${code}`,
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
			    <DialogTitle>Edit Exam Task</DialogTitle>
			    <DialogDescription>
				Click save to update this exam task.
			    </DialogDescription>
			</DialogHeader>

			<div className="flex flex-col gap-4">
			    <div className="flex flex-wrap gap-4">
				<div>
				    <Label htmlFor="subject">
					Subject
				    </Label>

				    <Select
					onValueChange={(value) => setSelectedExamTaskSubject(value)}
				    >
					<SelectTrigger className="w-[180px]">
					    <SelectValue placeholder="Subject" />
					</SelectTrigger>

					<SelectContent>
					    {examTaskSubjects.map((subject, index) => 
						<SelectItem key={index} value={subject.id.toString()}> 
						    {subject.name}
						</SelectItem> 
					    )}
					</SelectContent>
				    </Select>
				</div>

				<div>
				    <Label htmlFor="subject">
					Is Locked?
				    </Label>

				    <Select
					onValueChange={(value) => setSelectedExamTaskIsLocked(value === "true")}
				    >
					<SelectTrigger className="w-[180px]">
					    <SelectValue placeholder="Locked" />
					</SelectTrigger>

					<SelectContent>
					    <SelectItem value={"true"}> 
						True
					    </SelectItem> 

					    <SelectItem value={"false"}> 
						False
					    </SelectItem> 
					</SelectContent>
				    </Select>
				</div>
			    </div>
			    <div>
				<Label htmlFor="task_description">
				    Task Description
				</Label>
				<Textarea
				    value={selectedExamTaskDescription}
				    onChange={(ev) => setSelectedExamTaskDescription(ev.target.value)}
				    placeholder="Please describe the task in detail here."
				    rows={8}
				    id="task_description" 
				/>
			    </div>

			    <div>
				<Label htmlFor="sample_output">
				    Sample Output	
				</Label>
				<Textarea
				    value={selectedExamTaskExampleOutput}
				    onChange={(ev) => setSelectedExamTaskExampleOutput(ev.target.value)}
				    placeholder="Enter your sample output code here."
				    id="sample_output" 
				/>
			    </div>

			    <div>
				<Label htmlFor="theme">
				    Theme	
				</Label>
				<Textarea
				    value={selectedExamTaskTheme}
				    onChange={(ev) => setSelectedExamTaskTheme(ev.target.value)}
				    placeholder="Enter the theme of this Exam Task here."
				    id="theme" 
				/>
			    </div>
			</div>

			<DialogFooter>
			    <DialogClose asChild>
				<Button
				    variant="destructive"
				    onClick={() => {
					const { didSucceed, errorMessage } = deleteExamTask();

					if (!didSucceed) {
					    toast({
					      title: "Failed to delete an exam task.",
					      description: `${errorMessage}`,
					    })

					    return;
					}

					toast({
					  title: "Success!",
					  description: `Successfully deleted an exam task.`,
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
					const { didSucceed, errorMessage } = updateExamTask();

					if (!didSucceed) {
					    toast({
					      title: "Failed To Update Task",
					      description: `${errorMessage}`,
					    })

					    return;
					}

					toast({
					  title: "Success!",
					  description: `Successfully updated an exam task.`,
					})
				    }}
				>
				    Save
				</Button>
			    </DialogClose>
			</DialogFooter>
		    </DialogContent>

		    <Table>
			<TableCaption>All Existing Exam Tasks.</TableCaption>
			    <TableHeader>
				<TableRow>
				  <TableHead className="w-[100px]">Locked</TableHead>
				  <TableHead>Topic Area</TableHead>
				  <TableHead>Theme</TableHead>
				  <TableHead className="text-right">Code</TableHead>
				  <TableHead className="text-right">Last Used</TableHead>
				</TableRow>
			      </TableHeader>
			<TableBody>
			    {filteredExamTasks.map((data, index) => (
				<DialogTrigger
				    key={index}
				    asChild
				>
				    <TableRow 
					key={index}
					className="hover:cursor-pointer" 
					onClick={() => {
					    setSelectedExamTaskSubject(`${data.topic_area}`)
					    setSelectedExamTaskIsLocked(data.locked)
					    setSelectedExamTaskDescription(data.task_description)
					    setSelectedExamTaskLastUsed(data.last_used)
					    setSelectedExamTaskTheme(data.theme)
					    setSelectedExamTaskCode(data.task_code)
					    setSelectedExamTaskExampleOutput(data.sample_output)
					}}
				    >
					<TableCell className="font-medium">{`${data.locked}`}</TableCell>
					<TableCell>{examTaskSubjects[data.topic_area]?.name}</TableCell>
					<TableCell>{data.theme}</TableCell>
					<TableCell className="text-right font-mono">{data.task_code}</TableCell>
					<TableCell className="text-right">
					    {new Date(data.last_used).toLocaleTimeString()} - {new Date(data.last_used).toLocaleDateString()}
					</TableCell>
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
