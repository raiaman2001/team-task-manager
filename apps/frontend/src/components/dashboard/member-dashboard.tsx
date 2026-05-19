"use client";

import { CheckCircle2, Clock3, ListTodo } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getDashboard } from "@/lib/queries";
import { useAuth } from "@/hooks/use-auth";

export function MemberDashboard() {
  const { data: user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard
  });

  if (isLoading || !data) {
    return <Skeleton className="h-96 w-full" />;
  }

  // Find user's tasks count from tasksPerUser
  const myTasksCount = data.tasksPerUser.find((t) => t.user?.id === user?.id)?.total || 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-normal">Welcome, {user?.name}</h2>
        <p className="mt-1 text-sm text-muted-foreground">Here is a quick overview of your workspace.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard label="Your Assigned Tasks" value={myTasksCount} icon={ListTodo} />
        <MetricCard label="Team In Progress" value={data.tasksByStatus.IN_PROGRESS} icon={Clock3} />
        <MetricCard label="Team Completed" value={data.tasksByStatus.DONE} icon={CheckCircle2} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Workspace Status</CardTitle>
          <CardDescription>Keep track of what&apos;s happening around you.</CardDescription>
        </CardHeader>
        <CardContent>
          {myTasksCount > 0 ? (
            <p className="text-sm">You have {myTasksCount} tasks assigned to you across projects. Head over to the Projects section to manage them.</p>
          ) : (
            <p className="text-sm text-muted-foreground">You currently have no tasks assigned to you.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
