"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { TransferFeedFormData, TransferCondition } from "./types";

interface StepConditionsProps {
  formData: TransferFeedFormData;
  updateFormData: (field: keyof TransferFeedFormData, value: any) => void;
}

const CONDITION_FIELDS = [
  { label: "Age", value: "age" },
  { label: "Email Domain", value: "email_domain" },
  { label: "Phone Type", value: "phone_type" },
  { label: "State", value: "state" },
  { label: "Opt-in Status", value: "optin_status" },
  { label: "IP Country", value: "ip_country" },
  { label: "Custom Field", value: "custom" },
];

const OPERATORS = [
  { label: "Equals", value: "equals" },
  { label: "Does Not Equal", value: "not_equals" },
  { label: "Greater Than", value: "greater_than" },
  { label: "Less Than", value: "less_than" },
  { label: "Contains", value: "contains" },
  { label: "Does Not Contain", value: "not_contains" },
  { label: "Matches Pattern", value: "matches" },
  { label: "Does Not Match Pattern", value: "not_matches" },
];

export function StepConditions({ formData, updateFormData }: StepConditionsProps) {
  const addCondition = () => {
    const newCondition: TransferCondition = {
      field: "",
      operator: "equals",
      value: "",
    };
    updateFormData("conditions", [...(formData.conditions || []), newCondition]);
  };

  const updateCondition = (index: number, field: keyof TransferCondition, value: string) => {
    const newConditions = [...(formData.conditions || [])];
    newConditions[index] = { ...newConditions[index], [field]: value };
    updateFormData("conditions", newConditions);
  };

  const removeCondition = (index: number) => {
    const newConditions = formData.conditions?.filter((_, i) => i !== index);
    updateFormData("conditions", newConditions);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Transfer Conditions</h3>
          <p className="text-sm text-muted-foreground">
            Define rules that must be met for a transfer to be accepted
          </p>
        </div>
        <Button onClick={addCondition}>
          <Plus className="h-4 w-4 mr-2" />
          Add Condition
        </Button>
      </div>

      <div className="space-y-4">
        {formData.conditions?.map((condition, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr,2fr,3fr,auto] gap-4 items-start bg-muted/50 p-4 rounded-lg"
          >
            <div className="space-y-2">
              <Label>Field</Label>
              <Select
                value={condition.field}
                onValueChange={(value) => updateCondition(index, "field", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select field" />
                </SelectTrigger>
                <SelectContent>
                  {CONDITION_FIELDS.map((field) => (
                    <SelectItem key={field.value} value={field.value}>
                      {field.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Operator</Label>
              <Select
                value={condition.operator}
                onValueChange={(value: TransferCondition["operator"]) => 
                  updateCondition(index, "operator", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select operator" />
                </SelectTrigger>
                <SelectContent>
                  {OPERATORS.map((op) => (
                    <SelectItem key={op.value} value={op.value}>
                      {op.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Value</Label>
              <Input
                value={condition.value}
                onChange={(e) => updateCondition(index, "value", e.target.value)}
                placeholder={getValuePlaceholder(condition.field)}
              />
              {getValueHint(condition.field) && (
                <p className="text-xs text-muted-foreground">
                  {getValueHint(condition.field)}
                </p>
              )}
            </div>

            <div className="pt-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCondition(index)}
                disabled={formData.conditions?.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {(!formData.conditions || formData.conditions.length === 0) && (
          <div className="text-center py-8 text-muted-foreground">
            No conditions defined. Transfers will be accepted without qualification.
          </div>
        )}
      </div>
    </div>
  );
}

function getValuePlaceholder(field: string): string {
  switch (field) {
    case "age":
      return "e.g., 18";
    case "email_domain":
      return "e.g., gmail.com";
    case "phone_type":
      return "e.g., mobile";
    case "state":
      return "e.g., CA";
    case "optin_status":
      return "e.g., true";
    case "ip_country":
      return "e.g., US";
    case "custom":
      return "Enter value";
    default:
      return "";
  }
}

function getValueHint(field: string): string {
  switch (field) {
    case "age":
      return "Enter numeric age value";
    case "email_domain":
      return "Domain name without @";
    case "phone_type":
      return "mobile, landline, or voip";
    case "state":
      return "Two-letter state code";
    case "optin_status":
      return "true or false";
    case "ip_country":
      return "Two-letter country code";
    default:
      return "";
  }
}