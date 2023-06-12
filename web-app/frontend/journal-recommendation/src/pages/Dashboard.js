import React, { useEffect, useState } from 'react'
import {Box, CloseButton, Flex, Input} from '@chakra-ui/react'
import axios from 'axios'

const Dashboard = ({userId}) => {
  
  const [interests, setInterests] = useState([])
  const [currentTag, setCurrentTag] = useState('')

  useEffect(() => {
    fetchInterests()
  }, [])

  const fetchInterests = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/user/${userId}interest`)

      const fetched = res.data
      setInterests(fetched)

    } catch (error) {
      console.error('Could not fetch interests', error);
    }
  }

  const handleTagChange = (e) => {
    setCurrentTag(e.target.value)
    console.log(e.target.value);
  }

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
      await axios.post(`http://localhost:3001/api/user/${userId}interest`, { interests: newInterests })
      setInterests(newInterests)

    } catch (error) {
      console.log('Could not add tag, try again!');
    }
  }

  const deleteTag = async (index) => {
    try {
      const newInterests = [...interests]
      newInterests.splice(index, 1)
      await axios.put(`http://localhost:3001/api/user/${userId}interest`, { interests: newInterests })
      setInterests(newInterests)
    } catch (error) {
      console.log('Could not remove tag, try again!');
    }
  }

  return (
    <div>
      <Box p={4}>
        <Input
          placeholder="Enter interests"
          value={currentTag}
          onChange={handleTagChange}
          onKeyPress={handleTagKeyPress}
          mb={4}
        />
        <Flex flexWrap="wrap">
          {interests.map((tag, index) => (
            <Box
              key={index}
              bg="blue.200"
              color="white"
              p={2}
              borderRadius="md"
              mr={2}
              mb={2}
              display="flex"
              alignItems="center"
            >
              {tag}
              <CloseButton
                size="sm"
                ml={2}
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
