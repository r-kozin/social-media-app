import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LOGIN } from "../../lib/routes";
import { useAuth } from "../../hooks/auth";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Box, Flex } from "@chakra-ui/react";

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && pathname.startsWith("/protected") && !user) {
      navigate(LOGIN);
    }
  }, [pathname, user, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Flex pt={"16"} pb={"12"} mx={"auto"} w={"full"} maxW={"100vw"}>
        <Box w={"full"}>
          <Outlet />
        </Box>
        <Sidebar />
      </Flex>
    </>
  );
}
