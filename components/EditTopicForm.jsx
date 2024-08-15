"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  // Error states
  const [errors, setErrors] = useState({ title: "", description: "" });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    let hasError = false;
    const newErrors = { title: "", description: "" };

    if (!newTitle.trim()) {
      newErrors.title = "Topic title required";
      hasError = true;
    }

    if (!newDescription.trim()) {
      newErrors.description = "Topic description required";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="">
        <input
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          className={`border px-8 py-2 w-full ${
            errors.title ? "border-red-500" : "border-slate-500"
          }`}
          type="text"
          placeholder="Topic Title"
        />
      </div>
      {errors.title && (
        <span className="text-red-500 text-sm -mt-2">* {errors.title}</span>
      )}

      <div className="">
        <textarea
          onChange={(e) => setNewDescription(e.target.value)}
          value={newDescription}
          className={`border px-8 py-2 w-full ${
            errors.description ? "border-red-500" : "border-slate-500"
          }`}
          rows={4}
          type="text"
          placeholder="Topic Description"
        />
      </div>
      {errors.description && (
        <span className="text-red-500 text-sm -mt-3">
          * {errors.description}
        </span>
      )}

      <button
        type="submit"
        className="bg-green-600 font-bold rounded-md text-white py-3 px-6 w-fit mt-2"
      >
        Update Topic
      </button>
    </form>
  );
}
