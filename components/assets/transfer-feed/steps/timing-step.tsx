"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface TimingStepProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function TimingStep({ formData, updateFormData }: TimingStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Transfer Timing</Label>
        <RadioGroup
          value={formData.transferTiming}
          onValueChange={(value) => updateFormData({ transferTiming: value })}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 bg-muted p-3 rounded-lg">
            <RadioGroupItem value="realtime" id="realtime" />
            <Label htmlFor="realtime">Real-time</Label>
          </div>
          <div className="flex items-center space-x-2 bg-muted p-3 rounded-lg">
            <RadioGroupItem value="aged" id="aged" />
            <Label htmlFor="aged">Aged Leads</Label>
          </div>
        </RadioGroup>

        {formData.transferTiming === "aged" && (
          <div className="space-y-2">
            <Label>Aging Period</Label>
            <Select
              value={formData.agingPeriod}
              onValueChange={(value) => updateFormData({ agingPeriod: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select aging period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 Days</SelectItem>
                <SelectItem value="60">60 Days</SelectItem>
                <SelectItem value="90">90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="transferCaps">Transfer Caps</Label>
          <Switch
            id="transferCaps"
            checked={formData.transferCaps.enabled}
            onCheckedChange={(checked) => 
              updateFormData({ 
                transferCaps: { 
                  ...formData.transferCaps, 
                  enabled: checked 
                } 
              })
            }
          />
        </div>

        {formData.transferCaps.enabled && (
          <div className="space-y-4">
            <Select
              value={formData.transferCaps.type}
              onValueChange={(value) => 
                updateFormData({ 
                  transferCaps: { 
                    ...formData.transferCaps, 
                    type: value 
                  } 
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select cap type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Enter limit"
                value={formData.transferCaps.limit}
                onChange={(e) => 
                  updateFormData({ 
                    transferCaps: { 
                      ...formData.transferCaps, 
                      limit: e.target.value 
                    } 
                  })
                }
              />
              <span className="text-sm text-muted-foreground">transfers</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}