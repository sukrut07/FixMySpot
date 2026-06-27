"use client";

import { useState, useTransition } from "react";
import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UpvoteButton({ issueId, initialCount }: { issueId: string; initialCount: number }) {
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [pending, startTransition] = useTransition();

  function toggle() {
    setActive((value) => !value);
    setCount((value) => value + (active ? -1 : 1));
    startTransition(async () => {
      await fetch(`/api/issues/${issueId}/upvote`, { method: "POST" });
    });
  }

  return (
    <Button onClick={toggle} disabled={pending} variant={active ? "primary" : "secondary"}>
      <ThumbsUp size={18} />
      {count}
    </Button>
  );
}
