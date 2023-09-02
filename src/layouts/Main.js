import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { DrawerBar } from "../components/DrawerBar";
import { LeftBar } from "../components/LeftBar";

export default function Main() {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  return (
    <main>
      <Header openDrawer={openDrawer} />
      <DrawerBar
        open={open}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
      />
      <section className="lg:flex">
        <div className="hidden lg:block lg:fixed left-0 h-full">
          <LeftBar />
        </div>
        <div className="lg:flex-1 lg:ml-[320px] bg-silver min-h-screen">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
