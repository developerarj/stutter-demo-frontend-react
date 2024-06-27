import React, { useState, useEffect, useRef } from 'react';
import { Box, Center, Text, Flex, IconButton, Spacer } from '@chakra-ui/react';
import { FaMicrophoneAlt, FaBookReader } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const AudioRecorder = ({ setSelectedFile }) => {
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [readTest, setReadTest] = useState(false);

  const [visualization, setVisualization] = useState(null);

  const canvasRef = useRef(null);

  const handleRemove = () => {
    setMediaRecorder(null);
    setAudioChunks([]);
    setRecording(false);
    setTimer({ minutes: 0, seconds: 0 });
    if (visualization) {
      visualization.stop();
    }
  };

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.addEventListener('dataavailable', e => {
          if (e.data.size > 0) {
            setAudioChunks(chunks => [...chunks, e.data]);
          }
        });

        recorder.start();
        setRecording(true);

        // Start the timer
        const id = setInterval(() => {
          setTimer(prevTimer => {
            const seconds = prevTimer.seconds + 1;
            const totalSeconds = prevTimer.minutes * 60 + seconds;
            if (totalSeconds === 60) {
              // Corrected condition
              stopRecording();
            }
            return seconds === 60
              ? { minutes: prevTimer.minutes + 1, seconds: 0 }
              : { ...prevTimer, seconds };
          });
          setElapsedSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);

        setIntervalId(id);
      })
      .catch(err => {
        console.error('Error accessing microphone:', err);
      });
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setRecording(false);
      setTimer({ minutes: 0, seconds: 0 });
      clearInterval(intervalId); // Clear interval using intervalId state
      setElapsedSeconds(0);
    }
  };

  // const handleDownload = () => {
  //   if (audioChunks.length === 0) return;

  //   const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
  //   const audioUrl = URL.createObjectURL(audioBlob);
  //   const link = document.createElement('a');
  //   link.href = audioUrl;
  //   link.download = 'recorded_audio.wav';
  //   document.body.appendChild(link);
  //   link.click();
  //   URL.revokeObjectURL(audioUrl);
  //   setAudioChunks([]);
  // };

  useEffect(() => {
    if (audioChunks.length !== 0) {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      setSelectedFile(audioBlob);
    }
  }, [audioChunks]);

  const handleSetReadMode = () => {
    setReadTest(!readTest);
  };

  return (
    <>
      {!readTest && (
        <Box
          rounded="md"
          cursor="pointer"
          onClick={handleSetReadMode}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <FaBookReader size={80} color="#1EE66E" />
          <Text fontSize="lg" textAlign="center">
            Read & Record
          </Text>
        </Box>
      )}

      {readTest && (
        <Box p={4}>
          <Flex>
            <Text fontSize="2xl">Voice Recorder</Text>
            <Spacer />
            <IconButton
              variant="outline"
              borderColor="#FB493F"
              size="6xl"
              icon={<IoMdClose size="30px" color="#FB493F" />}
              onClick={handleSetReadMode}
            />
          </Flex>

          <Text fontSize="sm" pt={4}>
            Try recording your voice and upload to receive predictions.
          </Text>
          <Box p={4}>
            <Center>
              <Flex direction="column" align="center">
                <Text fontSize="sm" p={4}>
                  {`Recording: ${timer.minutes
                    .toString()
                    .padStart(2, '0')}:${timer.seconds
                    .toString()
                    .padStart(2, '0')}`}
                </Text>

                <IconButton
                  p={4}
                  // isDisabled={audioUrl}
                  boxShadow="xl"
                  isRound={true}
                  variant="outline"
                  borderColor={recording ? '#FB493F' : '#1EE66E'}
                  icon={
                    recording ? (
                      <FaMicrophoneAlt size="26px" color="#FB493F" />
                    ) : (
                      <FaMicrophoneAlt size="26px" color="#1EE66E" />
                    )
                  }
                  size="6xl"
                  onClick={recording ? stopRecording : startRecording}
                />
              </Flex>
            </Center>
            <Text fontSize="sm" pt={4}>
              Try recording your voice and upload to receive predictions.
            </Text>
            <Box
              mt={4}
              h="20vh"
              w="100%"
              overflow="auto"
              borderWidth="4px" // Set the border width
              borderColor="#1EE66E" // Set the border color
              p="4"
              rounded="md"
              cursor="grab"
            >
              <Text
                fontSize="sm"
                lineHeight="1.5"
                textAlign="center"
                fontStyle="italic"
              >
                You may write me down in history
                <br />
                With your bitter, twisted lies,
                <br />
                You may tread me in the very dirt
                <br />
                But still, like dust, I’ll rise.
                <br />
                <br />
                Does my sassiness upset you?
                <br />
                Why are you beset with gloom?
                <br />
                ’Cause I walk like I’ve got oil wells
                <br />
                Pumping in my living room.
                <br />
                Just like moons and like suns,
                <br />
                With the certainty of tides,
                <br />
                Just like hopes springing high,
                <br />
                Still I’ll rise.
                <br />
                <br />
                Did you want to see me broken?
                <br />
                Bowed head and lowered eyes?
                <br />
                Shoulders falling down like teardrops.
                <br />
                Weakened by my soulful cries.
                <br />
                Does my haughtiness offend you?
                <br />
                Don’t you take it awful hard
                <br />
                ’Cause I laugh like I’ve got gold mines
                <br />
                Diggin’ in my own back yard.
                <br />
                <br />
                You may shoot me with your words,
                <br />
                You may cut me with your eyes,
                <br />
                You may kill me with your hatefulness,
                <br />
                But still, like air, I’ll rise.
                <br />
                Does my sexiness upset you?
                <br />
                Does it come as a surprise
                <br />
                That I dance like I’ve got diamonds
                <br />
                At the meeting of my thighs?
                <br />
                <br />
                Out of the huts of history’s shame
                <br />
                I rise
                <br />
                Up from a past that’s rooted in pain
                <br />
                I rise
                <br />
                I’m a black ocean, leaping and wide,
                <br />
                Welling and swelling I bear in the tide.
                <br />
                <br />
                Leaving behind nights of terror and fear
                <br />
                I rise
                <br />
                Into a daybreak that’s wondrously clear
                <br />
                I rise
                <br />
                Bringing the gifts that my ancestors gave,
                <br />
                I am the dream and the hope of the slave.
                <br />
                I rise
                <br />
                I rise
                <br />I rise.
              </Text>
            </Box>
          </Box>

          {/* {audioUrl && (
        <>
          <AudioPlayer audioUrl={audioUrl} />

          <Button
            mt={10}
            bg={'red.400'}
            color={'white'}
            rounded={'xl'}
            boxShadow={'xl'}
            _hover={{
              bg: 'red.500',
            }}
            _focus={{
              bg: 'red.500',
            }}
            onClick={handleRemove}
          >
            Remove Recording
          </Button>
        </>
      )} */}
        </Box>
      )}
    </>
  );
};

export default AudioRecorder;
