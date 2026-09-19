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
      if (e.key === "Escape") {
        setStarted(false);
        setStep(0);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [started]);

  if (!started) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <p className="text-muted">
          See how your plain-English idea becomes real software — 6 simple steps, about a minute.
        </p>
        <div className="mt-4 flex justify-center gap-2 font-mono text-xs text-muted">
          <span className="rounded-full border border-line bg-raised px-2 py-1">1 Describe</span>
          <span className="rounded-full border border-line bg-raised px-2 py-1">→ Blueprint</span>
          <span className="rounded-full border border-line bg-raised px-2 py-1">→ App</span>
        </div>
        <div className="mt-6">
          <Button onClick={() => setStarted(true)}>Start the walkthrough</Button>
        </div>
        <p className="mt-3 font-mono text-xs text-muted">No signup needed</p>
      </div>
    );
  }

  const StepComponent = STEPS[step];

  return (
    <div>
      <WalkthroughProgress step={step} />

      <div key={step} className="min-h-[320px]">
        <StepComponent />
      </div>

      <div className="mx-auto mt-10 flex max-w-lg items-center justify-between gap-2">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => Math.max(s - 1, 0))}
          disabled={step === 0}
          aria-label="Previous step"
          className="px-3 disabled:pointer-events-none disabled:opacity-30"
        >
          Back
        </Button>

        <button
          onClick={() => {
            setStarted(false);
            setStep(0);
          }}
          className="rounded-md px-3 py-2 text-xs text-muted hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {step === LAST_STEP ? "Restart" : "Skip walkthrough"}
        </button>

        {step < LAST_STEP ? (
          <Button onClick={() => setStep((s) => Math.min(s + 1, LAST_STEP))} aria-label="Next step">
            Continue
          </Button>
        ) : (
          <Button
            onClick={() => {
              document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Join the waitlist"
          >
            Join the waitlist
          </Button>
        )}
      </div>
    </div>
  );
}
