import React, { useEffect, useState } from 'react';

const LinkModal = ({ isOpen, onClose, folders, onSubmit, initialData = {} }: {
  isOpen: boolean;
  onClose: () => void;
  folders: any[];
  onSubmit: (data: any) => void;
  initialData: any;
}) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [folderId, setFolderId] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ title, url, folderId });
  };
  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setUrl('');
      setFolderId('');
    } else {
      setTitle(initialData.title || '');
      setUrl(initialData.url || '');
      setFolderId(initialData.folderId || '');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 bg-gray-700">
      <div className="bg-gray-700 p-4 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl mb-4">{initialData.id ? 'Edit Link' : 'Add Link'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input w-full bg-white input-bordered"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full input bg-white input-bordered"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Folder</label>
            <select
              value={folderId}
              onChange={(e) => setFolderId(e.target.value)}
              className="w-full input bg-white input-bordered"
              required
            >
              <option value="" disabled>Select a folder</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3 a">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-error"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-neutral">
              {initialData.id ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkModal;
