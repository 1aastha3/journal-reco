import { FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const toast = useToast()
  const navigate = useNavigate();

  const handleClick = () => setShow(!show)

  const submitHandler = async () => {
    if (!email || !password) {
      toast({
        title: "Please fill up all the fields",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
      return
    }

    try {

      const config = {
        headers: {"Content-Type" : "application/json"},
      }
      const { data } = await axios.post(
        "http://localhost:3001/api/user/login",
        { email, password },
        config
      )
      const userId  = data._id
      
      console.log(JSON.stringify(data))
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      navigate("/dashboard")
      localStorage.setItem("userInfo", JSON.stringify(data)) // storing user object in the localstorage for
      localStorage.setItem('userId', userId);
      
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
     
    }
  }
  return (
    <div>
      <VStack spacing="10px">
        <FormControl id="email" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            value={email}
            type='email'
            placeholder='Enter your email id'
            onChange={(e) => setEmail(e.target.value)}>
          </Input>
        </FormControl>
        <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
      </VStack>
    </div>
  )
}

export default Login
