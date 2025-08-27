import React,{useState} from "react";
import { List, ListItem, Typography } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

// import PendingIcon from "@mui/icons-material/Pending";
// import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
// import PendingRoundedIcon from '@mui/icons-material/PendingRounded';
// import PendingTwoToneIcon from '@mui/icons-material/PendingTwoTone';
// import PendingSharpIcon from '@mui/icons-material/PendingSharp';


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

function Notification() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className="w-96 bg-white rounded-lg z-50 flex flex-col"
      style={{
        height: "calc(100vh - 32px)",
        boxShadow: "-4px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" className="text-black pb-2" style={{ position: "sticky", top: 0, zIndex: 10, padding: "16px" }}>
        Updates
      </Typography>

      <div className="flex-grow overflow-y-auto">
        <span className="px-4 text-xl">Seen</span>

        <List sx={{ width: "90%", maxWidth: 360, margin: "0 8px" }}>
          {[
            {
              img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
              title: "Puppies picture",
              desc: "for you",
              time: "2d",
            },
            {
              img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
              title: "Work updates",
              desc: "just now",
              time: "3d",
            },
            {
              img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
              title: "New feature",
              desc: "launched",
              time: "1d",
            },
          ].map((item, index) => (
            <ListItem
              key={index}
              className="hover:bg-[#eaeaea] hover:rounded-2xl ml-2 cursor-pointer group"
              style={{ display: "flex", alignItems: "center", padding: "8px" }}
            >
              <img src={item.img} alt="Notification" className="rounded-lg" style={{ width: "54px", height: "72px", objectFit: "cover" }} />

              <div className="flex-1 mx-2">
                <span className="font-medium">{item.title}{" "}</span>
                <span className="font-light">{item.desc}</span>
              </div>

              {/* Pending Icon and Time in Vertical Flex */}
              <div className="flex flex-col items-center gap-1 transition-opacity duration-200" style={{paddingRight:"8px"}}>
                <Typography variant="caption" className="text-gray-500" style={{ fontSize: "12px" }}>
                  {item.time}
                </Typography>
                {/* <div className="bg-amber-200"> */}
                <svg onClick={handleClick} className=" w-7 h-7 cursor-pointer opacity-0 group-hover:opacity-100 text-white" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PendingOutlinedIcon">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2M7 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5m5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5m5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5"></path>
                <circle cx="7" cy="12" r="1.5" style={{fill:"white"}}></circle>
                <circle cx="12" cy="12" r="1.5" style={{fill:"white"}}></circle>
                <circle cx="17" cy="12" r="1.5" style={{fill:"white"}}></circle>
                </svg>
                {/* </div> */}
              </div>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} disableRipple>
                  <EditIcon />
                  Edit
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                  <FileCopyIcon />
                  Duplicate
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleClose} disableRipple>
                  <ArchiveIcon />
                  Archive
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                  <MoreHorizIcon />
                  More
                </MenuItem>
              </StyledMenu>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}

export default Notification;