import React from 'react';
import { Box, Text, Flex, Center, IconButton } from '@chakra-ui/react';
import { FaLaptop, FaStepBackward, FaStepForward } from 'react-icons/fa';
import AnimatedBox from './AnimatedBox';

const SystemResponse = ({
  currentIndex,
  currentDialogue,
  handleNextQuestion,
  handlePrevQuestion,
  length,
}) => {
  const nextQuestion = () => {
    handleNextQuestion();
  };

  const prevQuestion = () => {
    handlePrevQuestion();
  };

  return (
    <Box overflow="hidden">
      <AnimatedBox direction="up">
        {currentDialogue && (
          <Flex>
            <IconButton
              mr={4}
              isRound
              variant="solid"
              bg="#1EE66E"
              icon={<FaLaptop color="black" fontSize="22px" />}
              _hover={{ bg: '#1FB159' }}
            />
            <Box p={8} bg="#232340" borderRadius={10}>
              <Text fontSize="xl" pl={4} pr={4} color="white">
                {currentDialogue.text}
              </Text>
            </Box>
          </Flex>
        )}
        <Center>
          <Flex m={6}>
            <IconButton
              isDisabled={currentIndex === 0}
              m={4}
              isRound
              variant="solid"
              bg="#1EE66E"
              icon={<FaStepBackward color="black" />}
              _hover={{ bg: '#1FB159' }}
              onClick={prevQuestion}
            />
            <IconButton
              isDisabled={currentIndex >= length - 1}
              m={4}
              isRound
              variant="solid"
              bg="#1EE66E"
              icon={<FaStepForward color="black" />}
              _hover={{ bg: '#1FB159' }}
              onClick={nextQuestion}
            />
          </Flex>
        </Center>
      </AnimatedBox>
    </Box>
  );
};

export default SystemResponse;