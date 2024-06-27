import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Divider,
  List,
  ListItem,
  Center,
  Button,
} from '@chakra-ui/react';

import { getProgressReport } from '../../services/Common';

const ProgressReport = () => {
  const [feedback, setFeedback] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProgressReport = async () => {
    setLoading(true);
    try {
      const response = await getProgressReport();
      if (response && response.data) {
        setFeedback(response.data.progress_report);
      } else {
        setError('Failed to fetch feedback');
      }
    } catch (error) {
      setError('An error occurred while fetching feedback');
    } finally {
      setLoading(false);
    }
  };

  const cleanedMessage = feedback?.replace(/\*/g, '');
  const sections = cleanedMessage ? cleanedMessage.split('\n\n') : [];

  return (
    <Box>
      <Heading size="lg">Progress Report</Heading>

      {!feedback && (
        <Center>
          <Button
            size="lg"
            isLoading={loading}
            mt={10}
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
            onClick={fetchProgressReport}
          >
            Get Progress Report
          </Button>
        </Center>
      )}

      {feedback && sections.length > 0 && (
        <Box p={20}>
          {sections.map((section, index) => {
            const lines = section
              .split('\n')
              .filter(line => line.trim() !== '');

            if (lines.length === 0) return null;

            if (index === 0) {
              return (
                <Text fontSize="lg" mb="4" key={index}>
                  {lines[0]}
                </Text>
              );
            }

            const title = lines[0].replace(':', '').trim();
            const items = lines.slice(1).map((line, idx) => {
              if (line.match(/^\d+\.\s/)) {
                const text = line
                  .replace(/-\s\*\*/g, '-')
                  .replace(/^\d+\.\s\*\*/, '')
                  .replace(/\*\*$/, '');

                return (
                  <Text key={idx} fontSize="xl">
                    <strong>{text}</strong>
                  </Text>
                );
              }
              return (
                <Text key={idx} ml={4} fontSize="md">
                  {line}
                </Text>
              );
            });

            return (
              <Box key={index} mb="4">
                <Heading size="md" mb="2">
                  {title}
                </Heading>
                <List spacing={3}>
                  {items.map((item, idx) => (
                    <ListItem key={idx}>{item}</ListItem>
                  ))}
                </List>
                <Divider mb={4} mt={4} />
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default ProgressReport;
