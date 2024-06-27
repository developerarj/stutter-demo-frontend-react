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
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import {
  listActivityTheme,
  addActivityTheme,
  deleteActivityTheme,
} from '../../services/Admin';

const ActivityDetails = () => {
  let { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(null);
  const [activityThemeList, setActivityThemeList] = useState([]);
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
  };

  const fetchActivityThemeList = async () => {
    try {
      const res = await listActivityTheme(id);

      if (res.status === 200) {
        setActivityThemeList(res.data.theme);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddActivityTheme = async () => {
    try {
      const res = await addActivityTheme(theme, id);
      if (res.status === 201) {
        setLoading(false);
        fetchActivityThemeList();
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteActivityTheme = async id => {
    try {
      const res = await deleteActivityTheme(id);
      if (res.status === 200) {
        console.log(res);
        setLoading(false);
        fetchActivityThemeList();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchActivityThemeList();
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Activity Theme</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Theme</FormLabel>
              <Input value={theme} onChange={e => setTheme(e.target.value)} />
              <FormHelperText>Enter the Activity theme.</FormHelperText>
            </FormControl>

            {error && <FormErrorMessage>{error}</FormErrorMessage>}
          </ModalBody>

          <ModalFooter>
            <Button
              // isLoading={isSubmit}
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
              onClick={handleAddActivityTheme}
            >
              Add Activity Theme
            </Button>

            <Button
              // isLoading={isSubmit}
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
            Activity Theme
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

        {activityThemeList.length !== 0 && (
          <OrderedList>
            {activityThemeList.map((item, index) => (
              <ListItem key={index}>
                <Box p={4} display="flex">
                  <Text pr={2}>{item.theme}</Text>
                  <IconButton
                    size="xs"
                    variant="outline"
                    borderColor="#FB493F"
                    icon={<FaTrash size="12px" color="#FB493F" />}
                    onClick={() => handleDeleteActivityTheme(item._id)}
                  />
                </Box>
              </ListItem>
            ))}
          </OrderedList>
        )}
      </Box>
    </>
  );
};

export default ActivityDetails;
