"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { WalkthroughProgress } from "@/components/Walkthrough/WalkthroughProgress";
import { DescribeStep } from "@/components/Walkthrough/DescribeStep";
import { BlueprintStep } from "@/components/Walkthrough/BlueprintStep";
import { QualityGateStep } from "@/components/Walkthrough/QualityGateStep";
import { CompilerStep } from "@/components/Walkthrough/CompilerStep";
import { PreviewStep } from "@/components/Walkthrough/PreviewStep";
import { DeployStep } from "@/components/Walkthrough/DeployStep";

const STEPS = [DescribeStep, BlueprintStep, QualityGateStep, CompilerStep, PreviewStep, DeployStep];
const LAST_STEP = STEPS.length - 1;

export function WalkthroughContainer() {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setStep((s) => Math.min(s + 1, LAST_STEP));
      if (e.key === "ArrowLeft") setStep((s) => Math.max(s - 1, 0));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [started]);

  if (!started) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <p className="text-muted">
          Six steps, about a minute — see what happens between your idea and the software.
        </p>
        <div className="mt-6">
          <Button onClick={() => setStarted(true)}>Start the walkthrough</Button>
        </div>
      </div>
    );
  }

  const StepComponent = STEPS[step];

  return (
    <div>
      <WalkthroughProgress step={step} />

      <div key={step} className="min-h-[22rem]">
        <StepComponent />
      </div>

      <div className="mx-auto mt-10 flex max-w-lg items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => Math.max(s - 1, 0))}
          disabled={step === 0}
          className="px-2 disabled:opacity-0"
        >
          Back
        </Button>

        <button
          onClick={() => {
            setStarted(false);
            setStep(0);
          }}
          className="text-xs text-muted hover:text-fg"
        >
          {step === LAST_STEP ? "Restart" : "Skip walkthrough"}
        </button>

        {step < LAST_STEP ? (
          <Button variant="secondary" onClick={() => setStep((s) => Math.min(s + 1, LAST_STEP))}>
            Continue
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={() => {
              setStarted(false);
              setStep(0);
            }}
          >
            Restart
          </Button>
        )}
      </div>
    </div>
  );
}
