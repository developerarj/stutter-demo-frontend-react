import React from 'react';
import { Flex, IconButton } from '@chakra-ui/react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';

const ActivityControls = () => {
  const handleClickPlay = () => {
    console.log('Play button clicked');
  };

  const handleClickPauseResume = () => {
    console.log('Pause/Resume button clicked');
  };

  const handleClickStop = () => {
    console.log('Stop button clicked');
  };

  return (
    <Flex m={6}>
      <IconButton
        m={4}
        p={2}
        variant="ghost"
        icon={<FaPlay color="#1EE66E" fontSize="24px" />}
        onClick={handleClickPlay}
      />
      <IconButton
        m={4}
        p={2}
        variant="ghost"
        icon={<FaPause color="#1EE66E" fontSize="24px" />}
        onClick={handleClickPauseResume}
      />
      <IconButton
        m={4}
        p={2}
        variant="ghost"
        icon={<FaStop color="#f56565" fontSize="24px" />}
        onClick={handleClickStop}
      />
    </Flex>
  );
};

export default ActivityControls;
