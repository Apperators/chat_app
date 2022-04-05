import React from "react";
import styled from "@emotion/styled";

export type MessageProps = {
  id: string;
  content: string;
  authorId: string;
  author: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
};

const Card = styled.div`
  padding: 10px;
  margin: 10px;
  border: 2px red solid;
  color: green;
  line-height: 1.5;
  font-size: 1rem;
`;

const Message: React.FC<{ message: MessageProps }> = ({ message }) => {
  const authorName = message.author ? message.author.name : "Unknown author";
  return (
    <Card onClick={() => console.log("clicked the message!")}>
      <small>{message.author.updatedAt}</small>
      <h2>{message.content}</h2>
      <small>By {authorName}</small>
    </Card>
  );
};

export default Message;
