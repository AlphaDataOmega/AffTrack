"use client";

import { Plus, Link as LinkIcon } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const PARAMETERS = [
  { label: "First Name", value: "{firstName}" },
  { label: "Last Name", value: "{lastName}" },
  { label: "Email", value: "{email}" },
  { label: "Phone", value: "{phone}" },
  { label: "Address", value: "{address}" },
  { label: "City", value: "{city}" },
  { label: "State", value: "{state}" },
  { label: "Zip Code", value: "{zipcode}" },
  { label: "Birth Month", value: "{dob_mm}" },
  { label: "Birth Day", value: "{dob_dd}" },
  { label: "Birth Year", value: "{dob_yyyy}" },
];

const UTM_PARAMETERS = [
  { label: "UTM Source", value: "{utm_source}" },
  { label: "UTM Medium", value: "{utm_medium}" },
  { label: "UTM Campaign", value: "{utm_campaign}" },
  { label: "UTM Term", value: "{utm_term}" },
  { label: "UTM Content", value: "{utm_content}" },
];

export default function OffersTab() {
  const [offerUrl, setOfferUrl] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleParameterInsert = (parameter: string) => {
    const newUrl = offerUrl.slice(0, cursorPosition) + parameter + offerUrl.slice(cursorPosition);
    setOfferUrl(newUrl);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Affiliate Offers</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Offer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Affiliate Offer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Offer Name</Label>
                <Input id="name" placeholder="Enter offer name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="network">Network</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clickbank">ClickBank</SelectItem>
                    <SelectItem value="maxbounty">MaxBounty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payout">Payout Amount</Label>
                  <Input id="payout" type="number" step="0.01" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payoutType">Payout Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CPA">CPA</SelectItem>
                      <SelectItem value="CPC">CPC</SelectItem>
                      <SelectItem value="CPL">CPL</SelectItem>
                      <SelectItem value="REVSHARE">Revenue Share</SelectItem>
                      <SelectItem value="FIXED">Fixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="url">Offer URL</Label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          <LinkIcon className="h-4 w-4 mr-2" />
                          Lead Parameters
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56" align="end">
                        <div className="space-y-1">
                          {PARAMETERS.map((param) => (
                            <Button
                              key={param.value}
                              variant="ghost"
                              className="w-full justify-start text-left"
                              onClick={() => handleParameterInsert(param.value)}
                            >
                              {param.label}
                            </Button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          <LinkIcon className="h-4 w-4 mr-2" />
                          UTM Parameters
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56" align="end">
                        <div className="space-y-1">
                          {UTM_PARAMETERS.map((param) => (
                            <Button
                              key={param.value}
                              variant="ghost"
                              className="w-full justify-start text-left"
                              onClick={() => handleParameterInsert(param.value)}
                            >
                              {param.label}
                            </Button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <Input
                  id="url"
                  value={offerUrl}
                  onChange={(e) => setOfferUrl(e.target.value)}
                  onSelect={(e) => setCursorPosition(e.currentTarget.selectionStart || 0)}
                  onClick={(e) => setCursorPosition(e.currentTarget.selectionStart || 0)}
                  placeholder="https://example.com/offer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter offer description"
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Weight Loss Program</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              30-day weight loss program with meal plans and workout routines
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Network:</span>
                <span>ClickBank</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payout:</span>
                <span className="font-medium text-primary">$45.00 CPA</span>
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