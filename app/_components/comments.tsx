"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "../apis/axiosInstance";

interface IComments {
  _id: string;
  comment: string;
  webtoonId: string;
}

const Comments = ({ webtoonId }: { webtoonId: string }) => {
  const [comments, setComments] = useState<IComments[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, [webtoonId]);

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(
        `${axiosInstance.defaults.baseURL}/webtoons/comments/get/${webtoonId}`,
      );
      if (response.status === 200) {
        setComments(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post(
        `${axiosInstance.defaults.baseURL}/webtoons/comments/add`,
        {
          comment: newComment,
          id: webtoonId,
        },
      );
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.log(err);
    }
  };

  if (!comments) return <div>Loading comments ... </div>;
  return (
    <div className="mt-12 flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold">Comments</h2>
      <ul>
        {comments.map((comment: IComments) => (
          <li key={comment._id} className="text-slate-600 text-lg text-bold">
            <span className="font-extrabold text-[#FAAD66]">
              Anonymous user:
            </span>{" "}
            {comment.comment}
          </li>
        ))}
      </ul>
      <form
        onSubmit={handleSubmit}
        className="flex  mt-10 mb-10 items-center justify-center gap-4"
      >
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border border-black"
          placeholder="Add a comment..."
        />
        <button type="submit" className="bg-[#FAAD66] rounded-lg p-2 h-[50px]">
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default Comments;
