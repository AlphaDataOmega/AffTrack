"use client";

import { Plus, Globe, Eye, EyeOff } from "lucide-react";
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
import { useState } from "react";

export default function TransferPartnersTab() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Transfer Partners</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Partner
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Transfer Partner</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Partner Name</Label>
                <Input id="name" placeholder="Enter partner name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Enter partner description" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website URL</Label>
                <Input 
                  id="website" 
                  type="url" 
                  placeholder="https://partner.com" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Enter username" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>MaxBounty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Performance marketing network for affiliates and advertisers
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Website:</span>
                <a 
                  href="https://maxbounty.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  maxbounty.com
                </a>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Username:</span>
                <span>affiliateuser1</span>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ClickBank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Digital marketplace and affiliate platform
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Website:</span>
                <a 
                  href="https://clickbank.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  clickbank.com
                </a>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Username:</span>
                <span>cbaffiliate2</span>
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