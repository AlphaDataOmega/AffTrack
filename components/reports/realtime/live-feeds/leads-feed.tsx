"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Network, Globe, Link2, ArrowRight, User, Activity } from "lucide-react";
import { UtmTagsDisplay } from "../utm-tags";
import { OptInDisplay } from "../opt-in-display";
import { LeadActivityModal } from "../lead-activity-modal";
import { generateLeadActivities } from "@/lib/mock-data/realtime/activities";
import type { LeadItem } from "../types";

interface LeadsFeedProps {
  items: LeadItem[];
}

export function LeadsFeed({ items }: LeadsFeedProps) {
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);

  return (
    <>
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
                    Visit ID: {item.visitId.slice(0, 8)}
                  </Badge>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{item.location}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item.timestamp}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {item.leadDetails.firstName} {item.leadDetails.lastName}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">
                    {item.leadDetails.email}
                  </p>
                  <p className="text-sm text-muted-foreground ml-6">
                    {item.leadDetails.phone}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Link2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{item.source}</span>
                  </div>
                  <div className="flex flex-col gap-2 ml-6">
                    <span className="text-sm font-medium">{item.landingPage}</span>
                    <OptInDisplay optIns={item.leadDetails.optIns} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <UtmTagsDisplay utmTags={item.utmTags} />
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="gap-2"
                    onClick={() => setSelectedLead(item)}
                  >
                    <Activity className="h-4 w-4" />
                    Activity
                  </Button>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Value:</span>{" "}
                    <span className="font-medium">${item.value.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {selectedLead && (
        <LeadActivityModal
          open={!!selectedLead}
          onOpenChange={(open) => !open && setSelectedLead(null)}
          leadDetails={selectedLead.leadDetails}
          activities={generateLeadActivities(selectedLead.id)}
        />
      )}
    </>
  );
}