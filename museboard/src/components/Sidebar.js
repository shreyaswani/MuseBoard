import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Explore,
  ExploreOutlined,
  AddBox,
  AddBoxOutlined,
  Notifications,
  NotificationsNoneOutlined,
  Chat,
 ChatBubbleOutlineOutlined,
} from "@mui/icons-material";
import { List, ListItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Logo from "../../public/logo.png";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from '@mui/material/Typography';
import Notification from "../components/Notification"
import { motion } from "framer-motion";
import Messages from "./Messages";

const NotificationPopup = ({ isOpen }) => {
  return (
    <motion.div
      className="absolute left-20 top-0 ml-4 bg-white shadow-sm rounded-lg"
      style={{ marginTop: "16px",marginBottom: "16px" }}
      initial={{ opacity: 0 }} 
      animate={{ opacity: isOpen ? 1 : 0}} 
      transition={{ duration: 0.2 }} 
    >
      <Notification />
    </motion.div>
  );
};

const MessagePopup = ({ isOpen }) => {
  return (
    <motion.div
      className="absolute left-20 top-0 ml-4 bg-white shadow-sm rounded-lg"
      style={{ marginTop: "16px",marginBottom: "16px" }}
      initial={{ opacity: 0 }} 
      animate={{ opacity: isOpen ? 1 : 0}} 
      transition={{ duration: 0.2 }} 
    >
      <Messages />
    </motion.div>
  );
};


const TooltipCustom = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#000", 
    color: "#fff", 
    fontSize: theme.typography.pxToRem(9),
    borderRadius: "6px",
    padding: "6px 10px",
  },
}));


function Sidebar() {
  const location = useLocation();
  const [activeOverlay, setActiveOverlay] = useState({
    activeIcon: "home", 
    notifications: false,
    messages: false,
  });

  const toggleOverlay = (type) => {
    setActiveOverlay((prev) => ({
      activeIcon: type, 
      notifications: type === "notifications" ? !prev.notifications : false,
      messages: type === "messages" ? !prev.messages : false,
    }));
  };

  return (
    <div className="w-20 h-screen fixed bg-white inset-0 z-50 border-r border-[#E9E9E9] flex flex-col items-center py-2">
      <List className="flex flex-col items-center gap-4">
        <Avatar className="flex justify-center" src={Logo}></Avatar>

        <ListItem className="flex justify-center">
          <NavLink to="/" onClick={() => toggleOverlay("home")}>
          <TooltipCustom title={
                        <React.Fragment>
            <Typography color="inherit" fontSize={14}>Home</Typography>
          </React.Fragment>
        }
          placement="right"
            >
            {activeOverlay.activeIcon === "home" ? (
              <Home
                className="text-black p-2 rounded-lg hover:bg-[#eaeaea] cursor-pointer"
                sx={{ fontSize: "44px" }}
              />
            ) : (
              <HomeOutlined
                className="text-black opacity-80 p-2 rounded-lg hover:bg-[#eaeaea] cursor-pointer"
                sx={{ fontSize: "44px" }}
              />
            )}
            </TooltipCustom>
          </NavLink>
        </ListItem>

        <ListItem className="flex justify-center">
          <NavLink to="/explore" onClick={() => toggleOverlay("explore")}>
          <TooltipCustom title={
                        <React.Fragment>
            <Typography color="inherit" fontSize={14}>Explore</Typography>
          </React.Fragment>
        }
          placement="right"
            >
            {activeOverlay.activeIcon === "explore" ? (
              <Explore
                className="text-black p-2 rounded-lg hover:bg-[#eaeaea] cursor-pointer"
                sx={{ fontSize: "42px" }}
              />
            ) : (
              <ExploreOutlined
                className="text-black opacity-80 p-2 rounded-lg hover:bg-[#eaeaea] cursor-pointer"
                sx={{ fontSize: "42px" }}
              />
            )}
            </TooltipCustom>
          </NavLink>
        </ListItem>

        <ListItem className="flex justify-center">
          <NavLink to="/add" onClick={() => toggleOverlay("create")}>
          <TooltipCustom title={
                        <React.Fragment>
            <Typography color="inherit" fontSize={14}>Create</Typography>
          </React.Fragment>
        }
          placement="right"
            >
            {activeOverlay.activeIcon === "create" ? (
              <AddBox
                className="text-black p-2 rounded-lg hover:bg-[#eaeaea] cursor-pointer"
                sx={{ fontSize: "42px" }}
              />
            ) : (
              <AddBoxOutlined
                className="text-black opacity-80 p-2 rounded-lg hover:bg-[#eaeaea] cursor-pointer"
                sx={{ fontSize: "42px" }}
              />
            )}
            </TooltipCustom>
          </NavLink>
        </ListItem>

        <ListItem className="flex justify-center" onClick={() => toggleOverlay("notifications")}>
            <TooltipCustom title={
                        <React.Fragment>
            <Typography color="inherit" fontSize={14}>Notifications</Typography>
          </React.Fragment>
        }
          placement="right"
            >
              <Badge
                color="primary"
                variant="dot"
                overlap="circular"
                sx={{
                  "& .MuiBadge-badge": {
                    transform: "translate(10%, -10%)",
                    background: "#E60022",
                  },
                }}
              >
                {activeOverlay.notifications ? (
                  <Notifications
                    className="text-black p-2 rounded-lg hover:bg-[#eaeaea] cursor-pointer"
                    sx={{ fontSize: "42px" }}
                  />
                ) : (
                  <NotificationsNoneOutlined
                    className="text-black opacity-80 p-2 rounded-lg hover:bg-[#eaeaea] cursor-pointer"
                    sx={{ fontSize: "42px" }}
                  />
                )}
              </Badge>
            </TooltipCustom>
        </ListItem>

        <ListItem className="flex justify-center" onClick={() => toggleOverlay("messages")}>
          <TooltipCustom title={
                        <React.Fragment>
            <Typography color="inherit" fontSize={14}>Messages</Typography>
          </React.Fragment>
        }
          placement="right"
            >
            <Badge
              color="primary"
              badgeContent={0}
              sx={{
                "& .MuiBadge-badge": {
                  transform: "translate(0%, -0%)",
                  background: "#E60022",
                  fontSize: "10px",
                  height: "17px",
                  minWidth: "17px",
                },
              }}
            >
              {activeOverlay.messages ? (
                <Chat
                  className="text-black p-2 rounded-lg hover:bg-[#eaeaea] cursor-pointer"
                  sx={{ fontSize: "42px" }}
                />
              ) : (
                <ChatBubbleOutlineOutlined
                  className="text-black opacity-80 p-2 rounded-lg hover:bg-[#eaeaea] cursor-pointer"
                  sx={{ fontSize: "42px" }}
                />
              )}
            </Badge>
            </TooltipCustom>
        </ListItem>
      </List>
  <NotificationPopup isOpen={activeOverlay.notifications} />
  <MessagePopup isOpen={activeOverlay.messages} />
  </div>
  );
}

export default Sidebar;
