export const runtime = "edge";

import SignOutBtn from "@/components/auth/SignOutBtn";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import UserSettings from "./UserSettings";

export default async function Account() {
  await checkAuth();
  const { session } = await getUserAuth();

  return (
    <main className="mx-20">
      <h1 className="text-2xl font-semibold my-4">Account</h1>
      <div className="space-y-4 ">
        <UserSettings session={session} />
      </div>
      <SignOutBtn />
    </main>
  );
}
