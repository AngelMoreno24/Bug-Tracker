import React, { useState } from "react";

// ✅ Generic TableRow
const TableRow = ({
  values,
  colWidths,
  truncateCols = [],
  rowKey,
  minWidths = [],
  isHeader = false,
}) => {
  return (
    <div
      key={rowKey}
      className={`grid ${colWidths} px-4 py-2 border-t-1 ${
        isHeader
          ? "bg-gray-200 font-bold text-sm"
          : "bg-white hover:bg-gray-100 text-sm"
      }`}
    >
      {values.map((val, i) => (
        <div
          key={i}
          className={`self-center p-1 ${
            truncateCols.includes(i)
              ? "text-left truncate max-w-[200px]"
              : "text-center"
          } ${minWidths[i] || ""}`}
          title={truncateCols.includes(i) ? val : undefined}
        >
          {val}
        </div>
      ))}
    </div>
  );
};

// ✅ Example data
const comments = [
  { commenter: "Alice", message: "Looking into this issue right now.", createDate: "2025-08-20" },
  { commenter: "Bob", message: "Bug confirmed. Reproduced in v1.2.0.", createDate: "2025-08-21" },
  { commenter: "Charlie", message: "Fix pushed to dev branch 🚀", createDate: "2025-08-22" },
];

const history = [
  { property: "Status", oldValue: "Open", newValue: "In Progress", dateChanged: "2025-08-21" },
  { property: "Priority", oldValue: "Low", newValue: "High", dateChanged: "2025-08-22" },
];

const attachments = [
  { file: "screenshot1.png", uploader: "Alice", notes: "Error screen capture", created: "2025-08-20", url: "/files/screenshot1.png" },
  { file: "log.txt", uploader: "Bob", notes: "App crash logs", created: "2025-08-21", url: "/files/log.txt" },
  { file: "report.pdf", uploader: "Charlie", notes: "Generated report", created: "2025-08-22", url: "/files/report.pdf" },
];

// ✅ Main component
const TicketTables = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileClick = (file) => {
    const isImage = /\.(png|jpe?g|gif)$/i.test(file.file);
    if (isImage) {
      setPreviewImage(file.url);
    } else {
      // Force download for non-images
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.file;
      link.click();
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* COMMENTS */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Comments</h2>
        <div className="overflow-x-auto">
          <TableRow
            values={["Commenter", "Message", "Created"]}
            colWidths="grid-cols-[1fr_2fr_1fr]"
            minWidths={["min-w-[120px]", "min-w-[250px]", "min-w-[160px]"]}
            isHeader
          />
          {comments.map((ticket, index) => (
            <TableRow
              key={index}
              rowKey={index}
              values={[ticket.commenter, ticket.message, ticket.createDate]}
              colWidths="grid-cols-[1fr_2fr_1fr]"
              truncateCols={[1]}
              minWidths={["min-w-[120px]", "min-w-[250px]", "min-w-[160px]"]}
            />
          ))}
        </div>
      </div>

      {/* HISTORY */}
      <div>
        <h2 className="text-lg font-semibold mb-2">History</h2>
        <div className="overflow-x-auto">
          <TableRow
            values={["Property", "Old Value", "New Value", "Date Changed"]}
            colWidths="grid-cols-[1fr_1fr_1fr_1fr]"
            minWidths={[
              "min-w-[120px]",
              "min-w-[120px]",
              "min-w-[120px]",
              "min-w-[160px]",
            ]}
            isHeader
          />
          {history.map((ticket, index) => (
            <TableRow
              key={index}
              rowKey={index}
              values={[ticket.property, ticket.oldValue, ticket.newValue, ticket.dateChanged]}
              colWidths="grid-cols-[1fr_1fr_1fr_1fr]"
              minWidths={[
                "min-w-[120px]",
                "min-w-[120px]",
                "min-w-[120px]",
                "min-w-[160px]",
              ]}
            />
          ))}
        </div>
      </div>

      {/* ATTACHMENTS */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Attachments</h2>
        <div className="overflow-x-auto">
          <TableRow
            values={["File", "Uploader", "Notes", "Created"]}
            colWidths="grid-cols-[1fr_1fr_2fr_1fr]"
            minWidths={[
              "min-w-[140px]",
              "min-w-[140px]",
              "min-w-[250px]",
              "min-w-[160px]",
            ]}
            isHeader
          />
          {attachments.map((file, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_2fr_1fr] px-4 py-2 border-t-1 bg-white hover:bg-gray-100 text-sm"
            >
              <button
                onClick={() => handleFileClick(file)}
                className="text-blue-600 hover:underline text-left truncate"
              >
                {file.file}
              </button>
              <p className="self-center text-center min-w-[140px]">{file.uploader}</p>
              <p className="self-center text-left truncate max-w-[250px]" title={file.notes}>
                {file.notes}
              </p>
              <p className="self-center text-center min-w-[160px]">{file.created}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-3xl">
            <img src={previewImage} alt="Preview" className="max-h-[80vh] max-w-full" />
            <button
              onClick={() => setPreviewImage(null)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketTables;