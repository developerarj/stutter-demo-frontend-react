import React, { useEffect, useState } from 'react';
import {
  Wrap,
  WrapItem,
  Box,
  Text,
  Flex,
  Spacer,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Stack,
  Heading,
  Skeleton,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  addClassification,
  getClassifications,
  deleteClassification,
} from '../../services/Admin';

const Classification = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [classifications, setClassifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getClassifications();

      if (res.status === 200) {
        setClassifications(res.data.classifications); // Adjust according to your API response structure
        setLoading(false);
      } else {
        setError('Failed to fetch classifications');
        setLoading(false);
      }
    } catch (error) {
      setError('An error occurred while fetching classifications');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddClassification = async () => {
    if (title) {
      setLoading(true); // Set loading to true when starting the operation
      try {
        const response = await addClassification(title);

        if (response.status === 201) {
          fetchData();
        }
      } catch (error) {
        setError('An error occurred while adding classification');
      } finally {
        setLoading(false); // Set loading to false after operation completes
        onClose(); // Close the modal regardless of success or failure
      }
    }
  };

  const handleDeleteClassification = async id => {
    setLoading(true); // Set loading to true when starting the operation
    try {
      const res = await deleteClassification(id);

      if (res.status === 200) {
        fetchData();
      }
    } catch (error) {
      setError('An error occurred while deleting classification');
    } finally {
      setLoading(false); // Set loading to false after operation completes
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Classification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input value={title} onChange={e => setTitle(e.target.value)} />
              <FormHelperText>Enter the title.</FormHelperText>
              {/* Use FormErrorMessage for displaying errors */}
              {error && <FormErrorMessage>{error}</FormErrorMessage>}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              mt={10}
              mr={2}
              bg="#1EE66E"
              color="black"
              rounded="xl"
              boxShadow="xl"
              _hover={{ bg: '#1EE66E.500' }}
              _focus={{ bg: '#1EE66E.500' }}
              onClick={handleAddClassification}
            >
              Add Classification
            </Button>
            <Button
              mt={10}
              ml={2}
              bg="#FB493F"
              color="white"
              rounded="xl"
              boxShadow="xl"
              _hover={{ bg: '#FB493F.500' }}
              _focus={{ bg: '#FB493F.500' }}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box p={4}>
        <Flex>
          <Text fontSize="2xl" pb={4}>
            Classifications
          </Text>
          <Spacer />
          <IconButton
            variant="outline"
            borderColor="#1EE66E"
            color="black"
            size="lg"
            icon={<FaPlus size="20px" color="#1EE66E" />}
            onClick={onOpen}
          />
        </Flex>
        
        {loading ? (
          // Show skeletons when loading
          <Wrap>
            {[...Array(4)].map((_, index) => (
              <WrapItem key={index}>
                <Skeleton
                  height="165.8px"
                  width="174.8px"
                  my={4}
                  rounded={'lg'}
                  shadow={'xl'}
                />
              </WrapItem>
            ))}
          </Wrap>
        ) : (
          <Wrap>
            {classifications.length !== 0 &&
              classifications.map((item, index) => (
                <WrapItem key={index}>
                  <Box
                    maxW={'270px'}
                    w={'full'}
                    bg={'gray.800'}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    overflow={'hidden'}
                  >
                    <Box p={6}>
                      <Stack spacing={0} align={'center'} mb={5}>
                        <Heading
                          fontSize={'2xl'}
                          fontWeight={500}
                          fontFamily={'body'}
                        >
                          {item.title}
                        </Heading>
                      </Stack>

                      <Button
                        size="sm"
                        w={'full'}
                        mt={2}
                        bg="#FB493F"
                        color={'white'}
                        rounded={'md'}
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: 'lg',
                        }}
                        onClick={() => handleDeleteClassification(item._id)}
                        isLoading={loading}
                        loadingText="Deleting"
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </WrapItem>
              ))}
          </Wrap>
        )}
      </Box>
    </>
  );
};

export default Classification;
