import React, { useState, useEffect } from 'react'
import Modal from "../components/Modal"; // adjust the path as needed
import { useParams, useNavigate } from 'react-router-dom';

import EditTicketForm from "../components/forms/EditTicketForm";
import AddCommentForm from "../components/forms/AddCommentForm";
import AddAttachmentForm from "../components/forms/AddAttachmentForm";

import { getTicketDetails } from '../api/TicketAPI';

import { useAuth } from "../hooks/useAuth";


// Main Component
const ProjectTicketDetails = () => {



  // retrieves token and user data from authContext
  const { user, token } = useAuth();


    const { id } = useParams();  // <-- grabs "id" from the URL

    /////////////////////////////////////////////////////////////////////////////////////////////////
    //                         Fetches details for ticket
    /////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if (token) {
            fetchTicketDetails();
        }
    }, [token]);

    /////////////////////////////////////////////////////////////////////////////////////////////////
    //                                          Ticket Details
    /////////////////////////////////////////////////////////////////////////////////////////////////


    const fetchTicketDetails = async () => {
        try {
            console.log(id)
            const ticketDetails = await getTicketDetails(id ,token); // 🔑 use token from context
            console.log(ticketDetails);
            //const projectInfo = projects.project

            //setProjectTitle(projectInfo.title)
            //setProjectDescription(projectInfo.description)
            setTicketInfo(ticketDetails);

        } catch (err) {
            console.error(err.message);
        }
    };

  /////////////////////////////////////////////////////////////////////////////////////////////////
  //                                          Set Use States
  /////////////////////////////////////////////////////////////////////////////////////////////////


  const [ticketInfo, setTicketInfo] = useState(ticketInfoData);
  const [comments, setComments] = useState(initialComments);
  const [attachments, setAttachments] = useState(initialAttachments);

  const [editTicketOpen, setEditTicketOpen] = useState(false);
  const [addCommentOpen, setAddCommentOpen] = useState(false);
  const [addAttachmentOpen, setAddAttachmentOpen] = useState(false);

  // Form state
  const [ticketForm, setTicketForm] = useState(ticketInfoData);
  const [commentForm, setCommentForm] = useState({ commenter: "", message: "" });
  const [attachmentForm, setAttachmentForm] = useState({ file: "", uploader: "", notes: "" });

  const handleTicketSave = () => {
    setTicketInfo(ticketForm);
    setEditTicketOpen(false);
  };

  const handleAddComment = () => {
    setComments([...comments, { ...commentForm, createDate: new Date().toISOString().slice(0, 10) }]);
    setCommentForm({ commenter: "", message: "" });
    setAddCommentOpen(false);
  };

  const handleAddAttachment = () => {
    setAttachments([...attachments, { ...attachmentForm, created: new Date().toISOString().slice(0, 10) }]);
    setAttachmentForm({ file: "", uploader: "", notes: "" });
    setAddAttachmentOpen(false);
  };

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
        <div className="bg-blue-200 rounded-t-xl p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Ticket Details</h2>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            onClick={() => setEditTicketOpen(true)}
          >
            Edit
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(ticketInfo).map(([key, value]) => (
            <div key={key} className="bg-blue-100 p-3 rounded-lg shadow-inner">
              <p className="font-semibold text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
              <p className="text-base">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comments Section */}
      <div className="border rounded-xl shadow-sm p-4 bg-white mb-6 min-w-[770px] box-border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Comments</h2>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            onClick={() => setAddCommentOpen(true)}
          >
            Add Comment
          </button>
        </div>
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

      {/* Attachments Section */}
      <div className="border rounded-xl shadow-sm p-4 bg-white mb-6 min-w-[770px] box-border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Attachments</h2>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            onClick={() => setAddAttachmentOpen(true)}
          >
            Add Attachment
          </button>
        </div>
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

        {/* Modals */}
        {editTicketOpen && (
            <Modal title="Edit Ticket Details" onClose={() => setEditTicketOpen(false)} onSave={handleTicketSave}>
                <EditTicketForm ticketForm={ticketForm} setTicketForm={setTicketForm} />
            </Modal>
        )}

        {addCommentOpen && (
            <Modal title="Add Comment" onClose={() => setAddCommentOpen(false)} onSave={handleAddComment}>
                <AddCommentForm commentForm={commentForm} setCommentForm={setCommentForm} />
            </Modal>
        )}

        {addAttachmentOpen && (
            <Modal title="Add Attachment" onClose={() => setAddAttachmentOpen(false)} onSave={handleAddAttachment}>
                <AddAttachmentForm attachmentForm={attachmentForm} setAttachmentForm={setAttachmentForm} />
            </Modal>
        )}
    </div>
  );
};





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

// Example Data
const ticketInfoData = {
  title: "Login Page Bug",
  status: "In Progress",
  priority: "High",
  assignedTo: "Alice",
  created: "2025-08-20",
  updated: "2025-08-22",
};

const initialComments = [
  { commenter: "Alice", message: "Looking into this issue right now.", createDate: "2025-08-20" },
  { commenter: "Bob", message: "Bug confirmed. Reproduced in v1.2.0.", createDate: "2025-08-21" },
];

const initialAttachments = [
  { file: "screenshot1.png", uploader: "Alice", notes: "Error screen capture", created: "2025-08-20" },
];





export default ProjectTicketDetails;