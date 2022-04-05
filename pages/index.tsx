import styled from "@emotion/styled";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import prisma from "../lib/prisma";
import Message, { MessageProps } from "../components/Message";
import SocketIOClient from "./SocketIOClient";

export const getStaticProps: GetStaticProps = async () => {
  const msgs = await prisma.message.findMany({
    include: {
      author: true,
    },
  });

  const messages = msgs.map((msg) => ({
    ...msg,
    createdAt: msg.createdAt.toISOString(),
    updatedAt: msg.updatedAt.toISOString(),
    author: {
      ...msg.author,
      createdAt: msg.author.createdAt.toISOString(),
      updatedAt: msg.author.updatedAt.toISOString(),
    },
  }));

  return { props: { messages } };
};

const Header = styled.h1`
  color: blue;
  line-height: 1.15;
  font-size: 4rem;
`;

type Props = {
  messages: MessageProps[];
};

const Home: NextPage<Props> = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Devin Chat App</title>
        <meta
          name="description"
          content="This is for the almighty Devin Chat App"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header>Chat App</Header>
        {props.messages.map((message) => (
          <div key={message.id} className="message">
            <Message message={message} />
          </div>
        ))}
      </main>
      <SocketIOClient />
      <footer className={styles.footer}>Apperators 2022</footer>
    </div>
  );
};

export default Home;
