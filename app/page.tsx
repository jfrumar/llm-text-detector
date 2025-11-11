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
  const hasSwitchedToResultsRef = React.useRef(false);

  // Switch to results tab when results become available (only once per result)
  // Using startTransition to mark this as a non-urgent UI update
  useEffect(() => {
    if (state?.result && !hasSwitchedToResultsRef.current) {
      hasSwitchedToResultsRef.current = true;
      startTransition(() => {
        setActiveTab("results");
      });
    }
    // Reset the flag when results are cleared (form is reset)
    if (!state?.result) {
      hasSwitchedToResultsRef.current = false;
    }
  }, [state?.result]);

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
