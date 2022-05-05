import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import LoginForm from "../components/LoginForm";

const Login: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Apperators Chat App</title>
                <meta
                    name="Login Page"
                    content="Login to Start Chatting"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LoginForm />
        </div>
    );
};

export default Login;