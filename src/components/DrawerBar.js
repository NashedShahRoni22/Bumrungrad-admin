import React from "react";
import { Drawer, IconButton } from "@material-tailwind/react";
import logo from "../images/nav_logo.png";
import { LeftBar } from "./LeftBar";

export function DrawerBar({ open, closeDrawer }) {
  return (
    <React.Fragment>
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <img src={logo} alt="" className="w-[180px]" />
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <LeftBar />
      </Drawer>
    </React.Fragment>
  );
}
