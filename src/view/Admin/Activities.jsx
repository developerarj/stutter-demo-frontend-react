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
  useColorModeValue,
  Stack,
  Heading,
  Skeleton,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getActivityList } from '../../services/Common';
import { addActivity, deleteActivity } from '../../services/Admin';

const Activities = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState(null);
  const [endpoint, setEndpoint] = useState(null);
  const [activityList, setActivityList] = useState([]);
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
  };

  const fetchActivityList = async () => {
    try {
      const res = await getActivityList();

      if (res.status === 200) {
        setActivityList(res.data.activities);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleActivitySelect = id => {
    navigate(`/admin/activities/${id}`);
  };

  const handleAddActivity = async () => {
    if (!title) {
      setError('Title Required');
      return;
    }
    if (!endpoint) {
      setError('Endpoint Required');
      return;
    }

    try {
      const res = await addActivity(title, endpoint);

      if (res.status === 201) {
        handleClose();
        setLoading(true);
        fetchActivityList();
      }
    } catch (c) {
      console.error(c);
    }
  };

  const handleDeleteActivity = async id => {
    try {
      const res = await deleteActivity(id);
      if (res.status === 200) {
        setLoading(true);
        fetchActivityList();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchActivityList();
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Activity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input value={title} onChange={e => setTitle(e.target.value)} />
              <FormHelperText>Enter the Activity title.</FormHelperText>
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Endpoint</FormLabel>
              <Input
                value={endpoint}
                onChange={e => setEndpoint(e.target.value)}
              />
              <FormHelperText>Enter Activity endpoint.</FormHelperText>
            </FormControl>

            {error && <FormErrorMessage>{error}</FormErrorMessage>}
          </ModalBody>

          <ModalFooter>
            <Button
              mt={10}
              mr={2}
              bg="#1EE66E"
              color={'black'}
              rounded={'xl'}
              boxShadow={'xl'}
              _hover={{
                bg: '#1EE66E.500',
              }}
              _focus={{
                bg: '#1EE66E.500',
              }}
              onClick={handleAddActivity}
            >
              Add Activity
            </Button>

            <Button
              mt={10}
              ml={2}
              bg="#FB493F"
              color={'white'}
              rounded={'xl'}
              boxShadow={'xl'}
              _hover={{
                bg: '#FB493F.500',
              }}
              _focus={{
                bg: '#FB493F.500',
              }}
              onClick={handleClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box p={4}>
        <Flex>
          <Text fontSize="2xl" pb={4}>
            Activity
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
                  height="185.8px"
                  width="174.8px"
                  my={4}
                  rounded={'lg'}
                  shadow={'xl'}
                />
              </WrapItem>
            ))}
          </Wrap>
        ) : (
          activityList.length !== 0 && (
            <Wrap>
              {activityList.map((item, index) => (
                <WrapItem key={index}>
                  <Box
                    maxW={'270px'}
                    w={'full'}
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

                      <Stack direction={'row'} justify={'center'} spacing={6}>
                        <Stack spacing={0} align={'center'}>
                          <Text fontSize={'sm'} color={'gray.500'}>
                            Endpoint : {item.endpoint}
                          </Text>
                        </Stack>
                      </Stack>

                      <Button
                        size="sm"
                        w={'full'}
                        mt={8}
                        bg={'#1EE66E'}
                        color={'black'}
                        rounded={'md'}
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: 'lg',
                        }}
                        onClick={() => handleActivitySelect(item._id)}
                      >
                        Select
                      </Button>

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
                        onClick={() => handleDeleteActivity(item._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </WrapItem>
              ))}
            </Wrap>
          )
        )}
      </Box>
    </>
  );
};

export default Activities;
