"use client";

import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import { Camera, CheckCircle2, LocateFixed, Sparkles, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { CATEGORY_LABELS, ISSUE_CATEGORIES, SEVERITIES } from "@/lib/constants";
import type { IssueCategory, Severity } from "@/types";

type AiResult = {
  category: IssueCategory;
  severity: Severity;
  title: string;
  description: string;
  confidence: number;
};

export function ReportWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [image, setImage] = useState<string>("");
  const [ai, setAi] = useState<AiResult | null>(null);
  const [form, setForm] = useState({ title: "", description: "", category: "pothole" as IssueCategory, severity: "medium" as Severity, address: "Current location", lat: "19.076", lng: "72.8777" });
  const [loading, setLoading] = useState(false);

  const dropzone = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: async ([file]) => {
      const compressed = await imageCompression(file, { maxSizeMB: 0.8, maxWidthOrHeight: 1600 });
      const reader = new FileReader();
      reader.onload = () => {
        setImage(String(reader.result));
        setStep(2);
      };
      reader.readAsDataURL(compressed);
    }
  });

  async function analyze() {
    setLoading(true);
    const response = await fetch("/api/ai/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image })
    });
    const data = (await response.json()) as AiResult;
    setAi(data);
    setForm((current) => ({ ...current, title: data.title, description: data.description, category: data.category, severity: data.severity }));
    setLoading(false);
    setStep(3);
  }

  function locate() {
    navigator.geolocation?.getCurrentPosition((position) => {
      setForm((current) => ({ ...current, lat: String(position.coords.latitude), lng: String(position.coords.longitude), address: "Pinned from browser location" }));
    });
  }

  async function submit() {
    setLoading(true);
    const response = await fetch("/api/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, image })
    });
    const data = await response.json();
    setStep(4);
    setTimeout(() => router.push(`/issues/${data.issue.id}`), 900);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 grid grid-cols-4 gap-2">
        {["Photo", "AI", "Details", "Done"].map((label, index) => (
          <div key={label} className={`rounded-md border px-3 py-2 text-center text-sm ${step >= index + 1 ? "border-orange bg-orange/10 text-orange" : "border-border text-muted"}`}>
            {label}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card>
          <div {...dropzone.getRootProps()} className="grid min-h-80 cursor-pointer place-items-center rounded-lg border-2 border-dashed border-border bg-background p-8 text-center transition hover:border-orange">
            <input {...dropzone.getInputProps()} />
            <div>
              <UploadCloud className="mx-auto mb-4 text-orange" size={44} />
              <h2 className="text-xl font-bold text-white">Upload or capture the issue</h2>
              <p className="mt-2 text-muted">Drop a photo here or choose one from your device.</p>
              <Button className="mt-5" type="button"><Camera size={18} /> Select photo</Button>
            </div>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="grid gap-6 md:grid-cols-2">
          {image && <div className="relative min-h-80 overflow-hidden rounded-lg"><Image src={image} alt="Uploaded issue" fill className="object-cover" /></div>}
          <div className="flex flex-col justify-center">
            <Sparkles className="mb-4 text-orange" size={38} />
            <h2 className="text-2xl font-bold text-white">Ready for AI analysis</h2>
            <p className="mt-2 text-muted">Gemini classifies category, severity, title, and description. Demo mode returns a realistic fallback without an API key.</p>
            <Button className="mt-6" onClick={analyze} disabled={loading}>{loading ? "Analyzing..." : "Analyze issue"}</Button>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="space-y-5">
          {ai && <p className="rounded-md border border-teal/30 bg-teal/10 p-3 text-sm text-teal">AI confidence: {Math.round(ai.confidence * 100)}%</p>}
          <div className="grid gap-4 md:grid-cols-2">
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Issue title" />
            <select className="h-11 rounded-md border border-border bg-background px-3 text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as IssueCategory })}>
              {ISSUE_CATEGORIES.map((category) => <option key={category} value={category}>{CATEGORY_LABELS[category]}</option>)}
            </select>
            <select className="h-11 rounded-md border border-border bg-background px-3 text-sm" value={form.severity} onChange={(e) => setForm({ ...form, severity: e.target.value as Severity })}>
              {SEVERITIES.map((severity) => <option key={severity} value={severity}>{severity}</option>)}
            </select>
            <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Address" />
          </div>
          <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" />
          <div className="grid gap-4 md:grid-cols-3">
            <Input value={form.lat} onChange={(e) => setForm({ ...form, lat: e.target.value })} placeholder="Latitude" />
            <Input value={form.lng} onChange={(e) => setForm({ ...form, lng: e.target.value })} placeholder="Longitude" />
            <Button type="button" variant="secondary" onClick={locate}><LocateFixed size={18} /> Use location</Button>
          </div>
          <Button onClick={submit} disabled={loading}>{loading ? "Submitting..." : "Review & submit"}</Button>
        </Card>
      )}

      {step === 4 && (
        <Card className="grid min-h-80 place-items-center text-center">
          <div>
            <CheckCircle2 className="mx-auto mb-4 text-teal" size={56} />
            <h2 className="text-2xl font-bold text-white">Issue reported</h2>
            <p className="mt-2 text-muted">Timeline entry created, XP awarded, and the community map is ready.</p>
          </div>
        </Card>
      )}
    </div>
  );
}
