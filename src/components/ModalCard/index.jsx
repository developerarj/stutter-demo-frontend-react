import {
  Heading,
  Box,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Badge,
  Flex,
  Checkbox,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { updateStatus, deleteModal } from '../../services/Admin';

export default function ModalCard({
  name,
  accuracy,
  id,
  version,
  isActive,
  setModals,
}) {
  const navigate = useNavigate();

  const handleClick = id => {
    navigate(`/admin/modals/${id}`);
  };

  const handleChangeStatus = async (id, status) => {
    try {
      const res = await updateStatus(id, status);

      if (res.status === 200) {
        setModals([]);
      }
    } catch (error) {
      console.log('Error uploading');
    }
  };

  const handleDelete = async id => {
    try {
      const res = await deleteModal(id);

      if (res.status === 200) {
        setModals([]);
      }
    } catch (error) {
      console.log('Error uploading');
    }
  };

  return (
    <Box
      maxW={'270px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}
    >
      <Flex justify="flex-end" p={2}>
        <Text mr={2}>Is Active</Text>
        <Checkbox
          colorScheme="green"
          isChecked={isActive}
          onChange={e => handleChangeStatus(id, e.target.checked)}
        />
      </Flex>
      <Box p={6}>
        <Stack spacing={0} align={'center'} mb={5}>
          <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
            {name}
          </Heading>
        </Stack>

        <Stack direction={'row'} justify={'center'} spacing={6}>
          <Stack spacing={0} align={'center'}>
            <Text fontWeight={600}>{accuracy}% accuracy</Text>
            <Text fontSize={'sm'} color={'gray.500'}>
              Version : {version ? version : 'unknown'}
            </Text>
          </Stack>
        </Stack>

        <Button
          size="sm"
          w={'full'}
          mt={8}
          bg={useColorModeValue('#151f21', 'gray.900')}
          color={'white'}
          rounded={'md'}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          onClick={() => handleClick(id)}
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
          onClick={() => handleDelete(id)}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}
