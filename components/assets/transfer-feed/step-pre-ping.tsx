"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import { TransferFeedFormData, FormDataPair } from "./types";

interface StepPrePingProps {
  formData: TransferFeedFormData;
  updateFormData: (field: keyof TransferFeedFormData, value: any) => void;
}

export function StepPrePing({ formData, updateFormData }: StepPrePingProps) {
  const updatePrePing = (field: keyof typeof formData.prePing, value: any) => {
    updateFormData("prePing", { ...formData.prePing, [field]: value });
  };

  const updateResponseMapping = (field: keyof typeof formData.prePing.responseMapping, value: any) => {
    updatePrePing("responseMapping", { ...formData.prePing.responseMapping, [field]: value });
  };

  const addUrlParam = () => {
    updatePrePing("urlParams", [...formData.prePing.urlParams, { key: "", value: "" }]);
  };

  const updateUrlParam = (index: number, field: keyof FormDataPair, value: string) => {
    const newParams = [...formData.prePing.urlParams];
    newParams[index] = { ...newParams[index], [field]: value };
    updatePrePing("urlParams", newParams);
  };

  const removeUrlParam = (index: number) => {
    const newParams = formData.prePing.urlParams.filter((_, i) => i !== index);
    updatePrePing("urlParams", newParams);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Pre-ping Validation</h3>
          <p className="text-sm text-muted-foreground">
            Validate leads before sending to the main endpoint
          </p>
        </div>
        <Switch
          checked={formData.prePing.enabled}
          onCheckedChange={(checked) => updatePrePing("enabled", checked)}
        />
      </div>

      {formData.prePing.enabled && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>HTTP Method</Label>
              <Select
                value={formData.prePing.method}
                onValueChange={(value) => updatePrePing("method", value)}
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
              <Label>Base URL</Label>
              <Input
                type="url"
                placeholder="https://api.partner.com/validate"
                value={formData.prePing.url}
                onChange={(e) => updatePrePing("url", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>URL Parameters</Label>
              <Button variant="outline" size="sm" onClick={addUrlParam}>
                <Plus className="h-4 w-4 mr-2" />
                Add Parameter
              </Button>
            </div>
            <div className="space-y-2">
              {formData.prePing.urlParams.map((param, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <Input
                      placeholder="Parameter name"
                      value={param.key}
                      onChange={(e) => updateUrlParam(index, "key", e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder="Value or {parameter}"
                      value={param.value}
                      onChange={(e) => updateUrlParam(index, "value", e.target.value)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeUrlParam(index)}
                    disabled={formData.prePing.urlParams.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Success Pattern</Label>
            <Input
              value={formData.prePing.successSearch}
              onChange={(e) => updatePrePing("successSearch", e.target.value)}
              placeholder="valid: true"
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Text to search for in the response to determine if the lead is valid
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Response ID Mapping</Label>
                <p className="text-sm text-muted-foreground">
                  Map the pre-ping response ID to the main request
                </p>
              </div>
              <Switch
                checked={formData.prePing.responseMapping.enabled}
                onCheckedChange={(checked) => updateResponseMapping("enabled", checked)}
              />
            </div>

            {formData.prePing.responseMapping.enabled && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Response ID Path</Label>
                  <Input
                    placeholder="response.data.id"
                    value={formData.prePing.responseMapping.idPath}
                    onChange={(e) => updateResponseMapping("idPath", e.target.value)}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    JSON path to the ID in the pre-ping response
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Main Request Field</Label>
                  <Input
                    placeholder="prePingId"
                    value={formData.prePing.responseMapping.requestField}
                    onChange={(e) => updateResponseMapping("requestField", e.target.value)}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    Field name to use in the main request
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}