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
  Rating
} from '@chakra-ui/react'
import { ExternalLinkIcon } from "@chakra-ui/icons"
import axios from 'axios'
import StarRating from './Star'

const Header = ({ userId }) => {
  const [showModal, setShowModal] = useState(false)
  const [recommendations, setRecommendations] = useState([])
  const [ratings, setRatings] = useState([])

  useEffect(() => {
    const storedRatings = recommendations.map((article) => {
      const storedRating = localStorage.getItem(`rating_${article._id}`)
      return storedRating ? parseInt(storedRating) : 0
    })
    setRatings(storedRatings)
  }, [recommendations])

  const handleRatingChange = async (index, ratingValue) => {
    const updatedRatings = [...ratings]
    updatedRatings[index] = ratingValue
    setRatings(updatedRatings)

    const article = recommendations[index]

    try {
      await axios.put(`http://localhost:3001/api/user/${userId}/recommendations/${article._id}`, {
        rating: ratingValue
      });
      localStorage.setItem(`rating_${article._id}`, ratingValue.toString())
      console.log(`Rating updated for article: ${article._id}`)
    } catch (error) {
      console.error('Failed to update rating:', error)
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/user/logout')
      window.location.href = '/'
    } catch (error) {
      console.error('Failed to logout:', error)
    }
  };

  const handleMyRecommendations = async () => {
    setShowModal(true)
    try {
      const res = await axios.get(`http://localhost:3001/api/user/recommendations/${userId}`)
      setRecommendations(res.data)
      console.log(recommendations)
    } catch (error) {
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
          <MenuButton as={Button} onClick={handleMyRecommendations} fontSize='1.2rem' bg='blue.100'>My Recommendations</MenuButton>
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
                <Flex align="center" justify="space-between">
                  <Link href={article.url} isExternal color="blue">Read me<ExternalLinkIcon mx="2px" /></Link>
                  <StarRating
                    rating={ratings[index]}
                    setRating={(ratingValue) => handleRatingChange(index, ratingValue)}
                  />
                </Flex>
                <br />
                <hr />
                <br />
              </div>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Header;
