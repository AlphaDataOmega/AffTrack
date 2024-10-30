"use client";

import { useState } from "react";
import { generateMockActivities } from "@/lib/mock-data/activities";
import { ActivityItem } from "./activity-item";

interface ActivityFeedProps {
  searchTerm: string;
}

export function ActivityFeed({ searchTerm }: ActivityFeedProps) {
  const [activities] = useState(() => generateMockActivities(50));

  const filteredActivities = activities.filter(activity => {
    const searchLower = searchTerm.toLowerCase();
    return (
      activity.user.name.toLowerCase().includes(searchLower) ||
      activity.action.toLowerCase().includes(searchLower) ||
      activity.target.toLowerCase().includes(searchLower) ||
      activity.details.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-4">
      {filteredActivities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
}