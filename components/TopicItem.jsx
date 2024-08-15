"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiArrowUp, HiPencilAlt } from "react-icons/hi";

export default function TopicItem({ topic }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (titleRef.current && descriptionRef.current) {
      const isTitleTruncated =
        titleRef.current.scrollWidth > titleRef.current.clientWidth;
      const isDescriptionTruncated =
        descriptionRef.current.scrollWidth > descriptionRef.current.clientWidth;
      setIsTruncated(isTitleTruncated || isDescriptionTruncated);
    }
  }, []);

  return (
    <div
      key={topic._id}
      className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
    >
      <div
        className="w-[70%] relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2 ref={titleRef} className="font-bold text-2xl truncate">
          {topic.title}
        </h2>
        <div ref={descriptionRef} className="truncate">
          {topic.description}
        </div>

        {/* Popover with tooltip and arrow */}
        {isHovered && isTruncated && (
          <div className="absolute top-full left-0 mt-2 w-full bg-[#1f2937] text-white rounded-lg shadow-lg z-10">
            <div className=" scale-[3] absolute top-[-5px] left-[50%] w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-700"></div>
            <h2 className="font-bold text-lg break-words bg-[#374151] rounded-t-lg w-full px-3 py-2">
              {topic.title}
            </h2>
            <div className="break-words px-3 py-3 text-[#727a86]">
              {topic.description}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <RemoveBtn id={topic._id} />
        <Link className="text-gray-700" href={`/edit-topic/${topic._id}`}>
          <HiPencilAlt size={24} />
        </Link>
      </div>
    </div>
  );
}
