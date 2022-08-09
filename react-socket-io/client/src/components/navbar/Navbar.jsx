import React, { useEffect, useState } from "react";
import "./navbar.css";
import Notification from "../../img/notification.svg";
import Message from "../../img/message.svg";
import Settings from "../../img/settings.svg";

const Navbar = ({ socket }) => {
  const [notification, setNotification] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotification((prev) => [...prev, data]);
    });
  }, [socket]);
  console.log(notification);
  const displayNotifications = (n, idx) => {
    let action;
    if (n.type === 1) {
      action = "liked";
    } else if (n.type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }

    return <span key={idx} className="notification">{`${n.senderName} ${action} your post`}</span>;
  };
  return (
    <div className="navbar">
      <span className="logo">HI</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Notification} alt="" className="iconImg" />
          <div className="counter">2</div>
        </div>
        <div className="icon">
          <img src={Message} alt="" className="iconImg" />
          <div className="counter">2</div>
        </div>
        <div className="icon">
          <img src={Settings} alt="" className="iconImg" />
          <div className="counter">2</div>
        </div>
      </div>
      {open ? (
        <>
          <div className="notifications">{notification.map((n, idx) => displayNotifications(n, idx))}</div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navbar;
