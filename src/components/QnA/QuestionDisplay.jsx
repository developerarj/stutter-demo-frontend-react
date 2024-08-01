import React, { useState, useEffect } from 'react';
import { Box, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import SystemResponse from './SystemResponse';
import UserResponse from './UserResponse';
import AnimatedBox from './AnimatedBox';

const QuestionDisplay = ({
  currentIndex,
  currentDialogue,
  handleNextQuestion,
  handlePrevQuestion,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer); 
  }, []);

  if (!currentDialogue || !currentDialogue.text) {
    return null;
  }

  const isUser = currentDialogue.text === 'user response';

  return (
    <AnimatedBox direction={loading ? 'down' : 'up'} overflow="hidden">
      {loading && (
        <>
          <SkeletonCircle size={10}></SkeletonCircle>
          <Skeleton
            height="90px"
            width="700px"
            ml={16}
            marginTop={-10}
            rounded={'lg'}
            shadow={'xl'}
          />
        </>
      )}
      {!loading && !isUser && (
        <SystemResponse
          handleNextQuestion={handleNextQuestion}
          handlePrevQuestion={handlePrevQuestion}
          currentIndex={currentIndex}
          currentDialogue={currentDialogue}
        />
      )}

      {!loading && isUser && (
        <UserResponse
          handleNextQuestion={handleNextQuestion}
          handlePrevQuestion={handlePrevQuestion}
          currentIndex={currentIndex}
          currentDialogue={currentDialogue}
        />
      )}
    </AnimatedBox>
  );
};

export default QuestionDisplay;
