/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import GlobalModal from "../common-modal";
import { Toaster } from "sonner";
import Sidebar from "./sidebar";
import { useLocation } from "react-router-dom";
import { setupAutoReload } from "@/utils/idleReload";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { useSystemService } from "@/hooks/useSystemService";
import { openModal } from "@/store/slices/modal-slice";
import { useAppDispatch } from "@/hooks/hooks";
import ThemeToggle from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const location = useLocation();
  const isOnline = useNetworkStatus();
  const { error, loading } = useSystemService();
  const dispatch = useAppDispatch();
  const isHideSidebar = location.pathname === "/kitchen-monitor";
  useEffect(() => {
    setupAutoReload(10);
  }, [loading]);

  useEffect(() => {
    if (!error) {
      return;
    }

    dispatch(
      openModal({
        title: "",
        template: "ERROR",
        content: "",
      })
    );
  }, [dispatch, error]);

  return (
    <>
      <div className="flex bg-background text-foreground">
        {!isHideSidebar && <Sidebar />}
        <div
          className={cn(
            "flex flex-col min-h-screen flex-grow transition-all duration-300",
            !isHideSidebar ? "ml-[60px]" : "ml-0"
          )}
        >
          {/* <section className="w-full p-3 bg-blue-500 text-white text-center">
            Develop version
          </section> */}
          {!isOnline ? (
            <section
              className={`w-full p-1  text-white text-center font-semibold bg-red-600 !text-sm`}
            >
              You are offline
            </section>
          ) : (
            ""
          )}
          <main className="flex-1 flex flex-col gap-6 p-4 my-container">
            <div className="flex justify-end">
              <ThemeToggle />
            </div>
            {children}
          </main>
          <footer className="bg-secondary text-secondary-foreground p-4 transition-colors"></footer>
        </div>
      </div>

      {/* global ui */}
      <GlobalModal />
      <Toaster position="top-right" richColors />

      {/* <LoadingOverlay /> */}
    </>
  );
};

export default Layout;
