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

export default function TrackingLinksTab() {
  const [linkUrl, setLinkUrl] = useState("https://track.affiliatehub.com/abc123");
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleParameterInsert = (parameter: string) => {
    const newUrl = linkUrl.slice(0, cursorPosition) + parameter + linkUrl.slice(cursorPosition);
    setLinkUrl(newUrl);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Tracking Links</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate Link
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Generate Tracking Link</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="traffic-source">Traffic Source</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select traffic source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fb">Facebook Ads</SelectItem>
                      <SelectItem value="google">Google Ads</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="landing-page">Landing Page</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select landing page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lp1">Weight Loss LP 1</SelectItem>
                      <SelectItem value="lp2">Crypto Trading LP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Generated Link</Label>
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
                <div className="flex gap-2">
                  <Input
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    onSelect={(e) => setCursorPosition(e.currentTarget.selectionStart || 0)}
                    onClick={(e) => setCursorPosition(e.currentTarget.selectionStart || 0)}
                  />
                  <Button>Copy</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Facebook Ads → Weight Loss LP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">Tracking Link</Label>
                <div className="flex items-center gap-2">
                  <Input
                    readOnly
                    value="https://track.affiliatehub.com/abc123?firstName={firstName}&lastName={lastName}&utm_source={utm_source}"
                    className="text-sm font-mono"
                  />
                  <Button variant="outline" size="sm">
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}