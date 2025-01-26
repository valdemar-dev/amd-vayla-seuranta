import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";

import { useToast } from "@/hooks/use-toast";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Button 
} from "@/components/ui/button";

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

import { useState } from "react";

const FilterStatus = {
    NULL: null,
    RETURNED: "returned",
    APPROVED: "approved",
    REJECTED: "rejected", 
}

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


// Student Table
const students = [
  { student_id: 1, first_name: "John", last_name: "Doe", group_number: "A1" },
  { student_id: 2, first_name: "Jane", last_name: "Smith", group_number: "B2" },
];

const cachedPerformanceLearningTasks = [];
const EXAM_TASKS_ENDPOINT = "localhost:3000/api/null"

export default function Performances() {    
    const { toast } = useToast();

    const [grep, setGrep] = useState("");

    const [selectedLearningTaskPerformance, setSelectedLearningTaskPerformance] = useState(learningTaskPerformances[0]);
    const [performanceLearningTask, setPerformanceLearningTask] = useState(null);

    useEffect(() => {
	setPerformanceLearningTask(null);

	const correspondingTask = cachedPerformanceLearningTasks.find(et => et.performance_id === selectedLearningTaskPerformance.performance_id);

	if (correspondingTask) {
	    setPerformanceLearningTask(correspondingTask);
	    
	    return;
	}


	/*
	fetch(EXAM_TASKS_ENDPOINT, {
	    method: "GET",
	    headers: {},
	}).then(async (res) => {
	    if (!res.ok) return;

	    const learningTask = await res.json();

	    cachedPerformanceLearningTasks.push(learningTask);

	    setPerformanceLearningTask(learningTask); 
	});
	*/

	setPerformanceLearningTask(learningTasks[0])

    }, [selectedLearningTaskPerformance]);

    const filteredLearningTaskPerformances = learningTaskPerformances.filter((learningTaskPerformance) => {
	if (grep.length > 0) {
	    if (learningTaskPerformance.learning_task.includes(grep)) return true;
	    const student = students.find(s => s.student_id === learningTaskPerformance.student_id);

	    if (!student) return false;

	    if (student.first_name.includes(grep)) return true;
	    if (student.last_name.includes(grep)) return true;
	}

	return true;
    });

    return (
	<div className="w-full h-full rounded-md ">
	    <div className="flex flex-col w-full items-start gap-4 px-4 md:px-8 md:gap-6 md:flex-row md:items-center md:justify-between">
		<h1 className="text-2xl font-bold">
		    {"Learning Task Performances"}
		</h1>
		
		<div>
		    <Input 
			id="search"
			onChange={(ev) => setGrep(ev.target.value)} 
			type="text"
			placeholder="Enter a code or student."
		    />
		</div>
	    </div>

	    <Separator className="my-6"/>

	    <div className="px-4 md:px-8">

		<Dialog>
		    <DialogContent className="sm:max-w-[calc(100vw-30px)] h-[calc(100vh-30px)] overflow-clip flex flex-col gap-4">
			<DialogHeader>
			    <DialogTitle>Manage Exam Task Performance</DialogTitle>
			    <DialogDescription>
				Set status the status, etc. of this Exam Task Performance.
			    </DialogDescription>
			</DialogHeader>

			<div className="relative">
			    {selectedLearningTaskPerformance.submission}
			</div>

			<DialogFooter className="min-h-max">
			    <DialogClose asChild>
				<Button type="submit">
				    Close
				</Button>
			    </DialogClose>
			</DialogFooter>
		    </DialogContent>

		<Table>
		    <TableCaption>All Existing Learning Task Performances.</TableCaption>

		    <TableHeader>
			<TableRow>
			    <TableHead className="w-[150px]">Last Name</TableHead>
			    <TableHead className="w-[150px]">First Name</TableHead>
			    <TableHead className="text-right">Method</TableHead>
			    <TableHead className="text-right">Task Code</TableHead>
			</TableRow>
		    </TableHeader>

		    <TableBody>
			{filteredLearningTaskPerformances.map((data, index) => {
			    const student = students.find(s => s.student_id === data.student_id)

			    return (
				<DialogContent 
				    key={index}
				    asChild
				>

				    <TableRow 
					key={index}
					className="hover:cursor-pointer" 
					onClick={() => {
					    setSelectedLearningTaskPerformance(learningTaskPerformances.find(t => t.performance_id === data.performance_id))
					}}
				    >
					<TableCell className="font-medium">{`${student?.last_name}`}</TableCell>
					<TableCell className="font-medium">{`${student?.first_name}`}</TableCell>

					<TableCell className="text-right capitalize">{data.completion_method}</TableCell>
					<TableCell className="text-right font-mono">{data.learning_task}</TableCell>
				    </TableRow>
				</DialogContent>
			    )
			})}
		    </TableBody>
		</Table>
		</Dialog>
	    </div>

	    <Toaster />
	</div>
    )
}
