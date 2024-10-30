"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicInfoStepProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function BasicInfoStep({ formData, updateFormData }: BasicInfoStepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            placeholder="Enter feed name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="method">HTTP Method</Label>
          <Select
            value={formData.method}
            onValueChange={(value) => updateFormData({ method: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="PATCH">PATCH</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="webhook">Webhook URL</Label>
        <Input
          id="webhook"
          type="url"
          value={formData.webhook}
          onChange={(e) => updateFormData({ webhook: e.target.value })}
          placeholder="https://api.partner.com/webhook"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="headers">Headers</Label>
        <Textarea
          id="headers"
          value={formData.headers}
          onChange={(e) => updateFormData({ headers: e.target.value })}
          placeholder='{"Content-Type": "application/json", "Authorization": "Bearer token"}'
          className="font-mono text-sm h-20"
        />
      </div>
    </div>
  );
}