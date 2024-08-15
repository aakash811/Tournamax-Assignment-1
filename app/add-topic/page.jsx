"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Error states
  const [errors, setErrors] = useState({ title: "", description: "" });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    let hasError = false;
    const newErrors = { title: "", description: "" };

    if (!title.trim()) {
      newErrors.title = "Topic title required";
      hasError = true;
    }

    if (!description.trim()) {
      newErrors.description = "Topic description required";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="relative">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
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

      <div className="relative">
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className={`border px-8 py-2 w-full max-h-[calc(100vh-52vh)] min-h-14 ${
            errors.description ? "border-red-500" : "border-slate-500"
          }`}
          placeholder="Topic Description"
          rows="4"
        />
      </div>
      {errors.description && (
        <span className="text-red-500 text-sm -mt-3">
          * {errors.description}
        </span>
      )}

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit rounded-lg mt-2"
      >
        Add Topic
      </button>
    </form>
  );
}
