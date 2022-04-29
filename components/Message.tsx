import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

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
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading fontSize="md">{authorName}</Heading>
      <Text fontSize="lg" my={4}>
        {message.content}
      </Text>
      <Text fontSize="sm">{message.updatedAt}</Text>
    </Box>
  );
};

export default Message;
