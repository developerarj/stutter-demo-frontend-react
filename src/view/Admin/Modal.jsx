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
  Checkbox,
  Skeleton,
} from '@chakra-ui/react';
import ModalCard from '../../components/ModalCard';
import { getModals, addModal } from '../../services/Admin';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MlModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modals, setModals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState('');
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getModals();

        if (response && response.data) {
          setModals(response.data.modals); // Assuming the API returns data in the form of an array of modals
          setLoading(false);
        } else {
          setError('Failed to fetch modals');
          setLoading(false);
        }
      } catch (error) {
        setError('An error occurred while fetching modals');
        setLoading(false);
      }
    };

    if (modals.length === 0) fetchData();
  }, [modals]);

  const handleClose = () => {
    onClose();
  };

  const handleAddModal = async () => {
    if (type) {
      try {
        const response = await addModal(type, isActive);

        if (response.status === 201) {
          navigate(`/admin/modals/${response.data.id}`);
        }
      } catch (error) {
        setError('An error occurred while adding the modal');
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Modal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Type</FormLabel>
              <Input value={type} onChange={e => setType(e.target.value)} />
              <FormHelperText>Enter the type of the model.</FormHelperText>
            </FormControl>

            <FormControl display="flex" alignItems="center" mt={4}>
              <FormLabel mb="0">Active</FormLabel>
              <Checkbox
                isChecked={isActive}
                onChange={e => setIsActive(e.target.checked)}
              />
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
              onClick={handleAddModal}
            >
              Add Model
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
            Modals
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
          // Render actual modals
          <Wrap spacing="30px">
            {modals.map((modal, index) => (
              <WrapItem key={index}>
                <ModalCard
                  id={modal._id}
                  name={modal.type}
                  accuracy={modal.accuracy}
                  version={modal.version}
                  isActive={modal.isActive}
                  setModals={setModals}
                />
              </WrapItem>
            ))}
          </Wrap>
        )}
      </Box>
    </>
  );
};

export default MlModal;
