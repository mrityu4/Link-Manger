import React, { useState } from 'react';

const FolderModal = ({ isOpen, onClose, onSubmit, initialData }:
    {
        isOpen: boolean, onClose: () => void,
        onSubmit: (data: { name: string, id: string }) => void,
        // initialData: { name: string, id: string } | undefined
        initialData: any
    }) => {
    const [name, setName] = useState(initialData?.name || '');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ name, id: initialData?.id ?? '' });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-gray-700 p-4 rounded shadow-md w-full max-w-md">
                <h2 className="text-xl mb-4">{initialData?.id ? 'Rename Folder' : 'Add Folder'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input w-full bg-white input-bordered"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-error"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-neutral">
                            {initialData?.id ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FolderModal;
