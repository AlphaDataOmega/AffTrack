"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Network, Globe, Link2, ArrowRight, Clock, User } from "lucide-react";
import { UtmTagsDisplay } from "../utm-tags";
import type { RealtimeVisit } from "@/lib/mock-data/realtime/visits";

interface VisitsFeedProps {
  items: RealtimeVisit[];
}

export function VisitsFeed({ items }: VisitsFeedProps) {
  if (!items?.length) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No visits to display
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px]">
      <div className="space-y-4 p-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Network className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-sm">{item.ipAddress}</span>
                <Badge variant="outline" className="ml-2 text-xs">
                  Visit ID: {item.id.slice(0, 8)}
                </Badge>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{item.location}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {item.timestamp}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {item.referrer || 'Direct Visit'}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.landingPage.name}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Path: {item.landingPage.path}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{item.sourceName}</span>
              <ArrowRight className="h-4 w-4" />
              <span>{item.landingPage.name}</span>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <UtmTagsDisplay utmTags={item.utmTags} />
              {item.leadDetails && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {item.leadDetails.firstName} {item.leadDetails.lastName}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}