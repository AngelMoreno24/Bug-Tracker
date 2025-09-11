import React from "react";

const AddAttachmentForm = ({ attachmentForm, setAttachmentForm }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAttachmentForm({ ...attachmentForm, file });
  };

  return (
    <div>
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1">Upload File</label>
        <input
          type="file"
          className="w-full border rounded px-2 py-1"
          onChange={handleFileChange}
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1">Uploader</label>
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          value={attachmentForm.uploader}
          onChange={(e) => setAttachmentForm({ ...attachmentForm, uploader: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1">Notes</label>
        <textarea
          className="w-full border rounded px-2 py-1"
          value={attachmentForm.notes}
          onChange={(e) => setAttachmentForm({ ...attachmentForm, notes: e.target.value })}
        />
      </div>
    </div>
  );
};

export default AddAttachmentForm;