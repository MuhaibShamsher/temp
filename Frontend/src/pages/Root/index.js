import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarSkeleton from "../../components/SidebarSkeleton";

const RootLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 991);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 991);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setSidebarOpen]);

  return (
    <SidebarSkeleton>
      <Outlet />
    </SidebarSkeleton>
  );
};

export default RootLayout;
