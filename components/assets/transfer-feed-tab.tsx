"use client";

import { useState } from "react";
import { Plus, Clock, Target, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { TransferFeedForm } from "./transfer-feed/transfer-feed-form";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function TransferFeedTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Transfer Feed</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Transfer Feed
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Add New Transfer Feed</DialogTitle>
            </DialogHeader>
            <TransferFeedForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Weight Loss Campaign Feed</CardTitle>
              <Switch defaultChecked />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Partner</p>
                  <p className="font-medium">MaxBounty</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payout</p>
                  <p className="font-medium">$45.00 CPA</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Scheduling</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Mon-Fri</Badge>
                  <Badge variant="outline">9:00 AM - 5:00 PM</Badge>
                  <Badge variant="outline">Aged 30 Days</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Caps</span>
                </div>
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                  Daily Cap: 100 transfers
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Conditions</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Age > 18</Badge>
                  <Badge variant="outline">US Traffic Only</Badge>
                  <Badge variant="outline">Mobile Phone</Badge>
                </div>
              </div>

              <div className="flex justify-end">
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