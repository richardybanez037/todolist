"use client";

import { redirect } from "next/navigation";
import { sessionUsername } from "@/session";
import { useActionState, useEffect, useState } from "react";
import LogoutIcon from "@/app/assets/logout-svgrepo-com.svg";
import PlusIcon from "@/app/assets/plus-svgrepo-com.svg";
import Image from "next/image";
import Task from "./components/task";
import { logout } from "./lib/actions/user";
import { ITask } from "./lib/definitions";
import { add, all, remove, setCheckbox } from "./lib/actions/todolist";
import ListSkeleton from "./components/listSkeleton";

export default function Home() {
  const [username, setUsername] = useState("");
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [message, formAction, isPending] = useActionState(add, null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const usernameHandler = async () => {
      setUsername(await sessionUsername());
    };

    usernameHandler();
  }, []);

  useEffect(() => {
    const fetchTodoList = async () => {
      const result = await all();

      if (result && Array.isArray(result.message)) {
        setTodoList(result.message);
        setIsFetching(false);
      }
    };

    if (isFetching || isPending) fetchTodoList();
  }, [isFetching, isPending]);

  const logoutHandler = async () => {
    await logout();
    redirect("/signin");
  };

  return (
    <div>
      <header className="flex justify-end p-2">
        <button
          className="bg-green-300 p-2 rounded-lg hover:bg-orange-300 duration-150 ease-in-out"
          onClick={logoutHandler}
        >
          <Image src={LogoutIcon} alt="logout" width={20} />
        </button>
      </header>
      <main className="flex justify-center p-5">
        <div className="flex flex-col items-center gap-2 w-96">
          <h1 className="text-xl">{username}'s TodoList 📋</h1>
          <form className="flex w-full bg-white" action={formAction}>
            <input
              name="task"
              className="border border-r-0 px-2 rounded-l-xl w-full"
              placeholder="Add new task"
              required
            />
            <div className="p-2 border border-l-0 rounded-r-xl">
              <button className="rounded-lg w-12 h-8 flex justify-center items-center bg-green-300 hover:bg-orange-300 duration-150 ease-in-out">
                {isPending ? (
                  <span className="loader"></span>
                ) : (
                  <Image src={PlusIcon} alt="logout" width={20} />
                )}
              </button>
            </div>
          </form>
          {message && !message.ok && (
            <div className="w-full text-center">
              <p>{message.message}</p>
            </div>
          )}
          <div className="w-full h-0.5 bg-gray-100"></div>
          {isFetching ? (
            <ListSkeleton />
          ) : todoList.length > 0 ? (
            <div className="flex flex-col gap-2 w-full">
              {todoList.map((task) => (
                <Task
                  key={task.id}
                  taskId={task.id}
                  task={task.task}
                  isChecked={task.isChecked}
                  remove={async (taskId) => {
                    const response = await remove(taskId);
                    if (response.ok) {
                      setTodoList((prev) =>
                        prev.filter((t) => t.id !== taskId)
                      );
                    } else {
                      console.error(response.message);
                    }

                    return response;
                  }}
                  setCheckbox={setCheckbox}
                />
              ))}
            </div>
          ) : (
            <p>No task yet 😯</p>
          )}
        </div>
      </main>
    </div>
  );
}
