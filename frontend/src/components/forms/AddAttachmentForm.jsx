import React from "react";

const AddAttachmentForm = ({ attachmentForm, setAttachmentForm }) => {
  return (
    <div>
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1">File Name</label>
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          value={attachmentForm.file}
          onChange={(e) => setAttachmentForm({ ...attachmentForm, file: e.target.value })}
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