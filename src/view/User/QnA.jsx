import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Text,
  Center,
  Container,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import {
  userDetails,
  getActivitySession,
  addActivitySession,
  getQuestions,
} from '../../services/Common';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  FaRobot,
  FaPause,
  FaStop,
  FaUser,
  FaPlay,
  FaStepBackward,
  FaStepForward,
} from 'react-icons/fa'; // Importing required icons

const QnA = () => {
  let { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activitySessions, setActivitySessionList] = useState([]);
  const [isSession, setIsSession] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [session, setSession] = useState(null);
  const boxRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(-1); // Track current question index

  const fetchUser = async () => {
    try {
      const res = await userDetails();
      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchActivitySession = async () => {
    try {
      const res = await getActivitySession(id);
      if (res.status === 200) {
        setActivitySessionList(res.data.activities);
      }
    } catch (error) {
      console.error('Error fetching activity sessions:', error);
    }
  };

  const handleAddSession = async () => {
    const searchParams = new URLSearchParams(location.search);
    const optionValue = searchParams.get('option');
    try {
      const res = await addActivitySession(id, optionValue);
      if (res.status === 200) {
        setSession(res.data); // Set session if needed
      }
    } catch (error) {
      console.error('Error adding activity session:', error);
    }
  };

  const convertApiResponseToQuestions = apiQuestions => {
    if (!apiQuestions) return [];

    try {
      const questions = apiQuestions?.result;
      const newQuestionsArray = splittingQuestionsArray(questions);

      const formattedQuestions = [];

      newQuestionsArray.forEach((q, index) => {
        formattedQuestions.push({
          text: `${q.question}`,
        });

        // Add placeholder for user response if not the last question
        if (index < newQuestionsArray.length - 1) {
          formattedQuestions.push({
            text: 'user response',
          });
        } else {
          // Add user response placeholder after the last question
          formattedQuestions.push({
            text: 'user response',
          });
        }
      });
      console.log('Formatted Questions:', formattedQuestions);
      return formattedQuestions;
    } catch (error) {
      console.error('Error converting API response to questions:', error);
      return [];
    }
  };

  // Function to split text into questions based on regex
  const splittingQuestionsArray = text => {
    const startIndex = text.indexOf('1.');
    const questionsText = text.substring(startIndex);

    const questionRegex = /(\d+\.)\s+(.*)/g;
    let match;
    const questions = [];

    while ((match = questionRegex.exec(questionsText)) !== null) {
      const questionNumber = match[1];
      const questionText = match[2];

      questions.push({
        number: questionNumber,
        question: questionText.trim(),
      });
    }
    return questions;
  };

  const fetchQuestions = async () => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const optionValue = searchParams.get('option');
      const res = await getQuestions(optionValue);

      if (res.status === 200) {
        const convertedQuestions = convertApiResponseToQuestions(res.data);
        setQuestions(convertedQuestions);
        setCurrentIndex(0); // Start with the first question
      } else {
        console.error('Failed to fetch questions:', res.status, res.statusText);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchActivitySession();
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (isSession && !session) {
      handleAddSession();
    }
  }, [isSession, session]);

  return (
    <Box>
      <Center>
        <Text
          fontSize="24px"
          fontWeight="600"
          lineHeight="28.13px"
          fontFamily="Roboto"
          width="175px"
          height="28px"
          mb="6"
        >
          Reading Activity
        </Text>
      </Center>

      <Center>
        <Text
          textAlign="center"
          fontSize="16px"
          lineHeight="24px"
          color="#B8C5D0"
        >
          Welcome to the AI Bot Reading Activity. You can stop, play, or pause
          the <br />
          activity at any time. Each section will be revealed sequentially, and{' '}
          <br />
          simply click "next" to proceed.
        </Text>
      </Center>

      <Container maxW="6xl">
        <Center>
          <Flex m={6}>
            {/* Add your playback buttons here */}
            {/* Example: */}
            <IconButton
              m={4}
              p={2}
              variant="ghost"
              icon={<FaPlay color="#1EE66E" fontSize="24px" />}
              onClick={() => {
                // Implement handleClickPlay
              }}
            />
            <IconButton
              m={4}
              p={2}
              variant="ghost"
              icon={<FaPause color="#1EE66E" fontSize="24px" />}
              onClick={() => {
                /* Implement handleClickPauseResume */
              }}
            />
            <IconButton
              m={4}
              p={2}
              variant="ghost"
              icon={<FaStop color="#f56565" fontSize="24px" />}
              onClick={() => {
                /* Implement handleClickStop */
              }}
            />
          </Flex>
        </Center>

        <Center>
          <Flex>
            {/* Display robot icon and question */}

            {currentIndex % 2 === 0 && (
              <IconButton
                m={4}
                isRound
                variant="solid"
                bg="#1EE66E"
                icon={<FaRobot color="black" fontSize="22px" />}
                _hover={{ bg: '#1FB159' }}
              />
            )}
            <Box p={10} bg="#232340" borderRadius={10}>
              {questions.length > 0 ? (
                <Text fontSize="xl" pl={4} pr={4} color="white">
                  {questions[currentIndex]?.text}
                </Text>
              ) : (
                <Text fontSize="xl" pl={4} pr={4} color="white">
                  Loading...
                </Text>
              )}
            </Box>
          </Flex>
        </Center>

        <Center>
          <Flex m={6}>
            {/* Add navigation buttons */}
            <IconButton
              isDisabled={currentIndex <= 0}
              m={4}
              isRound
              variant="solid"
              bg="#1EE66E"
              icon={<FaStepBackward color="black" />}
              _hover={{ bg: '#1FB159' }}
              onClick={handlePrevQuestion}
            />
            <IconButton
              isDisabled={currentIndex >= questions.length - 1}
              m={4}
              isRound
              variant="solid"
              bg="#1EE66E"
              icon={<FaStepForward color="black" />}
              _hover={{ bg: '#1FB159' }}
              onClick={handleNextQuestion}
            />
          </Flex>
        </Center>
      </Container>
    </Box>
  );
};

export default QnA;
