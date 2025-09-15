import React, { useState } from "react";
import Modal from "../components/Modal"; // assume you have a reusable modal

const AttachmentList = ({ attachments }) => {
  const [selected, setSelected] = useState(null);

  const getFileUrl = (file) => `${import.meta.env.VITE_BACKEND_URL}/uploads/${file}`;

  return (
    <div>
      <h3 className="text-lg font-semibold">Attachments</h3>
      <ul className="space-y-2">
        {attachments.map((a) => (
          <li key={a._id}>
            <button
              className="text-blue-600 underline"
              onClick={() => setSelected(a)}
            >
              {a.originalName}
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <h2 className="font-bold mb-2">{selected.originalName}</h2>
          {selected.mimeType.startsWith("image/") ? (
            <img
              src={getFileUrl(selected.file)}
              alt={selected.originalName}
              className="max-w-full max-h-[80vh]"
            />
          ) : selected.mimeType === "application/pdf" ? (
            <iframe
              src={getFileUrl(selected.file)}
              title={selected.originalName}
              className="w-full h-[80vh]"
            />
          ) : (
            <div className="space-y-3">
              <p>Preview not available for this file type.</p>
              <a
                href={getFileUrl(selected.file)}
                download={selected.originalName}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Download
              </a>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default AttachmentList;