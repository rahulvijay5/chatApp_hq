import React, { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";
import { BASE_URL } from "..";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const { otherUsers } = useSelector((store) => store.user);
  const { authUser } = useSelector((store) => store.user);

  const [user, setUser] = useState({
    userId: "",
    status: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const statusHandler = async () => {
    try {
      setUser((prevUser) => ({
        ...prevUser,
        status: prevUser.status === "Busy" ? "Available" : "Busy",
      }));

      const response = await axios.post(
        `${BASE_URL}/api/v1/user/updatestatus`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.user.status);
      setStatus(response.data.user.status);
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  useEffect(() => {
    setUser({
      userId: authUser?._id,
      status: "",
    });
    const fetchUserStatus = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/user/status`, {
          withCredentials: true,
        });
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching user status:", error);
      }
    };
    fetchUserStatus();
  }, []);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setMessages(null));
      dispatch(setOtherUsers(null));
      dispatch(setSelectedUser(null));
    } catch (error) {
      console.log(error);
    }
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error("User not found!");
    }
  };
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <form
        onSubmit={searchSubmitHandler}
        action=""
        className="flex items-center gap-2"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-md"
          type="text"
          placeholder="Search..."
        />
        <button type="submit" className="btn bg-zinc-700 text-white">
          <BiSearchAlt2 className="w-6 h-6 outline-none" />
        </button>
      </form>
      <div className="divider px-3"></div>
      <div className="text-center">Current Status: {status}</div>
      <div className="divider px-3"></div>
      <OtherUsers />
      <div className="flex gap-2 items-center justify-center">
        <div className="mt-2">
          <button onClick={logoutHandler} className="btn btn-sm">
            Logout
          </button>
        </div>
        <div className="mt-2">
          <div
            className="tooltip"
            data-tip="Enables you to alter your own status."
          >
            <button onClick={statusHandler} className="btn btn-sm">
              {status === "Busy" ? "Make Available" : "Make Busy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
