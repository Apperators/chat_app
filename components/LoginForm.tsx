import { Button, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, VStack } from "@chakra-ui/react";
import router from "next/router";
import { useState } from "react";
import styled from "@emotion/styled";

interface FormData {
  email: {
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
  const [formData, setFormData] = useState<FormData>({ email: { value: '', touched: false }, password: { value: '', touched: false } })

  const handleEmailChange = (e: any) => setFormData({ ...formData, email: { value: e.target.value, touched: true } })
  const handlePasswordChange = (e: any) => setFormData({ ...formData, password: { value: e.target.value, touched: true } })
  const handleSubmit = (e: any) => {
    setFormData({ ...formData, email: { ...formData.email, touched: true }, password: { ...formData.password, touched: true } })
    e.preventDefault()
    console.log(formData)
    router.push('/');
  }

  const isEmailError = formData.email.value === '' && formData.email.touched
  const isPasswordError = formData.password.value === '' && formData.password.touched
  const isFormError = isEmailError || isPasswordError

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
              <FormLabel htmlFor='email'>Email</FormLabel>
              <Input
                id='email'
                type='email'
                value={formData.email.value}
                onChange={handleEmailChange}
                placeholder="Email"
              />
              {isEmailError && <FormErrorMessage>Email is required.</FormErrorMessage>}
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
        </VStack>
      </Container>
    </Layout>
  )
};

export default LoginForm;
