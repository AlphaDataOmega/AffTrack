"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Trash2, Link2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

const AVAILABLE_PARAMETERS = [
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
  { label: "UTM Source", value: "{utm_source}" },
  { label: "UTM Medium", value: "{utm_medium}" },
  { label: "UTM Campaign", value: "{utm_campaign}" },
  { label: "UTM Term", value: "{utm_term}" },
  { label: "UTM Content", value: "{utm_content}" },
];

interface RequestBodyStepProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export function RequestBodyStep({ formData, updateFormData }: RequestBodyStepProps) {
  const handleParameterInsert = (parameter: string) => {
    if (formData.bodyType === "json") {
      const textArea = document.getElementById("jsonBody") as HTMLTextAreaElement;
      const cursorPos = textArea?.selectionStart || 0;
      const newBody = formData.jsonBody.slice(0, cursorPos) + parameter + formData.jsonBody.slice(cursorPos);
      updateFormData({ jsonBody: newBody });
    }
  };

  const addFormDataField = () => {
    updateFormData({
      formData: [...formData.formData, { key: "", value: "" }],
    });
  };

  const updateFormDataField = (index: number, field: "key" | "value", value: string) => {
    const newFormData = [...formData.formData];
    newFormData[index][field] = value;
    updateFormData({ formData: newFormData });
  };

  const removeFormDataField = (index: number) => {
    const newFormData = formData.formData.filter((_: any, i: number) => i !== index);
    updateFormData({ formData: newFormData });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Request Body Type</Label>
        <RadioGroup
          value={formData.bodyType}
          onValueChange={(value) => updateFormData({ bodyType: value })}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 bg-muted p-3 rounded-lg">
            <RadioGroupItem value="json" id="json" />
            <Label htmlFor="json">JSON</Label>
          </div>
          <div className="flex items-center space-x-2 bg-muted p-3 rounded-lg">
            <RadioGroupItem value="formData" id="formData" />
            <Label htmlFor="formData">Form Data</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.bodyType === "json" ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>JSON Body</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Link2 className="h-4 w-4 mr-2" />
                  Insert Parameter
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" side="left" className="w-64">
                <ScrollArea className="h-[300px]">
                  <div className="space-y-1 p-1">
                    {AVAILABLE_PARAMETERS.map((param) => (
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
                </ScrollArea>
              </PopoverContent>
            </Popover>
          </div>
          <Textarea
            id="jsonBody"
            value={formData.jsonBody}
            onChange={(e) => updateFormData({ jsonBody: e.target.value })}
            className="font-mono text-sm min-h-[200px]"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Form Data Fields</Label>
            <Button variant="outline" size="sm" onClick={addFormDataField}>
              <Plus className="h-4 w-4 mr-2" />
              Add Field
            </Button>
          </div>
          <div className="space-y-2">
            {formData.formData.map((field: any, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Key"
                  value={field.key}
                  onChange={(e) => updateFormDataField(index, "key", e.target.value)}
                />
                <Input
                  placeholder="Value"
                  value={field.value}
                  onChange={(e) => updateFormDataField(index, "value", e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFormDataField(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="successSearch">Success Response Search</Label>
        <Input
          id="successSearch"
          value={formData.successSearch}
          onChange={(e) => updateFormData({ successSearch: e.target.value })}
          placeholder="success: true"
          className="font-mono"
        />
        <p className="text-xs text-muted-foreground">
          Text to search for in the response to determine success
        </p>
      </div>
    </div>
  );
}