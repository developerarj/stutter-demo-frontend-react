import React from 'react';
import { Box, Heading, Text, Divider } from '@chakra-ui/react';

const PracticeDialogue = ({ message }) => {
  // Splitting the message into sections based on "---" delimiter
  const sections = message.split('---');

  return (
    <Box maxW="600px" mx="auto" p="6" borderWidth="1px" borderRadius="lg">
      <Heading as="h2" size="lg" mb="4">
        Practice Dialogue
      </Heading>

      {sections.map((section, index) => {
        // Splitting each section into lines
        const lines = section.split('\n').filter(line => line.trim() !== '');

        if (lines.length === 0) return null;

        return (
          <Box key={index} mb="4">
            {/* Rendering each line */}
            {lines.map((line, idx) => (
              <Text key={idx} mb="2">
                {line}
              </Text>
            ))}
          </Box>
        );
      })}
    </Box>
  );
};

export default PracticeDialogue;
