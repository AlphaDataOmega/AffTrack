"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function AdPlacementsTab() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Ad Placements</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Ad Placement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Ad Placement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter ad placement name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BANNER">Banner</SelectItem>
                    <SelectItem value="NATIVE">Native</SelectItem>
                    <SelectItem value="VIDEO">Video</SelectItem>
                    <SelectItem value="POPUP">Popup</SelectItem>
                    <SelectItem value="SOCIAL_POST">Social Post</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="placementUrl">Placement URL</Label>
                <Input 
                  id="placementUrl" 
                  type="url"
                  placeholder="https://example.com/ad-placement" 
                />
              </div>

              <div className="space-y-2">
                <Label>Target Type</Label>
                <RadioGroup defaultValue="offer" className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="offer" id="offer" />
                    <Label htmlFor="offer">Single Offer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="split-test" id="split-test" />
                    <Label htmlFor="split-test">Split Test</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target">Select Target</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select offer or split test" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="offer1">Weight Loss Program</SelectItem>
                    <SelectItem value="split1">Landing Page A/B Test</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Homepage Banner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type:</span>
                <span>Banner</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">URL:</span>
                <a 
                  href="https://example.com/homepage-banner" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View Placement
                </a>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Target:</span>
                <span className="text-primary">Landing Page A/B Test</span>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}