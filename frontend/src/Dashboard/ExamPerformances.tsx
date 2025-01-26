import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy } from "lucide-react";

import SyntaxHighlighter from 'react-syntax-highlighter';

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
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"

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
    submission: `import random

def generate_sales_data(num_entries):
    """Generates a list of sales data for demonstration."""
    sales_data = []
    for _ in range(num_entries):
	entry = {
	    'item_id': random.randint(1000, 9999),
	    'quantity': random.randint(1, 10),
	    'price_per_item': round(random.uniform(5.0, 50.0), 2),
	}
	sales_data.append(entry)
    return sales_data


def calculate_totals(sales_data):
    """Calculates total sales and total revenue."""
    total_items = 0
    total_revenue = 0.0

    for entry in sales_data:
	total_items += entry['quantity']
	total_revenue += entry['quantity'] * entry['price_per_item']

    return total_items, total_revenue


def print_summary(sales_data):
    """Prints a summary of the sales data."""
    print("Summary of Sales Data")
    print("-----------------------")
    print(f"Total entries: {len(sales_data)}")

    total_items, total_revenue = calculate_totals(sales_data)
    print(f"Total items sold: {total_items}")
    print(f"Total revenue: \${total_revenue:.2f}")


def main():
    """Main function to execute the script."""
    print("Welcome to the Sales Summary Tool!")

    # Generate random sales data
    num_entries = int(input("Enter the number of sales entries to generate: "))
    sales_data = generate_sales_data(num_entries)

    # Print the sales data (optional)
    print("Generated Sales Data:")
    for entry in sales_data:
	print(entry)

    print("Calculating summary...")

    # Print the summary
    print_summary(sales_data)


# Entry point for the script
if __name__ == "__main__":
    main()
    `,
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

const FilterStatus = {
    NULL: null,
    RETURNED: "returned",
    APPROVED: "approved",
    REJECTED: "rejected", 
}

const cachedPerformanceExamTasks = [];
const EXAM_TASKS_ENDPOINT = "localhost:3000/api/null"

