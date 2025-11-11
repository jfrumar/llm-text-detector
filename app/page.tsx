'use client'

import { useActionState } from "react";
import TextSnippetForm from "@/components/forms/TextSnippetForm";
import { analyzeText } from "./actions/analyzeText";
import AnalysisResults from "@/components/AnalysisResults";

export default function Home() {
  const [state, formAction, pending] = useActionState(analyzeText, null);

  return (
    <div className="w-full">
      <TextSnippetForm formAction={formAction} state={state} pending={pending} />
      {state?.result && <AnalysisResults result={state.result} />}
    </div>

  );
}
