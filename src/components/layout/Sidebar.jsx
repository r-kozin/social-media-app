import { Box, Button, Code, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { USERS, PROTECTED } from "../../lib/routes.jsx";
import { useAuth } from "../../hooks/auth.jsx";
import Avatar from "../profile/Avatar.jsx";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ActiveUser() {
  const { user, isLoading } = useAuth();
  const { pathname } = useLocation();
  const [sidebarButtonText, setSidebarButtonText] = useState("Profile")
  const [onEditProfile, setOnEditProfile] = useState(false)
  const [onProfile, setOnProfile] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && pathname == ("/protected/profile/" + user.id + "/edit")) {
      setSidebarButtonText("Editting Profile")
      setOnProfile(true)
      setOnEditProfile(true)
    }
    if (!isLoading && pathname == ("/protected/profile/" + user.id)) {
      setSidebarButtonText("Edit Profile")
      setOnProfile(true)
      setOnEditProfile(false)
    }
    if (!isLoading && !pathname.startsWith("/protected/profile/" + user.id)) {
      setSidebarButtonText("View Profile")
      setOnProfile(false)
      setOnEditProfile(false)
    }
  }, [pathname, user, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function handleSidebarButtonClick() {
    if (onProfile && pathname == ("/protected/profile/" + user.id)) {
      console.log("edit profile button clicked")
      navigate(`${PROTECTED}/profile/${user.id}/edit`)
    } else if (onProfile && pathname == ("/protected/profile/" + user.id + "/edit")) {
      console.log("editting profile button clicked")
    } else {
      navigate(`${PROTECTED}/profile/${user.id}`)
    }
  }

  return (
    <Stack align={"center"} spacing={"5"} my={"8"}>
      <Avatar user={user} />
      <Code>@{user.username}</Code>
      <Button
        colorScheme={"teal"}
        width={"full"}
        onClick={handleSidebarButtonClick}
        isDisabled={onEditProfile}
      >
        {sidebarButtonText}
      </Button>
    </Stack>
  );
}

export const Sidebar = () => {
  return (
    <Box
      px={"6"}
      height={"100vh"}
      w={"100%"}
      maxW={"300px"}
      borderLeft={"1px solid"}
      borderLeftColor={"teal.100"}
      position={"sticky"}
      top={"16"}
      display={{ base: "none", md: "block" }}
    >
      <Box align={"center"}>
        <ActiveUser />
        <Box as={"ul"} borderBottom={"2px solid"} borderColor={"teal.200"} />
        <Button
          variant={"outline"}
          colorScheme={"teal"}
          as={Link}
          to={USERS}
          mt={"4"}
          size={"sm"}
        >
          ALL USERS
        </Button>
      </Box>
    </Box>
  );
};
