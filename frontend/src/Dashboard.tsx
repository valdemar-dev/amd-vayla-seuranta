import { useState, } from "react";
import { useSearchParams, } from "react-router"; 

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { User, School, Book, } from "lucide-react"

import Exams from "./Dashboard/Exams"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Students",
    pageIndex: 1,
    icon: User,
  },
  {
    title: "Exams",
    pageIndex: 2,
    icon: School,
  },
  {
    title: "Tasks",
    pageIndex: 3,
    icon: Book,
  },
]

export function AppSidebar({ setParams }) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button onClick={() => setParams({ page: item.pageIndex}) }>
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}


export default function Dashboard() { 
    const [pageIndex, setPageIndex] = useState(1);

    const [params, setParams] = useSearchParams();

    return (
	<SidebarProvider>
	  <AppSidebar setParams={setParams} />
	  <main className="w-full rounded-md">
	    <SidebarTrigger />

	    {params.get("page") === "1" && <Exams/>}
	  </main>
	</SidebarProvider>    
    )
}
