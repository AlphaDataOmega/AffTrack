"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { useState } from "react";

const ACTIONS = [
  { label: "Created", value: "created" },
  { label: "Updated", value: "updated" },
  { label: "Deleted", value: "deleted" },
  { label: "Configured", value: "configured" },
  { label: "Reactivated", value: "reactivated" },
];

const TYPES = [
  { label: "Users", value: "user" },
  { label: "Offers", value: "offer" },
  { label: "Transfers", value: "transfer" },
  { label: "Tracking", value: "tracking" },
  { label: "Permissions", value: "permission" },
];

export function ActivityFilters() {
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Filter by Action</DropdownMenuLabel>
        {ACTIONS.map((action) => (
          <DropdownMenuCheckboxItem
            key={action.value}
            checked={selectedActions.includes(action.value)}
            onCheckedChange={(checked) => {
              setSelectedActions(
                checked
                  ? [...selectedActions, action.value]
                  : selectedActions.filter((a) => a !== action.value)
              );
            }}
          >
            {action.label}
          </DropdownMenuCheckboxItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
        {TYPES.map((type) => (
          <DropdownMenuCheckboxItem
            key={type.value}
            checked={selectedTypes.includes(type.value)}
            onCheckedChange={(checked) => {
              setSelectedTypes(
                checked
                  ? [...selectedTypes, type.value]
                  : selectedTypes.filter((t) => t !== type.value)
              );
            }}
          >
            {type.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}