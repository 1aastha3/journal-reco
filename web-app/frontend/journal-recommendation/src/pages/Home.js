import React from 'react'
import {
  Box,
  Container,
  Text,
  Tab,
  TabPanel,
  TabPanels,
  TabList,
  Tabs
} from '@chakra-ui/react'
import Login from '../components/Login'
import Signup from '../components/Signup'
import { useEffect } from 'react'

// start page needs to navigate to the dashboard automatically once sign up is successful

const Home = () => {

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
  }, []);

  return (
    <div>
      <Container maxW="xl" centreContent>
        <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="sans serif" as='b'>
          IEEE/Springer Paper Recommendation
        </Text>
        </Box>
        <br></br>
        <br></br>
        <br></br>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1.5px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1.5em">
            <Tab fontFamily='sans-serif' fontSize='xl'>Login</Tab>
            <Tab fontFamily='sans-serif' fontSize='xl'>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      </Container>
    </div>
  )
}

export default Home
