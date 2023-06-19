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
} from '@chakra-ui/react';
import axios from 'axios';

const Header = ({ userId }) => {
    
    const [showModal, setShowModal] = useState(false);
    const [recommendations, setRecommendations] = useState([]);



  const handleLogout = async() => {
     try {
         await axios.post('http://localhost:3001/api/user/logout');
         window.location.href = '/';
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };


    
  const handleMyRecommendations = async() => {
    setShowModal(true);
    try
    {
        const res = await axios.get(`http://localhost:3001/api/user/recommendations/${userId}`)
        setRecommendations(res.data)
        console.log(recommendations);
    }
    catch (error) {
        console.error('Failed to fetch recommendations:', error);
      }
  };

  return (
    <Flex textAlign="center" justify="space-between" p={4} bg='blue.300'>
      <Text fontSize="2xl" fontWeight="bold" justifyI='center' color='white'>
        Journal-Recommender |
      </Text>
      <Flex align="center">
        <Menu>
          <MenuButton as={Avatar} size="sm" />
          <MenuList >
            <MenuItem onClick={handleLogout} fontSize='1.2rem' bg='blue.50'>Logout</MenuItem>
            <MenuItem onClick={handleMyRecommendations} fontSize= '1.2rem' bg='blue.50'>My Recommendations</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>My Recommendations</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {recommendations.map((article, index) => (
              <div key={index}>
                <h3>{article.title}</h3>
                <a href={article.url.value} target="_blank" rel="noopener noreferrer">
                  Click to read the article
                </a>
                <hr />
              </div>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Header;
