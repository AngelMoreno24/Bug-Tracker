import React from "react";

// ✅ Generic TableRow component
const TableRow = ({ values, colWidths, truncateCols = [], rowKey, minWidths = [], isHeader = false }) => {
  return (
    <div
      key={rowKey}
      className={`grid ${colWidths} px-4 py-2 border-t ${
        isHeader
          ? "bg-blue-200 font-bold text-sm"
          : "bg-white hover:bg-gray-100 text-sm"
      } box-border`}
    >
      {values.map((val, i) => (
        <p
          key={i}
          className={`self-center p-1 ${
            truncateCols.includes(i)
              ? "text-left truncate max-w-[200px]"
              : "text-center"
          } ${minWidths[i] || ""}`}
          title={truncateCols.includes(i) ? val : undefined}
        >
          {val}
        </p>
      ))}
    </div>
  );
};

// ✅ Example Data
const ticketInfo = {
  title: "Login Page Bug",
  status: "In Progress",
  priority: "High",
  assignedTo: "Alice",
  created: "2025-08-20",
  updated: "2025-08-22",
};

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
  { file: "screenshot1.png", uploader: "Alice", notes: "Error screen capture", created: "2025-08-20" },
  { file: "log.txt", uploader: "Bob", notes: "App crash logs", created: "2025-08-21" },
];

// ✅ Main Component
const ProjectTicketDetails = () => {
  return (
    <div className="p-6 box-border min-w-[790px]">
        {/* Project Detail */}
        <div className="border rounded-xl shadow-sm p-6 bg-white mb-6 box-border min-w-[770px]">
            <h1 className="text-2xl font-bold mb-4">Project Details</h1>
            <p><strong>Project ID:</strong> 12345</p>
            <p className="mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
        </div>

        {/* Ticket Details */}
        <div className="border rounded-xl shadow-sm bg-white mb-6 min-w-[770px] box-border">
            <div className="bg-blue-200 rounded-t-xl p-4">
                <h2 className="text-xl font-bold">Ticket Details</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-100 p-3 rounded-lg shadow-inner">
                <p className="font-semibold text-sm">Title</p>
                <p className="text-base">{ticketInfo.title}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg shadow-inner">
                <p className="font-semibold text-sm">Status</p>
                <p className="text-base">{ticketInfo.status}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg shadow-inner">
                <p className="font-semibold text-sm">Priority</p>
                <p className="text-base">{ticketInfo.priority}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg shadow-inner">
                <p className="font-semibold text-sm">Assigned To</p>
                <p className="text-base">{ticketInfo.assignedTo}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg shadow-inner">
                <p className="font-semibold text-sm">Created</p>
                <p className="text-base">{ticketInfo.created}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg shadow-inner">
                <p className="font-semibold text-sm">Last Updated</p>
                <p className="text-base">{ticketInfo.updated}</p>
                </div>
            </div>
        </div>

        {/* Comments */}
        <div className="border rounded-xl shadow-sm p-4 bg-white mb-6 min-w-[770px] box-border">
            <h2 className="text-lg font-semibold mb-4">Comments</h2>
            <TableRow
            values={["Commenter", "Message", "Created"]}
            colWidths="grid-cols-[1fr_2fr_1fr]"
            minWidths={["min-w-[120px]", "min-w-[250px]", "min-w-[160px]"]}
            isHeader
            />
            {comments.map((c, index) => (
            <TableRow
                key={index}
                rowKey={index}
                values={[c.commenter, c.message, c.createDate]}
                colWidths="grid-cols-[1fr_2fr_1fr]"
                truncateCols={[1]}
                minWidths={["min-w-[120px]", "min-w-[250px]", "min-w-[160px]"]}
            />
            ))}
        </div>

        {/* History */}
        <div className="border rounded-xl shadow-sm p-4 bg-white mb-6 min-w-[770px] box-border">
            <h2 className="text-lg font-semibold mb-4">History</h2>
            <TableRow
            values={["Property", "Old Value", "New Value", "Date Changed"]}
            colWidths="grid-cols-[1fr_1fr_1fr_1fr]"
            minWidths={["min-w-[120px]", "min-w-[120px]", "min-w-[120px]", "min-w-[160px]"]}
            isHeader
            />
            {history.map((h, index) => (
            <TableRow
                key={index}
                rowKey={index}
                values={[h.property, h.oldValue, h.newValue, h.dateChanged]}
                colWidths="grid-cols-[1fr_1fr_1fr_1fr]"
                minWidths={["min-w-[120px]", "min-w-[120px]", "min-w-[120px]", "min-w-[160px]"]}
            />
            ))}
        </div>

        {/* Attachments */}
        <div className="border rounded-xl shadow-sm p-4 bg-white mb-6 min-w-[770px] box-border">
            <h2 className="text-lg font-semibold mb-4">Attachments</h2>
            <TableRow
            values={["File", "Uploader", "Notes", "Created"]}
            colWidths="grid-cols-[1fr_1fr_2fr_1fr]"
            minWidths={["min-w-[140px]", "min-w-[140px]", "min-w-[250px]", "min-w-[160px]"]}
            isHeader
            />
            {attachments.map((a, index) => (
            <TableRow
                key={index}
                rowKey={index}
                values={[
                <a href={`/${a.file}`} download className="text-blue-600 underline">{a.file}</a>,
                a.uploader,
                a.notes,
                a.created,
                ]}
                colWidths="grid-cols-[1fr_1fr_2fr_1fr]"
                truncateCols={[2]}
                minWidths={["min-w-[140px]", "min-w-[140px]", "min-w-[250px]", "min-w-[160px]"]}
            />
            ))}
        </div>
    </div>
  );
};

export default ProjectTicketDetails;