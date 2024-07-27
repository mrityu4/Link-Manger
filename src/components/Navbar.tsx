"use client";

export default function Navbar({ handleAddLink, handleAddFolder }: {
  handleAddLink: () => void,
  handleAddFolder: () => void
}) {
  return (
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex-grow mx-4 justify-end flex gap-2">
        {/* <input type="text" placeholder="Search links..." className="w-full px-4 py-2 rounded-full text-gray-700" /> */}
        <button
          className="btn btn-neutral"
          onClick={handleAddLink}
        >
          Add Link
        </button>
        <button
          className="btn btn-neutral"
          onClick={handleAddFolder}
        >
          Add Folder
        </button>


      </div>
    </div>
  );
}

