import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Code } from "lucide-react";
import { TransferFeedFormData } from "./types";

interface StepReviewProps {
  formData: TransferFeedFormData;
  updateFormData: (field: keyof TransferFeedFormData, value: any) => void;
}

export function StepReview({ formData, updateFormData }: StepReviewProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-muted-foreground">Feed Name</Label>
            <p className="font-medium">{formData.name}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">HTTP Method</Label>
            <p className="font-medium">{formData.method}</p>
          </div>
        </div>
        <div>
          <Label className="text-muted-foreground">Webhook URL</Label>
          <p className="font-medium">{formData.webhookUrl}</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Headers</Label>
          <pre className="text-sm font-mono bg-muted p-2 rounded-md">
            {formData.headers}
          </pre>
        </div>
        <div>
          <Label className="text-muted-foreground">Request Body ({formData.bodyType})</Label>
          <pre className="text-sm font-mono bg-muted p-2 rounded-md">
            {formData.bodyType === "json"
              ? formData.jsonBody
              : formData.formDataPairs.map(pair => `${pair.key}: ${pair.value}`).join('\n')}
          </pre>
        </div>
        <div>
          <Label className="text-muted-foreground">Success Pattern</Label>
          <p className="font-mono">{formData.successSearch}</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Payout</Label>
          <p className="font-medium">
            {formData.payoutType === "static"
              ? `$${formData.payoutAmount} (Static)`
              : `Dynamic: ${formData.payoutPath}`}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 bg-muted p-3 rounded-lg">
        <Switch
          id="test-mode"
          checked={formData.testMode}
          onCheckedChange={(checked) => updateFormData("testMode", checked)}
        />
        <Label htmlFor="test-mode">Enable Test Mode</Label>
      </div>

      <Button
        className="w-full"
        onClick={() => {
          console.log("Testing webhook...");
        }}
      >
        <Code className="h-4 w-4 mr-2" />
        Test Webhook
      </Button>
    </div>
  );
}