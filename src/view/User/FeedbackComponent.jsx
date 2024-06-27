import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Divider, List, ListItem } from '@chakra-ui/react';
import Prediction from '../../components/Prediction';
import { useParams } from 'react-router-dom';
import { getFeedback } from '../../services/Common';

const FeedbackComponent = () => {
  let { id } = useParams();

  const [feedback, setFeedback] = useState(null);
  const [feedbackPayload, setFeedbackPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFeedback(id);
        if (response && response.data) {
          setFeedback(response.data);
        } else {
          setError('Failed to fetch feedback');
        }
      } catch (error) {
        setError('An error occurred while fetching feedback');
      } finally {
        setLoading(false);
      }
    };

    if (!feedback) fetchData();
  }, [id, feedback]);

  const cleanedMessage = feedback?.feedback?.replace(/\*/g, '');
  const sections = cleanedMessage ? cleanedMessage.split('\n\n') : [];

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <Box>
      <Heading size="lg">Prediction Evaluation</Heading>

      {feedback && (
        <Prediction
          audioFileName={feedback.prediction.audioFile.filename}
          audioFileUrl={feedback.prediction.audioFile.file_url}
          modelName={feedback.prediction.modal.type}
          modelVersion={feedback.prediction.modal.version}
          totalFile={feedback.prediction.totalFiles}
          num_files_after_prediction={{
            Disfluent: feedback.prediction.disfluency,
            Fluent: feedback.prediction.fluency,
            Interjection: feedback.prediction.interjection,
            Music: feedback.prediction.music,
            NaturalPause: feedback.prediction.naturalPause,
            NoSpeech: feedback.prediction.noSpeech,
          }}
          isPlayer={false}
          setFeedbackPayload={setFeedbackPayload}
          feedbackPayload={feedbackPayload}
        />
      )}

      {sections.length > 0 && (
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

export default FeedbackComponent;
