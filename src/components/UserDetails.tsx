import { AuthSession } from "@/lib/auth/utils";
import Link from "next/link";

const UserDetails = ({ session }: { session: AuthSession }) => {
    if (session.session === null) return null;
    const { user } = session.session;

    if (!user?.name || user.name.length == 0) return null;

    return (
        <Link href="/account">
            <div className="flex items-center justify-between   border-border pt-4 px-4">
                <div className="text-muted-foreground">
                    <p className="text-xs">{user.name ?? ""}</p>
                    <p className="text-xs font-light pr-4">
                        {user.email ?? ""}
                    </p>
                </div>
                <div className="p-1.5 rounded-full border-border border-2 text-muted-foreground">
                    {user.name
                        ? user.name
                            ?.split(" ")
                            .map((word) => word[0].toUpperCase())
                            .join("")
                        : "~"}
                </div>
            </div>
        </Link>
    );
};

export default UserDetails;