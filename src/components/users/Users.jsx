import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { useGetAllUsers } from "../../hooks/users";
import { UserCard } from "./UserCard";

export const Users = () => {
    const { users, isLoading } = useGetAllUsers();

    if (isLoading) return "Loading...";


  return (
    <SimpleGrid columns={[2, 3, 4]} spacing={[2, 3]} px={"10px"} py={"6"}>
      {users?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </SimpleGrid>
  );
};
