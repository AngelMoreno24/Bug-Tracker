import React, { useState, useEffect } from 'react'
import Modal from "../components/Modal";
import { useParams, useNavigate } from 'react-router-dom';

import EditTicketForm from "../components/forms/EditTicketForm";
import AddCommentForm from "../components/forms/AddCommentForm";
import AddAttachmentForm from "../components/forms/AddAttachmentForm";

import { getTicketDetails, updateTicket } from '../api/TicketAPI';
import { createComment, getComments } from '../api/CommentAPI';

import { useAuth } from "../hooks/useAuth";

const ProjectTicketDetails = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { id } = useParams();

  const [ticketInfo, setTicketInfo] = useState({});
  const [comments, setComments] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [ticketForm, setTicketForm] = useState({});
  const [commentForm, setCommentForm] = useState({ ticketId: id, message: "" });
  const [attachmentForm, setAttachmentForm] = useState({ file: "", uploader: "", notes: "" });

  const [editTicketOpen, setEditTicketOpen] = useState(false);
  const [addCommentOpen, setAddCommentOpen] = useState(false);
  const [addAttachmentOpen, setAddAttachmentOpen] = useState(false);

  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (token) {
      fetchTicketDetails();
      fetchCommentDetails();
    }
  }, [token]);

  const fetchTicketDetails = async () => {
    try {
      const ticketDetails = await getTicketDetails(id, token);
      setProjectId(ticketDetails.projectId._id);
      setProjectName(ticketDetails.projectId.name);
      setTitle(ticketDetails.title);
      setDescription(ticketDetails.description);

      const info = {
        createdBy: ticketDetails.createdBy.name,
        assignedTo: ticketDetails.assignedTo? ticketDetails.assignedTo.name: "-",
        project: ticketDetails.projectId.name,
        priority: ticketDetails.priority,
        status: ticketDetails.status,
        type: ticketDetails.type,
        createdAt: ticketDetails.createdAt,
        updatedAt: ticketDetails.updatedAt,
      };

      setTicketInfo(info);

      setTicketForm({
        id: ticketDetails.projectId._id,
        title: ticketDetails.title,
        description: ticketDetails.description,
        assignedTo: ticketDetails.assignedTo? ticketDetails.assignedTo.name: "-",
        priority: ticketDetails.priority,
        status: ticketDetails.status,
        type: ticketDetails.type,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchCommentDetails = async () => {
    try {
      const commentDetails = await getComments(id, token);
      const formatted = commentDetails.map(c => ({
        commenter: c.author.name,
        message: c.message,
        createDate: c.createdAt,
      }));
      setComments(formatted);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleTicketEdit = async () => {
    const alteredFields = Object.fromEntries(
      Object.entries(ticketForm).filter(([key, value]) => value !== "" && value !== ticketInfo[key])
    );

    if (Object.keys(alteredFields).length === 0) {
      setEditTicketOpen(false);
      return;
    }

    await updateTicket(id, alteredFields, token);
    await fetchTicketDetails();
    setEditTicketOpen(false);
  };

  const handleAddComment = async () => {
    await createComment(commentForm, token);
    await fetchCommentDetails();
    setCommentForm({ ticketId: id, message: "" });
    setAddCommentOpen(false);
  };

  const handleAddAttachment = () => {
    setAttachments([...attachments, { ...attachmentForm, created: new Date().toISOString().slice(0, 10) }]);
    setAttachmentForm({ file: "", uploader: "", notes: "" });
    setAddAttachmentOpen(false);
  };

  const getPriorityColor = (priority) => {
    if (!priority) return "bg-gray-300 text-black px-2 py-1 rounded-full text-xs";
    switch (priority.toLowerCase()) {
      case "critical": return "bg-red-500 text-white px-2 py-1 rounded-full text-xs";
      case "high": return "bg-orange-300 text-black px-2 py-1 rounded-full text-xs";
      case "medium": return "bg-yellow-300 text-black px-2 py-1 rounded-full text-xs";
      case "low": return "bg-green-300 text-black px-2 py-1 rounded-full text-xs";
      default: return "bg-gray-300 text-black px-2 py-1 rounded-full text-xs";
    }
  };

  const getTypeColor = (type) => {
    if (!type) return "bg-gray-300 text-black px-2 py-1 rounded-full text-xs";
    switch (type.toLowerCase()) {
      case "bug": return "bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs";
      case "feature": return "bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs";
      case "task": return "bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-xs";
      default: return "bg-gray-300 text-black px-2 py-1 rounded-full text-xs";
    }
  };

  return (
    <div className="p-6 box-border min-w-[790px] bg-gray-100">

      <h1
        onClick={() => navigate(`/accounts/projects/${projectId}`)}
        className="text-2xl font-bold text-center mb-6 cursor-pointer 
                  bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition duration-200 w-fit mx-auto"
      >
        ← Return to Project
      </h1>

      {/* Ticket Header */}
      <div className="border rounded-xl shadow-sm p-6 bg-white mb-6 min-w-[770px]">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-gray-700 mb-2">{description}</p>
      </div>

      {/* Ticket Details */}
      <div className="border rounded-xl shadow-sm bg-white mb-6 min-w-[770px]">
        <div className="bg-amber-200 rounded-t-xl p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Ticket Details</h2>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            onClick={() => setEditTicketOpen(true)}
          >
            Edit
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(ticketInfo).map(([key, value]) => {
            let displayValue = value;

            // Format dates for createdAt and updatedAt
            if (key === "createdAt" || key === "updatedAt") {
              displayValue = value ? new Date(value).toLocaleString() : "-";
            }

            return (
              <div key={key} className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <p className="font-bold text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                <p className="text-base">
                  {key === "priority" ? (
                    <span className={getPriorityColor(value)}>{value}</span>
                  ) : key === "type" ? (
                    <span className={getTypeColor(value)}>{value}</span>
                  ) : (
                    displayValue
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comments */}
      <div className="border rounded-xl shadow-sm p-4 bg-white mb-6 min-w-[770px]">
        <div className="bg-green-200 rounded-t-xl p-3 flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Comments</h2>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            onClick={() => setAddCommentOpen(true)}
          >
            Add Comment
          </button>
        </div>
        {comments.map((c, index) => (
          <div key={index} className="border rounded-lg p-3 mb-2 bg-gray-50 hover:bg-gray-100 transition">
            <p className="font-bold text-indigo-700">{c.commenter}</p>
            <p className="whitespace-pre-wrap break-words">{c.message}</p>
            <p className="text-xs text-gray-500 mt-1">{new Date(c.createDate).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Attachments */}
      <div className="border rounded-xl shadow-sm p-4 bg-white mb-6 min-w-[770px]">
        <div className="bg-purple-200 rounded-t-xl p-3 flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Attachments</h2>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            onClick={() => setAddAttachmentOpen(true)}
          >
            Add Attachment
          </button>
        </div>
        {attachments.map((a, index) => (
          <div key={index} className="border rounded-lg p-2 mb-2 bg-gray-50 flex justify-between items-center">
            <a href={`/${a.file}`} download className="text-blue-600 underline">{a.file}</a>
            <span>{a.uploader}</span>
            <span className="truncate max-w-xs">{a.notes}</span>
            <span className="text-xs text-gray-500">{a.created}</span>
          </div>
        ))}
      </div>

      {editTicketOpen && (
        <Modal title="Edit Ticket Details" onClose={() => setEditTicketOpen(false)} onSave={handleTicketEdit}>
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

export default ProjectTicketDetails;