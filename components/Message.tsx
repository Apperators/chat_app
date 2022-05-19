import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

export type MessageType = {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
};

const Message: React.FC<{ message: MessageType }> = ({ message }) => {
  const authorName = message.author ? message.author.name : "Unknown author";
  return (
    <Flex p={5} shadow="md" alignItems="center" gap="4">
      <Image
        src={"https://source.unsplash.com/random/?face"}
        alt="user-avatar"
        boxSize="10"
      />

      <Box>
        <Flex color="primary.50" alignItems="center" gap="2">
          <Text fontSize="lg" fontWeight="bold">
            {authorName}
          </Text>
          <Text fontSize="sm" fontWeight="medium">
            {message.updatedAt}
          </Text>
        </Flex>
        <Text fontSize="lg" my={2}>
          {message.content}
        </Text>
      </Box>
    </Flex>
  );
};

export default Message;
