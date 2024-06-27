import {
  Box,
  Heading,
  Spacer,
  Flex,
  ListItem,
  List,
  SimpleGrid,
  Text,
  Button,
} from '@chakra-ui/react';
import Prediction from '../../components/Prediction';
import React, { useEffect, useState } from 'react';
import { getPrediction } from '../../services/User';
import { getAllPrediction } from '../../services/Admin';
import { userDetails, feedback } from '../../services/Common';
import { useNavigate } from 'react-router-dom';

const Predictions = () => {
  const [user, setUser] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedbackPayload, setFeedbackPayload] = useState(null);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const res = await userDetails();

      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (error) {
      console.log('Error uploading');
    }
  };

  const fetchPredictionData = async () => {
    try {
      const response = await getPrediction();

      if (response && response.data) {
        setPredictions(response.data.predictions); // Assuming the API returns data in the form of an array of audio files
        setLoading(false);
      } else {
        setError('Failed to fetch audio files');
        setLoading(false);
      }
    } catch (error) {
      setError('An error occurred while fetching audio files');
      setLoading(false);
    }
  };

  const fetchAllPredictionData = async () => {
    try {
      const response = await getAllPrediction();

      if (response && response.data) {
        setPredictions(response.data.predictions); // Assuming the API returns data in the form of an array of audio files
        setLoading(false);
      } else {
        setError('Failed to fetch audio files');
        setLoading(false);
      }
    } catch (error) {
      setError('An error occurred while fetching audio files');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) getUserInfo();
  });

  useEffect(() => {
    if (predictions.length === 0) {
      if (user && user.isAdmin) {
        fetchAllPredictionData();
      } else {
        fetchPredictionData();
      }
    }
  }, [predictions]);

  const handleOpenFile = async pred => {
    if (item && item._id === pred._id) {
      setItem(null);
    } else {
      setItem(pred);
    }
  };

  // const handleEvaluation = async id => {
  //   navigate(`/prediction/${id}`);
  // };

  const handleFeedBack = async () => {
    if (feedbackPayload) {
      setLoading(true);

      try {
        const response = await feedback(feedbackPayload);

        if (response.status === 200) {
          if (user && user.isAdmin) {
            setFeedbackPayload(null);
            navigate(`/admin/feedback/${response.data.feedbackId}`);
          } else {
            setFeedbackPayload(null);
            navigate(`/user/feedback/${response.data.feedbackId}`);
          }
        }
      } catch (error) {
        setError('An error occurred while fetching modal files');
        setLoading(false);
      }
    }
  };

  return (
    <Box>
      <Heading>Predictions</Heading>

      <SimpleGrid columns={1} spacing={10} mt={2}>
        <List spacing={4}>
          {predictions.length !== 0 &&
            predictions.map((pred, index) => (
              <ListItem key={index}>
                <Box border="1px solid" borderColor="#165D37" borderRadius={8}>
                  <Flex
                    bg="#165D37"
                    borderRadius={8}
                    p={4}
                    cursor="pointer"
                    boxShadow="2xl"
                    _hover={{ bg: '#0F3B23' }} // Change color on hover
                    _active={{ bg: '#0A2E1C' }} // Change color on click
                    onClick={() => handleOpenFile(pred)}
                  >
                    <Text>{pred.audioFile.filename}</Text>
                    <Spacer />
                    <Text>
                      Model: {pred.modal.type}_{pred.modal.version}
                    </Text>
                  </Flex>
                  {item && item._id === pred._id && (
                    <Box m={4}>
                      <Flex>
                        <Text fontSize="2xl">
                          Analysis results from audio recording.
                        </Text>
                        <Spacer />
                        <Button
                          isLoading={loading}
                          variant="outline"
                          borderColor="#1EE66E"
                          onClick={handleFeedBack}
                        >
                          Get Feedback Report
                        </Button>
                      </Flex>

                      <Prediction
                        key={index}
                        predictionId={pred._id}
                        audioFileName={item.audioFile.filename}
                        audioFileUrl={item.audioFile.file_url}
                        modelName={item.modal.type}
                        modelVersion={item.modal.version}
                        totalFile={item.totalFiles}
                        num_files_after_prediction={{
                          Disfluent: item.disfluency,
                          Fluent: item.fluency,
                          Interjection: item.interjection,
                          Music: item.music,
                          NaturalPause: item.naturalPause,
                          NoSpeech: item.noSpeech,
                        }}
                        setFeedbackPayload={setFeedbackPayload}
                        isPlayer={true}
                        feedbackPayload={feedbackPayload}
                      />

                      {/* <FeedbackComponent message={messages2} /> */}
                      {/* <PracticeDialogue message={messages3} /> */}
                    </Box>
                  )}
                </Box>
              </ListItem>
            ))}
        </List>
      </SimpleGrid>
    </Box>
  );
};

export default Predictions;
