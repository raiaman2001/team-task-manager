"use client";

import { AppShell } from "@/components/layout/app-shell";
import { CreateProjectForm } from "@/components/projects/create-project-form";
import { ProjectList } from "@/components/projects/project-list";
import { useAuth } from "@/hooks/use-auth";

export default function ProjectsPage() {
  const { data: user } = useAuth();
  const isAdmin = user?.email.toLowerCase().includes("admin") || user?.name.toLowerCase().includes("admin");

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-normal">Projects</h2>
          <p className="mt-1 text-sm text-muted-foreground">Create projects and open team workspaces.</p>
        </div>
        <div className={isAdmin ? "grid gap-6 xl:grid-cols-[360px_1fr]" : "grid gap-6"}>
          {isAdmin && <CreateProjectForm />}
          <ProjectList />
        </div>
      </div>
    </AppShell>
  );
}
