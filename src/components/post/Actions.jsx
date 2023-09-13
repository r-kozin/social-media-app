import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";

export default function Actions() {
  return (
    <Flex p={"2"} justifyContent={"space-between"} borderTop={"2px solid #ccc"}>
      {/* <LikeButton /> */}
      <Flex alignItems={'center'}>
        <IconButton size='md' colorScheme="red" variant={'ghost'}/>
        </Flex>
      {/* <CommentButton /> */}
      {/* <ShareButton /> */}
    </Flex>
  );
}