export default function Exams() {    
    const { toast } = useToast();

    const [grep, setGrep] = useState("");

    const [filterStatus, setFilterStatus] = useState(`${FilterStatus.NULL}`);
    const [showLockedOnly, setShowLockedOnly] = useState(false);

    const [selectedExamTaskPerformance, setSelectedExamTaskPerformance] = useState(examTaskPerformances[0]);
    const [performanceExamTask, setPerformanceExamTask] = useState(null);

    useEffect(() => {
	setPerformanceExamTask(null);

	const correspondingTask = cachedPerformanceExamTasks.find(et => et.task_code === selectedExamTaskPerformance.task_code);

	if (correspondingTask) {
	    setPerformanceExamTask(correspondingTask);
	    
	    return;
	}


	/*
	fetch(EXAM_TASKS_ENDPOINT, {
	    method: "GET",
	    headers: {},
	}).then(async (res) => {
	    if (!res.ok) return;

	    const examTask = await res.json();

	    cachedPerformanceExamTasks.push(examTask);

	    setPerformanceExamTask(examTask); 
	});
	*/

	setPerformanceExamTask(examTasks[0])

    }, [selectedExamTaskPerformance]);

    const filteredExamTaskPerformances = examTaskPerformances.filter((examTaskPerformance) => {
	if (filterStatus !== `${FilterStatus.NULL}`) {
	    if (examTaskPerformance.status !== filterStatus) return false;
	}

	if (grep.length > 0) {
	    if (examTaskPerformance.task_code.includes(grep)) return true;
	    if (examTaskPerformance.first_name.includes(grep)) return true;
	    if (examTaskPerformance.last_name.includes(grep)) return true;
	}

	return true;
    });

    const saveExamTaskPerformance = () => {
	return { didSucceed: true, errorMessage: null, };
    };

    return (
	<div className="w-full h-full rounded-md ">
	    <div className="flex flex-col w-full items-start gap-4 px-4 md:px-8 md:gap-6 md:flex-row md:items-center md:justify-between">
		<h1 className="text-2xl font-bold">
		    {"Performances"}
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

	    <div className="flex flex-wrap gap-6 w-full items-center px-4 md:px-8 mb-8">
		<Select defaultValue={selectedExamTaskPerformance.status} onValueChange={(value) => setFilterStatus(value)}>
		    <SelectTrigger className="w-[180px]">
			<SelectValue placeholder="Status" />
		    </SelectTrigger>

		    <SelectContent>
			<SelectItem value={`${FilterStatus.NULL}`}>In Progress</SelectItem>
			<SelectItem value={`${FilterStatus.RETURNED}`}>Returned</SelectItem>
			<SelectItem value={`${FilterStatus.APPROVED}`}>Approved</SelectItem>
			<SelectItem value={`${FilterStatus.REJECTED}`}>Rejected</SelectItem>
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
	    </div>

	    <div className="px-4 md:px-8">
		<Dialog>
		    <DialogContent className="sm:max-w-[calc(100vw-30px)] h-[calc(100vh-30px)] overflow-clip flex flex-col gap-4">
			<DialogHeader>
			    <DialogTitle>Manage Exam Task Performance</DialogTitle>
			    <DialogDescription>
				Set status the status, etc. of this Exam Task Performance.
			    </DialogDescription>
			</DialogHeader>

			<div className="flex flex-col h-full overflow-hidden lg:flex-row gap-8">
			    <div className="w-2/3 overflow-hidden relative">
				<SyntaxHighlighter className="rounded-lg h-full overflow-y-scroll" language="python">
				    {selectedExamTaskPerformance.submission}
				</SyntaxHighlighter>

				<Button 
				    id="copy-answer-button"
				    variant="outline"
				    className="absolute right-2 top-2"
				    onClick={async () => {
					await navigator.clipboard.writeText(selectedExamTaskPerformance.submission);
				}}
				>
				    <Copy />
				</Button>
			    </div>

			    <div className="w-1/3 flex flex-col gap-4">
				<div>
				    <h4 className="font-bold text-xl">
					{"Performance"}
				    </h4>

				    <span className="text-sm text-muted-foreground">
					{"Information about this Exam Task Performance"}
				    </span>
				</div>

				<div className="flex flex-wrap items-start gap-12 mb-4">
				    <div>
					<Label htmlFor="returnee-name">
					    {"Returnee"}
					</Label>

					<p
					    id="returnee-name"
					    className="text-base text-muted-foreground"
					>
					    {`${selectedExamTaskPerformance.first_name} ${selectedExamTaskPerformance.last_name}`}
					</p>
				    </div>

				    <div>
					<Label htmlFor="returnee-name">
					    {"Group"}
					</Label>
					<p
					    id="returnee-name"
					    className="text-base text-muted-foreground"
					>
					    {selectedExamTaskPerformance.group_number}
					</p>
				    </div>

				    <div className="ml-auto">
					<Label htmlFor="return_status">
					    Return Status
					</Label>

					<Select
					    onValueChange={(value) => {
						setSelectedExamTaskPerformance((prevValues) => ({
						    ...prevValues,
						    status: value,
						}));
					    }}
					>
					    <SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Status" />
					    </SelectTrigger>

					    <SelectContent>	
						<SelectItem value={"pending"}> 
						    Pending Approval
						</SelectItem>

						<SelectItem value={"approved"}> 
						    Approved
						</SelectItem> 

						<SelectItem value={"rejected"}> 
						    Rejected
						</SelectItem> 
					    </SelectContent>
					</Select>
				    </div>
				</div>

				<div>
				    <h5 className="font-semibold mb-1">
					{"Task Description"}
				    </h5>

				    {!performanceExamTask && (<Skeleton className="w-full h-20"/>)}

				    {performanceExamTask && (
					<div className="text-base text-muted-foreground">
					    {performanceExamTask.task_description}
					</div>
				    )}
				</div>

				<div>
				    <h5 className="font-semibold mb-1">
					{"Sample Output"}
				    </h5>

				    {!performanceExamTask && (<Skeleton className="w-full h-48"/>)}

				    {performanceExamTask && (				
					<SyntaxHighlighter className="rounded-lg h-full overflow-y-scroll" language="python">
					    {performanceExamTask.sample_output}
					</SyntaxHighlighter>
				    )}
				</div>
			    </div>
			</div>

			<DialogFooter className="min-h-max">
			    <DialogClose asChild>
				<Button
				    type="submit"
				    onClick={() => {
					const { didSucceed, errorMessage } = saveExamTaskPerformance();

					if (!didSucceed) {
					    toast({
					      title: "Failed to update exam task performance",
					      description: `${errorMessage}`,
					    })

					    return;
					}

					toast({
					  title: "Success!",
					  description: `Successfully saved an exam task performance.`,
					})
				    }}
				>
				    Save
				</Button>
			    </DialogClose>
			</DialogFooter>
		    </DialogContent>

		    <Table>
			<TableCaption>All Existing Exam Task Performances.</TableCaption>

			<TableHeader>
			    <TableRow>
				<TableHead className="w-[150px]">Last Name</TableHead>
				<TableHead className="w-[150px]">First Name</TableHead>
				<TableHead>Group Number</TableHead>
				<TableHead>Code</TableHead>
				<TableHead className="text-right">Status</TableHead>
				<TableHead className="text-right">Exam Completed</TableHead>
			    </TableRow>
			</TableHeader>

			<TableBody>
			    {filteredExamTaskPerformances.map((data, index) => (
				<DialogTrigger
				    key={index}
				    asChild
				>
				    <TableRow 
					key={index}
					className="hover:cursor-pointer" 
					onClick={() => {
					    setSelectedExamTaskPerformance(examTaskPerformances[index])
					}}
				    >
					<TableCell className="font-medium">{`${data.last_name}`}</TableCell>
					<TableCell className="font-medium">{`${data.first_name}`}</TableCell>

					<TableCell className="font-mono">{data.group_number}</TableCell>
					<TableCell className="font-mono">{data.task_code}</TableCell>

					<TableCell className="text-right capitalize">{data.status}</TableCell>
					<TableCell className="text-right capitalize">{`${data.exam_completed}`}</TableCell>
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
