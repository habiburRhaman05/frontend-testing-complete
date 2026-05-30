"use client";
import { AssetDashboard } from "@/components/AssetDashboard";
import { ProductBadge } from "@/components/ProductBadge";
import { TaskManager } from "@/components/TaskManager";
import { useState } from "react";

export default function Home() {

  const [totalTask,setTotalTask] = useState(1);

  const updatedTasksCount = (count:number)=>{
    setTotalTask(count)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-neutral-400">
      {/* <ProductBadge stock={10} tags={["shirt", "men-shirt"]} discount={20} /> */}
     {/* total task:{totalTask}
      <TaskManager
        initialTasks={[
          {
            id: "qyiqw18962312",
            title: "new title",
            completed: false
          }
        ]}
        onTaskCountChange={updatedTasksCount}
      /> */}
      <AssetDashboard/>
    </main>
  )
}
