"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransferFeedFormData } from "./types";

interface StepBasicInfoProps {
  formData: TransferFeedFormData;
  updateFormData: (field: keyof TransferFeedFormData, value: any) => void;
}

const TRANSFER_PARTNERS = [
  { id: "maxbounty", name: "MaxBounty" },
  { id: "clickbank", name: "ClickBank" },
];

export function StepBasicInfo({ formData, updateFormData }: StepBasicInfoProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="partner">Transfer Partner</Label>
        <Select
          value={formData.partnerId}
          onValueChange={(value) => updateFormData("partnerId", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select partner" />
          </SelectTrigger>
          <SelectContent>
            {TRANSFER_PARTNERS.map((partner) => (
              <SelectItem key={partner.id} value={partner.id}>
                {partner.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Feed Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => updateFormData("name", e.target.value)}
          placeholder="Enter feed name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="method">HTTP Method</Label>
        <Select
          value={formData.method}
          onValueChange={(value) => updateFormData("method", value)}
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

      <div className="space-y-2">
        <Label htmlFor="webhookUrl">Webhook URL</Label>
        <Input
          id="webhookUrl"
          type="url"
          value={formData.webhookUrl}
          onChange={(e) => updateFormData("webhookUrl", e.target.value)}
          placeholder="https://api.partner.com/webhook"
        />
      </div>
    </div>
  );
}