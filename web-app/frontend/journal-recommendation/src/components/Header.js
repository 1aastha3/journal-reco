import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Link,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from "@chakra-ui/icons";
import axios from 'axios';

const Header = ({ userId }) => {

    const [showModal, setShowModal] = useState(false)
    const [recommendations, setRecommendations] = useState([])

    const handleLogout = async() => {
      try {
          await axios.post('http://localhost:3001/api/user/logout')
          window.location.href = '/'
      } catch (error) {
        console.error('Failed to logout:', error)
      }
    }
  
    const handleMyRecommendations = async() => {
      setShowModal(true)
      try
      {
          const res = await axios.get(`http://localhost:3001/api/user/recommendations/${userId}`)
          setRecommendations(res.data)
          console.log(recommendations)
      }
      catch (error) {
          console.error('Failed to fetch recommendations:', error)
        }
    }

  return (
    <Flex textAlign="center" justify="space-between" p={4} bg='blue.300'>
      <Text fontSize="2xl" fontWeight="bold" justifyI='center' color='white'>
        Journal-Recommender |
      </Text>
      <Flex align="center">
        <Menu>    
          <MenuButton as={Button} onClick={handleMyRecommendations} fontSize='1.2rem' bg='blue.100' >My Recommendations</MenuButton>
          <MenuButton as={Button} onClick={handleLogout} fontSize='1.2rem' bg='blue.100' ml="10px">Logout</MenuButton>
        </Menu>  
      </Flex>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent maxW="1000px">
          <ModalHeader>My Recommendations</ModalHeader>
          <ModalCloseButton />
          <ModalBody justifyContent='center'>
            {recommendations.map((article, index) => (
              <div key={index}>
                <h3>{article.title}</h3>
                <Link href={article.url} isExternal color="blue">Read me<ExternalLinkIcon mx="2px" />
                </Link>
                <br></br>
                <hr />
                <br></br>
              </div>
            ))}
          </ModalBody>
          </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Header
