import type { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Message, { MessageType } from "../components/Message";
import SocketIOClient from "../components/SocketIOClient";
import { Heading } from "@chakra-ui/react";
import { User } from "./api/user";
import { withSessionSsr } from "../lib/withSession";
import useMessages from "../lib/useMessages";
import useUser from "../lib/useUser";
import fetchJson from "../lib/fetchJson";
import { useRouter } from "next/router";

const Home = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { messages } = useMessages(user);
  const { mutateUser } = useUser();
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Apperators Chat App</title>
        <meta
          name="description"
          content="This is for the almighty Devin Chat App"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Heading as="h1" size="3xl">
          Chat App
        </Heading>
        <Heading as="h4" size="lg">
          Logged in as: {user?.username}
        </Heading>
        {messages.map((message: MessageType) => (
          <div key={message.id} className="message">
            <Message message={message} />
          </div>
        ))}
      </main>
      <a
        href="/api/logout"
        onClick={async (e) => {
          e.preventDefault()
          mutateUser(
            await fetchJson('/api/logout', { method: 'POST' }),
            false
          )
          router.push('/login')
        }}
      >
        Logout
      </a>
      <SocketIOClient />
      <footer className={styles.footer}>Apperators 2022</footer>
    </div>
  );
};

export default Home;

export const getServerSideProps = withSessionSsr(async function ({ req, res }) {
  const user = req.session.user;
  console.log("🤹‍♂️ user session:", user);
  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: { isLoggedIn: false, username: "" } as User,
      },
    };
  }

  return {
    props: { user: req.session.user },
  };
});
