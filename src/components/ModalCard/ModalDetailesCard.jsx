import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import sampleAudio from '../../sample/MSL-1_28.wav';
import AudioPlayer from '../AudioPlayer';

import { FaDotCircle } from 'react-icons/fa';
export default function ModalDetailesCard({
  filename,
  fluent,
  disfluent,
  naturalPause,
  Interjection,
  modal,
}) {
  return (
    <Center py={6}>
      <Box
        maxW={'350px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Stack
          textAlign={'center'}
          p={6}
          color={useColorModeValue('gray.800', 'white')}
          align={'center'}
        >
          <Text
            fontSize={'sm'}
            fontWeight={500}
            bg={useColorModeValue('green.50', 'green.900')}
            p={2}
            px={3}
            color={'green.500'}
            rounded={'full'}
          >
            Modal Prediction on {filename}
          </Text>
          <Stack direction={'row'} align={'center'} justify={'center'}>
            <Text fontSize={'6xl'} fontWeight={800}>
              {modal}
            </Text>
          </Stack>
        </Stack>

        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={FaDotCircle} color="green.400" />
              Fluent {fluent}%
            </ListItem>
            <ListItem>
              <ListIcon as={FaDotCircle} color="green.400" />
              DisFulent {disfluent}%
            </ListItem>
            <ListItem>
              <ListIcon as={FaDotCircle} color="green.400" />
              NaturalPause {naturalPause}%
            </ListItem>
            <ListItem>
              <ListIcon as={FaDotCircle} color="green.400" />
              Interjections {Interjection}%
            </ListItem>
          </List>

          <AudioPlayer audioUrl={sampleAudio} />
        </Box>
      </Box>
    </Center>
  );
}
