"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ActivityFeed } from "@/components/activity/activity-feed";
import { ActivityFilters } from "@/components/activity/activity-filters";

export default function ActivityPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Activity Log</h1>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search activity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <ActivityFilters />
        </div>
      </div>

      <ActivityFeed searchTerm={searchTerm} />
    </div>
  );
}