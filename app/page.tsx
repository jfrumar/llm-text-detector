import TextSnippetForm from "@/components/forms/TextSnippetForm";
import { analyzeText } from "./actions/analyzeText";

export default function Home() {



  return (
    <div className="min-w-68">
      <header className="w-full bg-sky-100 py-2 px-4 bg-linear-to-b
      from-slate-100 to-slate-200  border-b-slate-200 border-b-2 dark:bg-slate-900">
        <h1 className="font-bold text-lg/5">LLM Text Detector</h1>
        <h3 className="text-xs/5">Identify AI-generated content</h3>
      </header>

      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col justify-between  mt-10 px-16 bg-white dark:bg-black items-start">
          <TextSnippetForm action={analyzeText} />
        </main>
      </div>
    </div>
  );
}
