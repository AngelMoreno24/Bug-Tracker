import React from "react";

const AddCommentForm = ({ commentForm, setCommentForm }) => {
  return (
    <div>
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1">Message</label>
        <textarea
          className="w-full border rounded px-2 py-1"
          value={commentForm.message}
          onChange={(e) => setCommentForm({ ...commentForm, message: e.target.value })}
        />
      </div>
    </div>
  );
};

export default AddCommentForm;