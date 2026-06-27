"use client";

import { useState } from "react";
import { Copy, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Issue } from "@/types";

export function ComplaintGenerator({ issue }: { issue: Issue }) {
  const [letter, setLetter] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    const response = await fetch("/api/ai/generate-complaint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ issue })
    });
    const data = await response.json();
    setLetter(data.letter);
    setOpen(true);
    setLoading(false);
  }

  return (
    <>
      <Button onClick={generate} disabled={loading}>
        <FileText size={18} />
        {loading ? "Generating..." : "Generate Complaint"}
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <Card className="max-h-[85vh] w-full max-w-3xl overflow-auto">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-white">Formal complaint draft</h2>
              <Button variant="ghost" onClick={() => setOpen(false)}>Close</Button>
            </div>
            <pre className="whitespace-pre-wrap rounded-md border border-border bg-background p-4 text-sm leading-6 text-text">{letter}</pre>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => navigator.clipboard.writeText(letter)}>
                <Copy size={17} /> Copy
              </Button>
              <a href={`mailto:?subject=${encodeURIComponent(issue.title)}&body=${encodeURIComponent(letter)}`}>
                <Button variant="secondary"><Mail size={17} /> Email</Button>
              </a>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
