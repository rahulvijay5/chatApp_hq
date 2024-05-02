// import React from 'react'
// import Message from './Message'
// import useGetMessages from '../hooks/useGetMessages';
// import { useSelector } from "react-redux";
// import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

// const Messages = () => {
//     useGetMessages();
//     useGetRealTimeMessage();
//     const { messages } = useSelector(store => store.message);
//     return (
//         <div className='px-4 flex-1 overflow-auto'>
//             {
//                messages && messages?.map((message) => {
//                     return (
//                         <Message key={message._id} message={message} />
//                     )
//                 })
//             }
//         </div>
//     )
// }
// export default Messages

import React, { useEffect, useState } from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";
import { setSelectedUser } from "../redux/userSlice";
import axios from "axios";
import { BASE_URL } from "..";
import toast from "react-hot-toast";

const Messages = () => {
  useGetMessages();
  useGetRealTimeMessage();
  const { messages, aimessages } = useSelector((store) => store.message);
  const { selectedUser } = useSelector((store) => store.user);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {selectedUser?.status == "Busy" ? (
        <BusyUserMessages aimessages={aimessages} />
      ) : (
        <>
          <ActiveUserMessages messages={messages} />
        </>
      )}
    </div>
  );
};
export default Messages;

const BusyUserMessages = ({ aimessages }) => {
  return (
    <div className="">
      <p>User is currently busy. Responding with an AI model:</p>
      <div className="w-20 rounded-full">
        <img
          alt="Bot Image"
          src="../../bot.png"
        />
      </div>
      {Array.isArray(aimessages) && aimessages.length > 0 ? (
        aimessages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble bg-gray-200 my-2 text-black`}>
            {msg}
          </div>
        ))
      ) : (
        <p>Type some prompt</p>
      )}
    </div>
  );
};

const ActiveUserMessages = ({ messages }) => {
  return (
    <>
      {messages &&
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}
    </>
  );
};

