import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Bot, ClipboardPaste } from "lucide-react";

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
          <form className="w-full border rounded-lg min-w-48">
            <div className="mb-5 border-b py-3 px-4">
              <div className="flex gap-2 items-center">
                <ClipboardPaste className="size-4" />
                <h2 className="font-semibold text-lg">Paste Your Text</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Enter the text you want to analyze for AI generation patterns
              </p>
            </div>

            <FieldGroup className="p-4 py-0">
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <Textarea
                      id="checkout-7j9-optional-comments"
                      placeholder="Paste your text here for AI detection analysis..."
                      className="h-64"
                    />
                  </Field>
                </FieldGroup>
              </FieldSet>
              <Field orientation="horizontal" className="pb-4">
                <Button type="submit">
                  <Bot />
                  Submit
                </Button>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </main>
      </div>
    </div>
  );
}
