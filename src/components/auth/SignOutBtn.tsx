"use client";

import { signOutAction } from "@/lib/actions/users";
import { useFormStatus } from "react-dom";

export default function SignOutBtn() {
  return (
    <form action={signOutAction} className="w-full text-left">
      <Btn />
    </form>
  );
}

const Btn = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 bg-destructive text-destructive-foreground px-2.5 py-1.5 text-sm rounded-md hover:opacity-90 disabled:opacity-50"
    >
      Sign{pending ? "ing" : ""} out
    </button>
  );
};
