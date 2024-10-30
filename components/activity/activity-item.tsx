"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  RefreshCw,
  Shield,
  Link2,
  Users,
  CircleDollarSign,
  ArrowRightLeft
} from "lucide-react";
import type { Activity } from "@/lib/mock-data/activities";

interface ActivityItemProps {
  activity: Activity;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const getActionIcon = () => {
    switch (activity.action) {
      case "created":
        return <Plus className="h-4 w-4" />;
      case "updated":
        return <Edit className="h-4 w-4" />;
      case "deleted":
        return <Trash2 className="h-4 w-4" />;
      case "configured":
        return <Settings className="h-4 w-4" />;
      case "reactivated":
        return <RefreshCw className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const getTargetIcon = () => {
    switch (activity.targetType) {
      case "user":
        return <Users className="h-4 w-4 text-muted-foreground" />;
      case "offer":
        return <CircleDollarSign className="h-4 w-4 text-muted-foreground" />;
      case "transfer":
        return <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />;
      case "tracking":
        return <Link2 className="h-4 w-4 text-muted-foreground" />;
      case "permission":
        return <Shield className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Settings className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getActionColor = () => {
    switch (activity.action) {
      case "created":
        return "bg-green-500/10 text-green-500";
      case "updated":
        return "bg-blue-500/10 text-blue-500";
      case "deleted":
        return "bg-red-500/10 text-red-500";
      case "configured":
        return "bg-yellow-500/10 text-yellow-500";
      case "reactivated":
        return "bg-purple-500/10 text-purple-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              {getTargetIcon()}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{activity.user.name}</span>
                <Badge variant="outline" className={getActionColor()}>
                  {getActionIcon()}
                  <span className="ml-1 capitalize">{activity.action}</span>
                </Badge>
                <span className="text-muted-foreground">{activity.target}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {activity.details}
              </p>
            </div>
          </div>
          <span className="text-sm text-muted-foreground">
            {activity.timestamp}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}