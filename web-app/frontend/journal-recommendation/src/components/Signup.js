import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'

const Signup = () => {
  const toast = useToast() 


  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmpassword, setConfirmpassword] = useState()

  const handleClick = () => setShow(!show)
  const handleClick1 = () => setShow1(!show1)
  const submitHandler = async () => {
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      return
    }

    if (password != confirmpassword)
    {
       toast({
        title: "Passwords Do Not Match",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    console.log(name, email, password);

    try {
      const config = {
        headers: {
          "Content-Type" : "application/json"
        }
      }

      const { data } = await axios.post(
        "http://localhost:3001/api/user",
        { name, email, password },
        config
      )
      
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
        
      
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem('userId', data._id);

      
    } catch (error) {
      console.log(error)
      console.log(error.response)
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }

  return (
    <div>
      <VStack spacing={'5px'} color={'black'}>
            <FormControl id = 'first-nmae' isRequired>
                <FormLabel fontSize='lg'>Name</FormLabel>
                    <Input
                        autoComplete='on'
                    placeholder="Enter you Name"
                    onChange = {(e) => setName(e.target.value)}
                />
            </FormControl>
            <br></br>
            <FormControl id = 'email' isRequired>
                <FormLabel fontSize='lg'>Email</FormLabel>
                    <Input
                    autoComplete='on'
                    placeholder="Enter you Email"
                    onChange = {(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <br></br>
            <FormControl id = 'password' isRequired>
                <FormLabel fontSize='lg'>Password</FormLabel>
                <InputGroup>
                      <Input 
                        type={show ? 'text' : 'password'}
                    placeholder="Enter you Email"
                    onChange = {(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                    </Button>
                    </InputRightElement>
                    
                </InputGroup>
                
            </FormControl>
            <br></br>
            <FormControl id = 'Confirmpassword' isRequired>
                <FormLabel fontSize='lg'>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show1 ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    onChange = {(e) => setConfirmpassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick1}>
                    {show1 ? "Hide" : "Show"}
                    </Button>
                    </InputRightElement>
                    
                </InputGroup>       
            </FormControl>
        <Button
                fontSize='xl'
                colorScheme="blue"
                width="100%"
                color={'white'}
                style={{ marginTop: 20, p: '15px' }}
                onClick={submitHandler}
            >
                Sign Up
        </Button>
        </VStack>
    </div>
  )
}

export default Signup
