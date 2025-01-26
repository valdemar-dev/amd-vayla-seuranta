import { useState, } from "react";
import { useSearchParams, } from "react-router"; 
import { useEffect, } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { School, Book, ChevronDown, User } from "lucide-react";

import Exams from "./Dashboard/Exams";
import ExamPerformances from "./Dashboard/ExamPerformances";
import Learning from "./Dashboard/Learning";
import LearningPerformances from "./Dashboard/LearningPerformances";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarFooter,
} from "@/components/ui/sidebar"

import {
    ModeToggle
} from "@/components/mode-toggle";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"

export function AppSidebar({ setParams }) {
  return (
    <Sidebar>  
	<SidebarContent>
	    <SidebarGroup>
		<Collapsible defaultOpen className="group/collapsible">
		    <SidebarGroupContent>
			<SidebarMenu>
			    <SidebarMenuItem>
				<SidebarMenuButton>
				    <CollapsibleTrigger asChild>
					<SidebarMenuButton>
					    <School />

					    <span>
						{"Exam Tasks"}
					    </span>

					    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
					</SidebarMenuButton>
				    </CollapsibleTrigger>
				</SidebarMenuButton>
			    </SidebarMenuItem>

			    <CollapsibleContent>
				<SidebarMenuSub>
				    <SidebarMenuSubItem>
					<SidebarMenuButton asChild>
					    <button
						onClick={() => setParams({ page: 1, })}
					    >
						{"Manage Tasks"}
					    </button>
					</SidebarMenuButton>
				    </SidebarMenuSubItem>

				    <SidebarMenuSubItem>
					<SidebarMenuButton asChild>
					    <button
						onClick={() => setParams({ page: 2, })}
					    >
						{"Performances"}
					    </button>
					</SidebarMenuButton>
				    </SidebarMenuSubItem>
				</SidebarMenuSub>
			    </CollapsibleContent>
			  </SidebarMenu>
		      </SidebarGroupContent>
		</Collapsible>
		<Collapsible defaultOpen className="group/collapsible">
		    <SidebarGroupContent>
			<SidebarMenu>
			    <SidebarMenuItem>
				<SidebarMenuButton>
				    <CollapsibleTrigger asChild>
					<SidebarMenuButton>
					    <Book />

					    <span>
						{"Learning Tasks"}
					    </span>

					    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
					</SidebarMenuButton>
				    </CollapsibleTrigger>
				</SidebarMenuButton>
			    </SidebarMenuItem>

			    <CollapsibleContent>
				<SidebarMenuSub>
				    <SidebarMenuSubItem>
					<SidebarMenuButton asChild>
					    <button
						onClick={() => setParams({ page: 3, })}
					    >
						{"Manage Tasks"}
					    </button>
					</SidebarMenuButton>
				    </SidebarMenuSubItem>

				    <SidebarMenuSubItem>
					<SidebarMenuButton asChild>
					    <button
						onClick={() => setParams({ page: 4, })}
					    >
						{"Performances"}
					    </button>
					</SidebarMenuButton>
				    </SidebarMenuSubItem>
				</SidebarMenuSub>
			    </CollapsibleContent>
			  </SidebarMenu>
		      </SidebarGroupContent>
		</Collapsible>
		<Collapsible defaultOpen className="group/collapsible">
		    <SidebarGroupContent>
			<SidebarMenu>
			    <SidebarMenuItem>
				<SidebarMenuButton>
				    <CollapsibleTrigger asChild>
					<SidebarMenuButton>
					    <User />

					    <span>
						{"Students"}
					    </span>

					    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
					</SidebarMenuButton>
				    </CollapsibleTrigger>
				</SidebarMenuButton>
			    </SidebarMenuItem>

			    <CollapsibleContent>
				<SidebarMenuSub>
				    <SidebarMenuSubItem>
					<SidebarMenuButton asChild>
					    <button
						onClick={() => setParams({ page: 5, })}
					    >
						{"Student Overview"}
					    </button>
					</SidebarMenuButton>
				    </SidebarMenuSubItem>
				</SidebarMenuSub>
			    </CollapsibleContent>
			  </SidebarMenu>
		      </SidebarGroupContent>
		</Collapsible>
	    </SidebarGroup>
	</SidebarContent>

	<SidebarFooter>
	    <ModeToggle />
	</SidebarFooter>
    </Sidebar>
  )
}


export default function Dashboard() { 
    const [pageIndex, setPageIndex] = useState(1);

    const [params, setParams] = useSearchParams({ page: "1", });	

    return (
	<SidebarProvider>
	  <AppSidebar setParams={setParams} />
	  <main className="w-full rounded-md">
	    <SidebarTrigger />

	    {params.get("page") === "1" && <Exams />}
	    {params.get("page") === "2" && <ExamPerformances />}

	    {params.get("page") === "3" && <Learning />}
	    {params.get("page") === "4" && <LearningPerformances />}
	  </main>
	</SidebarProvider>    
    )
}
