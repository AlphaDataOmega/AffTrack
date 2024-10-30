"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressSteps } from "./progress-steps";
import { StepBasicInfo } from "./step-basic-info";
import { StepPrePing } from "./step-pre-ping";
import { StepRequestConfig } from "./step-request-config";
import { StepResponsePayout } from "./step-response-payout";
import { StepConditions } from "./step-conditions";
import { StepScheduling } from "./step-scheduling";
import { StepReview } from "./step-review";
import { FORM_STEPS } from "./form-steps";
import { TransferFeedFormData } from "./types";

interface TransferFeedFormProps {
  onClose: () => void;
}

const initialFormData: TransferFeedFormData = {
  partnerId: "",
  name: "",
  method: "POST",
  webhookUrl: "",
  headers: "",
  bodyType: "json",
  jsonBody: "{\n  \n}",
  formDataPairs: [{ key: "", value: "" }],
  successSearch: "",
  payoutType: "static",
  payoutAmount: "",
  payoutPath: "",
  testMode: false,
  startDate: "",
  endDate: "",
  dayParting: {
    enabled: false,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
    startTime: "09:00",
    endTime: "17:00",
  },
  capSettings: {
    enabled: false,
    type: "daily",
    value: 100,
  },
  transferTiming: {
    enabled: false,
    type: "realtime",
  },
  conditions: [],
  prePing: {
    enabled: false,
    method: "POST",
    url: "",
    urlParams: [{ key: "", value: "" }],
    headers: "",
    bodyType: "json",
    jsonBody: "",
    formDataPairs: [{ key: "", value: "" }],
    successSearch: "",
    responseMapping: {
      enabled: false,
      idPath: "",
      requestField: "",
    },
  },
};

export function TransferFeedForm({ onClose }: TransferFeedFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<TransferFeedFormData>(initialFormData);

  const updateFormData = (field: keyof TransferFeedFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < FORM_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepBasicInfo formData={formData} updateFormData={updateFormData} />;
      case 1:
        return <StepPrePing formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <StepRequestConfig formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <StepResponsePayout formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <StepConditions formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <StepScheduling formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <StepReview formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <ProgressSteps currentStep={currentStep} />
      
      <div className="min-h-[400px]">
        {renderStep()}
      </div>

      <div className="flex justify-between pt-6 border-t">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button onClick={handleNext}>
          {currentStep === FORM_STEPS.length - 1 ? "Save" : "Next"}
        </Button>
      </div>
    </div>
  );
}