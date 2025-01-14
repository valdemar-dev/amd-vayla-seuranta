import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";

export default function Exams() {    
    const [grep, setGrep] = useState("");

    return (
	<div className="w-full h-full rounded-md ">
	    <div className="flex flex-col w-full items-start gap-4 px-4 md:px-8 md:gap-6 md:flex-row md:items-center md:justify-between">
		<h1 className="text-2xl font-bold">
		    {"Exams"}
		</h1>
		
		<div>
		    <Label htmlFor="search">Search</Label>
		    <Input 
			id="search"
			onChange={(ev) => setGrep(ev.target.value)} 
			type="text"
			placeholder="Enter a code or subject."
		    />
		</div>
	    </div>
	</div>
    )
}
