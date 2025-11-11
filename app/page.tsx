'use client'

import { useEffect, useActionState, startTransition } from "react";
import * as React from "react";
import { ClipboardPaste, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextSnippetForm from "@/components/forms/TextSnippetForm";
import { analyzeText } from "./actions/analyzeText";
import AnalysisResults from "@/components/AnalysisResults";

export default function Home() {
  const [state, formAction, pending] = useActionState(analyzeText, null);
  const [activeTab, setActiveTab] = React.useState("form");
  const previousPendingRef = React.useRef<boolean | undefined>(undefined);
  const previousResultIdRef = React.useRef<string | undefined>(undefined);

  // Switch to results tab when new results become available
  // Detects when form submission completes and results are available
  useEffect(() => {
    // Create a unique ID for the current result to detect changes
    const currentResultId = state?.result
      ? JSON.stringify(state.result.analysis)
      : undefined;

    // If we just finished submitting (pending went from true to false) and have results
    if (previousPendingRef.current && !pending && state?.result) {
      // Check if this is a new result (different from previous)
      if (currentResultId !== previousResultIdRef.current) {
        previousResultIdRef.current = currentResultId;
        startTransition(() => {
          setActiveTab("results");
        });
      }
    } else if (state?.result && currentResultId !== previousResultIdRef.current) {
      // Also handle case where result changes without pending state change
      previousResultIdRef.current = currentResultId;
      startTransition(() => {
        setActiveTab("results");
      });
    }

    previousPendingRef.current = pending;

    // Reset result ID when results are cleared
    if (!state?.result) {
      previousResultIdRef.current = undefined;
    }
  }, [state?.result, pending]);

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="l-2 relative">
        <TabsList className="grid grid-cols-2 h-12 mb-0">
          <TabsTrigger value="form" className="text-xs py-1.5 shadow-none">
            <ClipboardPaste className="size-3.5" />
            Form
          </TabsTrigger>
          <TabsTrigger value="results" disabled={!state?.result} className="text-xs py-1.5">
            <BarChart3 className="size-3.5" />
            Results
          </TabsTrigger>
        </TabsList>
        <TabsContent value="form" className="mt-0">
          <TextSnippetForm formAction={formAction} state={state} pending={pending} />
        </TabsContent>
        <TabsContent value="results" className="mt-0">
          {state?.result ? (
            <AnalysisResults result={state.result} />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No results available. Submit the form to see analysis results.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
