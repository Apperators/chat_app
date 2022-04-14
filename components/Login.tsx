import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import type { GetStaticProps, NextPage } from "next";
import { useState } from "react";


const Login: React.FC = () => {
    const [input, setInput] = useState('')

    const handleInputChange = (e: any) => setInput(e.target.value)
  
    const isError = input === ''
  
    return (
      <FormControl isInvalid={isError}>
          <FormLabel htmlFor='login'>Login</FormLabel>
        <Input
          id='login'
          type='login'
          value={input}
          onChange={handleInputChange}
        />
        {!isError ? (
          <FormHelperText>
            Enter the user login.
          </FormHelperText>
        ) : (
          <FormErrorMessage>User login is required.</FormErrorMessage>
        )}
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input
          id='email'
          type='email'
          value={input}
          onChange={handleInputChange}
        />
        {!isError ? (
          <FormHelperText>
            Enter the email you'd like to receive the newsletter on.
          </FormHelperText>
        ) : (
          <FormErrorMessage>Email is required.</FormErrorMessage>
        )}
      </FormControl>
    )
};

export default Login;
