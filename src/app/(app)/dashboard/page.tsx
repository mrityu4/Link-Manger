import Navbar from "@/components/Navbar";
import UserDetails from "@/components/UserDetails";
import { getLinksAndFolders } from "@/lib/api/links/queries";
import { Link } from "@/lib/db/schema/links";
import LinksGrid from "./linksGrid";
import { getUserAuth } from "@/lib/auth/utils";

export default async function Home() {
  const  session  = await getUserAuth();
  const { links, folders } = await getLinksAndFolders();
  const groupedLinks: { [key: string]: Link[] } = {};
  links.forEach((link) => {
    if (!groupedLinks[link.folderId]) {
      groupedLinks[link.folderId] = [];
    }
    groupedLinks[link.folderId].push(link);
  });


  return (
    <div>
      <LinksGrid session={session} initialFolders={folders} initialGroupedLinks={groupedLinks} />
    </div>
  );
}
