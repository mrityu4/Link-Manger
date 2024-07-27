"use client";
import FolderModal from "@/components/FolderModal";
import LinkModal from "@/components/LinkModal";
import Navbar from "@/components/Navbar";
import ThreeDotIcon from "@/components/ThreeDotMenu";
import UserDetails from "@/components/UserDetails";
import { createFolderAction, updateFolderAction } from "@/lib/actions/folders";
import { createLinkAction, updateLinkAction } from "@/lib/actions/links";
import { AuthSession } from "@/lib/auth/utils";
import { Folder } from "@/lib/db/schema/folders";
import { Link } from "@/lib/db/schema/links";


import { useState } from 'react';

const LinksGrid = ({ initialFolders, initialGroupedLinks, session }: {
    initialFolders: Folder[],
    session: AuthSession,
    initialGroupedLinks: { [key: string]: Link[] }
}) => {
    const [folders, setFolders] = useState(initialFolders);
    const [groupedLinks, setGroupedLinks] = useState<{ [key: string]: Link[] }>(initialGroupedLinks);
    const [openFolders, setOpenFolders] = useState<{ [key: string]: boolean }>({});
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
    const [modalData, setModalData] =
        useState<Link | Folder | undefined>(undefined);
    const [isEditingFolder, setIsEditingFolder] = useState(false);

    const toggleFolder = (folderId: string) => {
        setOpenFolders((prevState) => ({
            ...prevState,
            [folderId]: !prevState[folderId],
        }));
    };

    const handleAddLink = () => {
        setModalData(undefined);
        setIsLinkModalOpen(true);
    };

    const handleEditLink = (link: Link) => {
        setModalData(link);
        setIsLinkModalOpen(true);
    };

    const handleAddFolder = () => {
        setModalData(undefined);
        setIsEditingFolder(false);
        setIsFolderModalOpen(true);
    };

    const handleEditFolder = (folder: Folder) => {
        setModalData(folder);
        setIsEditingFolder(true);
        setIsFolderModalOpen(true);
    };

    const handleSubmitLink = async (data: Link) => {
        const { title, url, folderId } = data;
        if (modalData && modalData.id) {
            const updatedLink = await updateLinkAction({ id: modalData.id, title, url, folderId })
            if (typeof updatedLink !== 'string') {
                setGroupedLinks((prev) => ({
                    ...prev,
                    [folderId]: prev[folderId].map((link) =>
                        link.id === modalData.id ? { ...link, title, url } : link
                    ),
                }));
            }
        } else {

            const newLink = await createLinkAction({ title, url, folderId })
            if (typeof newLink !== 'string') {
                setGroupedLinks((prev) => ({
                    ...prev,
                    [folderId]: [...(prev[folderId] || []), newLink.link],
                }));
            }

        }
        setIsLinkModalOpen(false);
    };

    const handleSubmitFolder = async (data: { name: string, id: string }) => {
        const { name, id } = data;
        if (id) {
            const updatedFolder = await updateFolderAction({ id, name });
            if (typeof updatedFolder !== 'string') {
                setFolders((prev) =>
                    prev.map((folder) => (folder.id === id ? { ...folder, name } : folder))
                );
            }

        } else {

            const newFolder = await createFolderAction({ name, });
            if (typeof newFolder !== 'string') {
                setFolders((prev) => [...prev, newFolder.folder]);
                setGroupedLinks((prev) => ({ ...prev, [newFolder.folder.id]: [] }));
            }
            //handle error
        }
        setIsFolderModalOpen(false);
    };

    return (
        <div>
            <div className="flex overflow-y-auto border-b w-full h-full mb-4">
                <UserDetails session={session} />
                <Navbar handleAddLink={handleAddLink} handleAddFolder={handleAddFolder} />
            </div>
            {folders.map((folder) => (
                <div key={folder.id} className="mb-4 bg-gray-700 p-2 w-11/12 md:w-4/5 mx-auto rounded  ">
                    <div className="inline items-center justify-between">
                        <div className="btn" >
                            <h2
                                className="text-lg font-bold cursor-pointer"
                                onClick={() => toggleFolder(folder.id)}
                            >
                                {folder.name}
                            </h2>
                            <button
                                // className="btn"
                                onClick={() => handleEditFolder(folder)}
                            >
                                <ThreeDotIcon />
                            </button>
                        </div>

                    </div>
                    <ul
                        className={`  overflow-hidden transition-max-height duration-300 ${openFolders[folder.id] ? 'max-h-screen p-2' : 'max-h-0'
                            }`}
                    >
                        {groupedLinks[folder.id]?.map((link) => (
                            <li key={link.id} className="btn btn-neutral ml-2">
                                <a href={link.url} className="hover:underline">
                                    {link.title}
                                </a>
                                <button
                                    // className="btn"
                                    onClick={() => handleEditLink({ ...link, folderId: folder.id })}
                                >
                                    <ThreeDotIcon />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <LinkModal
                isOpen={isLinkModalOpen}
                onClose={() => setIsLinkModalOpen(false)}
                folders={folders}
                onSubmit={handleSubmitLink}
                initialData={modalData}
            />
            <FolderModal
                isOpen={isFolderModalOpen}
                onClose={() => setIsFolderModalOpen(false)}
                onSubmit={handleSubmitFolder}
                initialData={modalData}
            />
        </div>
    );
};

export default LinksGrid;


