import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  List,
  ListItem,
  Flex,
  Spacer,
  useDisclosure,
  IconButton,
  Center,
  Button,
} from '@chakra-ui/react';
import Prediction from '../../components/Prediction';
import AudioPlayer from '../../components/AudioPlayer';
import { getAudioFiles, deleteAudioFile } from '../../services/User';
import { getPrediction, savePrediction } from '../../services/Common';
import { FaRegTrashAlt, FaRegWindowClose } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Recordings = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [isPrediction, setIsPrediction] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isOpen, onToggle } = useDisclosure();
  const [feedbackPayload, setFeedbackPayload] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAudioFiles();

        if (response && response.data) {
          setAudioFiles(response.data.audiofiles); // Assuming the API returns data in the form of an array of audio files
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

    if (audioFiles.length === 0) fetchData();
  }, [audioFiles]);

  const handleDeleteAudioFiles = async fileId => {
    try {
      const response = await deleteAudioFile(fileId);
      if (response && response.status === 200) {
        setAudioFiles([]);
        setFile(null);
        setLoading(false);
      } else {
        setError('Failed to fetch audio files');
        setLoading(false);
      }
    } catch (error) {
      setError('An error occurred while deleting audio files');
      setLoading(false);
    }
  };

  const getDurationInMinSec = async audioSrc => {
    return new Promise((resolve, reject) => {
      const audio = new Audio(audioSrc);
      audio.onloadedmetadata = () => {
        const durationInSeconds = Math.round(audio.duration);
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = durationInSeconds % 60;
        resolve(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
      };
      audio.onerror = reject;
    });
  };

  const DurationDisplay = ({ audioSrc }) => {
    const [duration, setDuration] = useState(null);

    useEffect(() => {
      const fetchDuration = async () => {
        try {
          const duration = await getDurationInMinSec(audioSrc);
          setDuration(duration);
        } catch (error) {
          console.error(error);
        }
      };

      fetchDuration();
    }, [audioSrc]);

    return <>{duration}</>;
  };

  const handleOpenFile = async item => {
    if (file && file._id === item._id) {
      setFile(null);
      setPredictions(null);
    } else {
      setFile(item);
      setPredictions(null);
    }
  };

  const handlePrediction = async () => {
    setIsPrediction(true);
    try {
      const res = await getPrediction(file?._id);

      if (res.status === 200) {
        setIsPrediction(false);
        setAudioFiles([]);
        setPredictions(res.data);
        setFile(null);
      }
    } catch (error) {
      console.log('Error uploading');
    }
  };

  const handleSavePrediction = async () => {
    setLoading(true);
    const payload = {
      audioFileId: predictions.audioFile._id,
      modalsUsed: predictions.modalsUsed,
      num_files_before_prediction: predictions.num_files_before_prediction,
      num_files_after_prediction: predictions.num_files_after_prediction,
    };

    try {
      const response = await savePrediction(payload);

      if (response.status === 201) {
        navigate(`/predictions`);
      }
    } catch (error) {
      setError('An error occurred while fetching modal files');
      setLoading(false);
    }
  };

  return (
    <Box>
      <Heading>Audio Files</Heading>

      <SimpleGrid columns={file ? 2 : 1} spacing={10}>
        <List spacing={4} mt={4}>
          {audioFiles.length !== 0 &&
            audioFiles
              .filter(file => !file.activitySessionId)
              .map((file, index) => (
                <ListItem key={index}>
                  <Box
                    border="1px solid"
                    borderColor="#165D37"
                    borderRadius={8}
                  >
                    <Flex
                      bg="#165D37"
                      borderRadius={8}
                      p={4}
                      cursor="pointer"
                      boxShadow="2xl"
                      _hover={{ bg: '#0F3B23' }} // Change color on hover
                      _active={{ bg: '#0A2E1C' }} // Change color on click
                      onClick={() => handleOpenFile(file)}
                    >
                      <Text>{file.filename}</Text>
                      <Spacer />
                      <Text>
                        <DurationDisplay audioSrc={file.file_url} />
                      </Text>
                    </Flex>
                    {predictions && file._id === predictions.audioFile._id && (
                      <Box m={4}>
                        <Text fontSize="2xl" pt={4}>
                          Analysis results from audio recording.
                        </Text>

                        {predictions.modalsUsed.map((modal, index) => (
                          <Prediction
                            key={index}
                            audioFileName={predictions.audioFile.filename}
                            audioFileUrl={predictions.audioFile.file_url}
                            modelName={modal.type}
                            modelVersion={modal.version}
                            totalFile={
                              predictions.num_files_before_prediction[
                                `${modal.type}`
                              ].Disfluent
                            }
                            num_files_after_prediction={
                              predictions.num_files_after_prediction[
                                `${modal.type}`
                              ]
                            }
                            setFeedbackPayload={setFeedbackPayload}
                            isPlayer={true}
                            feedbackPayload={feedbackPayload}
                          />
                        ))}
                        <Center>
                          <Button
                            isLoading={loading}
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
                            onClick={handleSavePrediction}
                          >
                            Save Data
                          </Button>
                        </Center>
                      </Box>
                    )}
                  </Box>
                </ListItem>
              ))}
        </List>

        {file && (
          <Box p={4}>
            <Flex>
              <Text>{file.filename}</Text>
              <Spacer />
              <Text>
                <DurationDisplay audioSrc={file.file_url} />
              </Text>
              <Spacer />
              <IconButton
                isDisabled={isPrediction}
                variant="ghost"
                colorScheme="red"
                icon={<FaRegTrashAlt />}
                onClick={() => handleDeleteAudioFiles(file._id)}
              />
              <IconButton
                isDisabled={isPrediction}
                variant="ghost"
                icon={<FaRegWindowClose color="white" />}
                onClick={() => setFile(null)}
              />
            </Flex>
            <AudioPlayer audioUrl={file.file_url} />

            {!file.isPredicted && (
              <Center>
                <Button
                  isLoading={isPrediction}
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
                  onClick={handlePrediction}
                >
                  Predict File
                </Button>
              </Center>
            )}
          </Box>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default Recordings;
