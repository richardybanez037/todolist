"use client";

import TrashIcon from "@/app/assets/trash-svgrepo-com.svg";
import Image from "next/image";
import { IMessage } from "../lib/definitions";
import { useState } from "react";

export default function Task({
  taskId,
  task,
  isChecked,
  remove,
  setCheckbox,
}: {
  taskId: string;
  task: string;
  isChecked: boolean;
  remove: (taskId: string) => Promise<IMessage>;
  setCheckbox: (taskId: string, isChecked: boolean) => Promise<IMessage>;
}) {
  const [check, setCheck] = useState(isChecked);
  return (
    <div className="w-full border flex justify-between p-2 rounded-xl items-center bg-white">
      <div className="flex gap-2 pr-3 pl-1">
        <input
          type="checkbox"
          checked={check}
          onChange={(e) => {
            setCheckbox(taskId, e.target.checked);
            setCheck(e.target.checked);
          }}
        />
        <p>{task}</p>
      </div>
      <button
        className="rounded-lg p-2 bg-green-300 hover:bg-orange-300 duration-150 min-w-10 w-min"
        onClick={() => remove(taskId)}
      >
        <Image src={TrashIcon} alt="remove task" />
      </button>
    </div>
  );
}
