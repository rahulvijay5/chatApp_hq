import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAiMessages, setMessages } from "../redux/messageSlice";
import { BASE_URL } from "..";
import toast from "react-hot-toast";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const [prompt, setPrompt] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages, aimessages } = useSelector((store) => store.message);

  if (selectedUser?.status == "Busy") {
    const onSubmitHandler = async (e) => {
      e.preventDefault();
      
      // Set a timeout for the axios request
      const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: { message: "Uhh ohh... Seems like it is taking too long to connect to AI model. User is unavailable right now." } });
        }, 10000);
      });
    
      try {
        const res = await Promise.race([
          axios.post(
            `${BASE_URL}/api/v1/user/ai/chat`,
            { prompt },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          ),
          timeoutPromise,
        ]);
        if (res.data && res.data.message === "Uhh ohh... Seems like it is taking too long to connect to AI model. User is unavailable right now.") {
          dispatch(setAiMessages([res.data.message, " Please try again later."]));
        } else {
          dispatch(setAiMessages([res.data.message, res.data.prompt]));
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "An error occurred");
        console.error("Error fetching AI response:", error);
      }
      setPrompt("");
    };    
    return (
      <form onSubmit={onSubmitHandler} className="px-4 my-3">
        <div className="w-full relative">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="Send a message..."
            className="border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white"
          />
          <button
            type="submit"
            className="absolute flex inset-y-0 end-0 items-center pr-4"
          >
            <IoSend />
          </button>
        </div>
      </form>
    );
  } else {
    const onSubmitHandler = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          `${BASE_URL}/api/v1/message/send/${selectedUser?._id}`,
          { message },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        dispatch(setMessages([...messages, res?.data?.newMessage]));
      } catch (error) {
        console.log(error);
      }
      setMessage("");
    };
    return (
      <form onSubmit={onSubmitHandler} className="px-4 my-3">
        <div className="w-full relative">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Send a message..."
            className="border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white"
          />
          <button
            type="submit"
            className="absolute flex inset-y-0 end-0 items-center pr-4"
          >
            <IoSend />
          </button>
        </div>
      </form>
    );
  }
};

export default SendInput;
