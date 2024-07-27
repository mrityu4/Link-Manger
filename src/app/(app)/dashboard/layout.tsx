import { getUserAuth } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserAuth();
  if (!session?.session) redirect("/sign-in");

  return (
    <main>
      {children}
    </main>)
}


