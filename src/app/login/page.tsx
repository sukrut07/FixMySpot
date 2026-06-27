"use client";

import Link from "next/link";
import { Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/common/section";
import { createClient } from "@/lib/supabase-client";

export default function LoginPage() {
  async function googleLogin() {
    const supabase = createClient();
    if (!supabase) return alert("Add Supabase env vars to enable OAuth.");
    await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${location.origin}/auth/callback` } });
  }
  return (
    <Section title="Welcome back">
      <Card className="mx-auto max-w-md space-y-4">
        <Input placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" />
        <Button className="w-full">Login</Button>
        <Button className="w-full" variant="secondary" onClick={googleLogin}><Chrome size={18} /> Continue with Google</Button>
        <p className="text-center text-sm text-muted">New here? <Link href="/signup" className="text-orange">Create an account</Link></p>
      </Card>
    </Section>
  );
}
