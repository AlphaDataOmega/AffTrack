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
import { Textarea } from "@/components/ui/textarea";

export default function TrafficSourcesTab() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Traffic Sources</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Traffic Source
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Traffic Source</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter traffic source name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SOCIAL_MEDIA">Social Media</SelectItem>
                    <SelectItem value="SEARCH_ENGINE">Search Engine</SelectItem>
                    <SelectItem value="EMAIL">Email</SelectItem>
                    <SelectItem value="DISPLAY_ADS">Display Ads</SelectItem>
                    <SelectItem value="NATIVE_ADS">Native Ads</SelectItem>
                    <SelectItem value="PUSH_NOTIFICATIONS">Push Notifications</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter description"
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example Traffic Source Cards */}
        <Card>
          <CardHeader>
            <CardTitle>Facebook Ads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Social media advertising platform for targeted campaigns
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                Social Media
              </span>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}