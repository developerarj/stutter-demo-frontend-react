import React, { useEffect, useRef, useState } from 'react';
import AudioPlayer from '../AudioPlayer';
import {
  Box,
  Flex,
  Center,
  Button,
  SimpleGrid,
  Text,
  Divider,
  List,
  ListItem,
  ListIcon,
  Spinner,
  Container,
  IconButton,
} from '@chakra-ui/react';
import { uploadActivityFile, getDialogue } from '../../services/Common';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaLaptop, FaUser, FaPlay, FaStop, FaVolumeUp } from 'react-icons/fa';

const SimpleDialog = ({
  setIsSession,
  setSession,
  isSession,
  session,
  activityId,
  user,
  setSessionEnd,
  dialogue,
  username,
}) => {
  const itemRefs = useRef([]);

  const navigate = useNavigate();
  const location = useLocation();
  const utteranceIndex = useRef(0);
  const lastChunkIndexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [alexResponses, setAlexResponses] = useState([]);
  const [conversationEnded, setConversationEnded] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [startSession, setStartSession] = useState(false);

  const startRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    if (!mediaRecorder) {
      console.error('MediaRecorder is not initialized.');
      return;
    }

    if (mediaRecorder && mediaRecorder.state === 'inactive') {
      mediaRecorder.start();
    }

    const uniqueChunks = new Set();

    mediaRecorder.addEventListener('dataavailable', e => {
      if (e.data.size > 0) {
        if (e.data instanceof Blob) {
          // Check if e.data is a Blob object and prevent duplicates
          e.data.arrayBuffer().then(buffer => {
            const hash = buffer.toString(); // Simple hash for the buffer
            if (!uniqueChunks.has(hash)) {
              uniqueChunks.add(hash);
              setAudioChunks(chunks => [...chunks, e.data]);
              // const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            }
          });
        } else {
          console.error('Data received is not a Blob:', e.data);
        }
      }
    });

    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      setAlexResponses(prev => [...prev, transcript]);
      utteranceIndex.current += 1;
      setCurrentIndex(utteranceIndex.current);
    };

    recognition.onerror = event => {
      console.error('Recognition error', event);
      // Move to the next utterance even if there's an error
      utteranceIndex.current += 1;
      setCurrentIndex(utteranceIndex.current);
    };

    recognition.onend = () => {
      // When the recognition ends, stop the recognition and media recorder
      recognition.stop();
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
    };

    recognition.start();
  };

  const getAudioUrl = blob => {
    const fileUrl = URL.createObjectURL(blob);
    return fileUrl;
  };

  const handleSession = () => {
    if (!startSession) {
      setStartSession(true);
      setIsSession(true);
    } else {
      setAudioChunks([]);
      setStartSession(false);
      setConversationEnded(false);
      setAlexResponses([]);
      setCurrentIndex(0);
    }
  };

  const handleUploadFile = async (audioBlob, text) => {
    try {
      const renamedFile = renameFileWithTimestamp(audioBlob);
      const res = await uploadActivityFile(renamedFile, text, session._id);

      if (res.status === 200) {
        console.log('File uploaded successfully');
      }
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };

  const renameFileWithTimestamp = file => {
    const timestamp = Date.now();
    const fileName = `${user?.username}_${timestamp}."mp3"`;
    return new File([file], fileName, { type: file.type });
  };

  const customScrollbarStyle = {
    '::-webkit-scrollbar': {
      width: '0px',
      height: '0px',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    '::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(0,0,0,0)',
    },
  };

  useEffect(() => {
    if (dialogue && startSession && session && user) {
      // Access the microphone
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          const recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);
        })
        .catch(err => {
          console.error('Error accessing microphone:', err);
        });

      const synth = window.speechSynthesis;

      if (!synth) {
        console.error('Speech Synthesis API is not supported in this browser.');
        return;
      }

      const speakNext = () => {
        if (utteranceIndex.current >= dialogue.length) {
          setConversationEnded(true);
          return;
        }

        if (dialogue[utteranceIndex.current].speaker === username) return;

        const utterance = new SpeechSynthesisUtterance(
          dialogue[utteranceIndex.current].text
        );

        utterance.voice = synth
          .getVoices()
          .find(
            voice =>
              voice.name === 'Google US English' || voice.lang === 'en-US'
          );

        utterance.onend = () => {
          utteranceIndex.current += 1;
          setCurrentIndex(utteranceIndex.current);

          speakNext(); // Call speakNext to continue the dialogue
        };

        synth.speak(utterance);
      };

      // Ensure voices are loaded before speaking
      const voicesChanged = () => {
        const voices = synth.getVoices();
        if (voices.length > 0) {
          synth.removeEventListener('voiceschanged', voicesChanged);
          speakNext();
        }
      };

      synth.addEventListener('voiceschanged', voicesChanged);
      if (synth.getVoices().length > 0) {
        synth.removeEventListener('voiceschanged', voicesChanged);
        speakNext();
      }

      return () => {
        synth.cancel();
      };
    }
  }, [dialogue, startSession, session, user, utteranceIndex.current]);

  useEffect(() => {
    if (dialogue[currentIndex] && dialogue[currentIndex].speaker === username) {
      startRecognition();
    }
  }, [currentIndex, startSession]);

  useEffect(() => {
    if (conversationEnded) {
      setStartSession(true);
      navigate(`user/activity/simple-dialog/${activityId}/${session._id}`);
    }
  }, [conversationEnded]);

  useEffect(() => {
    if (audioChunks.length > lastChunkIndexRef.current) {
      const newChunk = audioChunks[audioChunks.length - 1];
      const userDialogues = dialogue.filter(
        dialogue => dialogue.speaker === username
      );
      const text = userDialogues[audioChunks.length - 1]['text'];

      const audioBlob = new Blob([newChunk], { type: 'audio/mp3' });
      handleUploadFile(audioBlob, text);
      lastChunkIndexRef.current = audioChunks.length;
    }
  }, [audioChunks]);

  useEffect(() => {
    if (itemRefs.current[currentIndex]) {
      itemRefs.current[currentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [currentIndex]);

  return (
    <Box p={2}>
      {dialogue.length === 0 && (
        <Flex height="80vh" justifyContent="center" alignItems="center">
          <Spinner size="xl" color="#1EE66E" />
        </Flex>
      )}
      {dialogue.length !== 0 && (
        <>
          <Center>
            <IconButton
              m={2}
              p={2}
              variant="outline"
              border="1px solid"
              borderColor="#165D37"
              onClick={handleSession}
              icon={
                startSession ? (
                  <FaStop color="#f56565" fontSize="24px" />
                ) : (
                  <FaPlay color="#1EE66E" fontSize="24px" />
                )
              }
            >
              {startSession ? 'End Session' : 'Start New Session'}
            </IconButton>
          </Center>

          <Container maxW="6xl">
            <List
              display="flex"
              flexDirection="column"
              maxH="60vh"
              overflow="auto"
              sx={customScrollbarStyle}
            >
              {dialogue.map((line, index) => (
                <ListItem
                  key={index}
                  maxWidth="60%"
                  alignSelf={
                    line.speaker === username ? 'flex-end' : 'flex-start'
                  }
                  mb={2}
                  ref={el => (itemRefs.current[index] = el)}
                >
                  <Flex
                    flexDirection={
                      line.speaker === username ? 'row-reverse' : 'row'
                    }
                    alignItems="center"
                  >
                    <ListIcon
                      boxSize="1.5em"
                      as={line.speaker === username ? FaUser : FaLaptop}
                      color="#1EE66E"
                      ml={line.speaker === username ? 1 : 0}
                      mr={line.speaker === username ? 0 : 1}
                    />
                    <Box
                      p={4}
                      bg="#232340"
                      rounded="xl"
                      border={
                        startSession &&
                        currentIndex === index &&
                        line.speaker === username
                          ? '1px solid'
                          : 'none'
                      }
                      borderColor={
                        startSession &&
                        currentIndex === index &&
                        line.speaker === username
                          ? '#FFD700'
                          : 'none'
                      }
                    >
                      <Flex
                        flexDirection={
                          line.speaker === username ? 'row' : 'row-reverse'
                        }
                        alignItems="center"
                      >
                        {startSession &&
                          currentIndex === index &&
                          line.speaker === username && (
                            <ListIcon
                              as={FaVolumeUp}
                              color="#FFD700"
                              boxSize="1.5em"
                              m={2}
                              mr={2}
                            />
                          )}

                        {startSession &&
                          currentIndex === index &&
                          line.speaker !== username && (
                            <ListIcon
                              as={FaVolumeUp}
                              color="#FFD700"
                              boxSize="1.5em"
                              m={2}
                              ml={2}
                            />
                          )}
                        <Text>{line.text}</Text>
                      </Flex>
                    </Box>
                  </Flex>
                </ListItem>
              ))}
            </List>
          </Container>
        </>
      )}
    </Box>
  );
};

export default SimpleDialog;
