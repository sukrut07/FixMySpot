import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/common/section";

export default function SignupPage() {
  return (
    <Section title="Create your FixMySpot account">
      <Card className="mx-auto max-w-md space-y-4">
        <Input placeholder="Full name" />
        <Input placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" />
        <Input placeholder="Locality" />
        <Button className="w-full">Sign up</Button>
        <p className="text-center text-sm text-muted">Already registered? <Link href="/login" className="text-orange">Login</Link></p>
      </Card>
    </Section>
  );
}
