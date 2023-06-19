import React, { useEffect, useState } from 'react'
import {Box, CloseButton, Flex, Input} from '@chakra-ui/react'
import axios from 'axios'
import Header from '../components/Header'



const Dashboard = () => {
  
  const [interests, setInterests] = useState([])
  const [currentTag, setCurrentTag] = useState('')
  const [userId, setUserId] = useState('')

  // fetching the user id after login (which is stored in login.js) soon after dashboard page opens.
  useEffect(() => {
  const storedUserId = localStorage.getItem('userId');
  setUserId(storedUserId);
}, []);

  // fetching interest after fetching userid
useEffect(() => {
  if (userId) {
    fetchInterests();
  }
}, [userId]);

  const uid = userId 

  const fetchInterests = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/user/${uid}/interest`)

      const fetched = res.data
      setInterests(fetched)

    } catch (error) {
      console.error('Could not fetch interests', error);
    }
  }

  // event listener of search box
  const handleTagChange = (e) => {
    setCurrentTag(e.target.value)

  }

  //event listener on enter press that calls a function to display the entered
  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter' && currentTag.trim() !== '')
    {
      displayTag(currentTag)
      setCurrentTag('')
    }
  }

  const displayTag = async (tag) => {
    try {
      const newInterests = [...interests, tag]
      await axios.post(`http://localhost:3001/api/user/${uid}/interest`, { interests: newInterests })
      setInterests(newInterests)
      fetchInterests()

    } catch (error) {
      console.log('Could not add tag, try again!');
    }
  }

  const deleteTag = async (index) => {
    console.log(index);
    try {
      const newInterests = [...interests]
      newInterests.splice(index, 1)
      await axios.put(`http://localhost:3001/api/user/${uid}/interest`, { interests: newInterests })
      setInterests(newInterests)
      fetchInterests()
    } catch (error) {
      console.log('Could not remove tag, try again!');
    }
  }

  return (
    <div>
      <Header userId={uid} />
      <Box p={4}>
        <Input
          placeholder="Enter interests"
          value={currentTag}
          onChange={handleTagChange}
          onKeyPress={handleTagKeyPress}
          marginTop='40vh'
          w='50%'
          fontSize='1.5rem'
          mb={4}
          h='50px'
        />
        <Flex flexWrap="wrap" marginLeft='30vw' marginRight='30vw'>
          {interests.map((tag, index) => (
            <Box
              key={index}
              bg="blue.200"
              color="white"
              fontSize='20px'
              p={2}
              borderRadius="md"
              fontWeight='semibold'
              mr={2}
              mb={2}
              display="flex"
              alignItems="center"
            >
              {tag}
              <CloseButton
                size="sm"
                ml={2.5}
                onClick={() => deleteTag(index)}
              />
            </Box>
          ))}
        </Flex>
      </Box>
    </div>
  )
}

export default Dashboard
