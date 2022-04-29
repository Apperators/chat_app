import { Text, Button, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import styled from "@emotion/styled";
import useUser from "../lib/useUser";
import fetchJson, { FetchError } from "../lib/fetchJson";

interface FormData {
  username: {
    value: string;
    touched: boolean;
  },
  password: {
    value: string;
    touched: boolean;
  }
}

const Layout = styled.div({
  width: "100%",
  height: "100%",
  background: "black",
  display: "flex",
  justifyContent: 'center',
  alignItems: 'center'
})


const LoginForm: React.FC = () => {
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  })
  const [formData, setFormData] = useState<FormData>({ username: { value: '', touched: false }, password: { value: '', touched: false } })
  const [errorMsg, setErrorMsg] = useState('')

  const handleUsernameChange = (e: any) => setFormData({ ...formData, username: { value: e.target.value, touched: true } })
  const handlePasswordChange = (e: any) => setFormData({ ...formData, password: { value: e.target.value, touched: true } })
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const body = {
      username: formData.username.value,
      password: formData.password.value
    }

    try {
      mutateUser(
        await fetchJson('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      )
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message)
      } else {
        console.error('An unexpected error happened:', error)
      }
    }
  }

  const isUsernameError = formData.username.value === '' && formData.username.touched
  const isPasswordError = formData.password.value === '' && formData.password.touched
  const isFormError = isUsernameError || isPasswordError

  return (
    <Layout>
      <Container maxW='xl' bg='black' centerContent border={'5px solid gray'} borderRadius={'10px'}>
        <VStack
          paddingTop={"4rem"}
          paddingBottom={"4rem"}
          bg='black'
          color='white'
          maxW='md'
          spacing={8}
          align='stretch'
        >
          <Heading as='h2' size='2xl'>
            Begin Chatting with Apperators
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl isInvalid={isFormError} onSubmit={handleSubmit}>
              <FormLabel htmlFor='username'>Username</FormLabel>
              <Input
                id='username'
                type='text'
                value={formData.username.value}
                onChange={handleUsernameChange}
                placeholder="Username"
              />
              {isUsernameError && <FormErrorMessage>Username is required.</FormErrorMessage>}
              <FormLabel mt={4} htmlFor='password'>Password</FormLabel>
              <Input
                id='password'
                type='password'
                value={formData.password.value}
                onChange={handlePasswordChange}
                placeholder="Password"
              />
              {isPasswordError && <FormErrorMessage>Password is required.</FormErrorMessage>}
            </FormControl>
            <Button
              w={"100%"}
              mt={6}
              colorScheme='blue'
              type='submit'
              disabled={isFormError}
            >
              Start Chatting Now
            </Button>
          </form>
          {errorMsg && <Text color='tomato'>Error: {errorMsg}</Text>}
        </VStack>
      </Container>
    </Layout>
  )
};

export default LoginForm;
