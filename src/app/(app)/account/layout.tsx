
import { getUserAuth } from "@/lib/auth/utils";
import Link from "next/link";

export default async function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getUserAuth();
    if (session.session === null) return null;

    return (
        <main>
            <div className="flex overflow-y-auto border-b w-full">
                <nav>
                    <Link href="/dashboard">
                        <div className="flex items-center justify-between  border-t border-border pt-4 px-8">
                            <div className="p-1.5 flex   text-muted-foreground">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                DashBorad
                            </div>
                        </div>
                    </Link>
                </nav>
            </div>
            {children}
        </main>)
}


