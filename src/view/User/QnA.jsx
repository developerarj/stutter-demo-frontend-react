import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, Center, Container } from '@chakra-ui/react';
import { useParams, useLocation } from 'react-router-dom';
import {
  userDetails,
  getActivitySession,
  addActivitySession,
  getQuestions,
} from '../../services/Common';
import QuestionDisplay from '../../components/QnA/QuestionDisplay';
import ActivityControls from '../../components/QnA/ActivityControls';
import AnimatedBox from '../../components/QnA/AnimatedBox';
const QnA = () => {
  let { id } = useParams();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [activitySessions, setActivitySessionList] = useState([]);
  const [isSession, setIsSession] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [session, setSession] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

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
        setSession(res.data);
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

        if (index < newQuestionsArray.length - 1) {
          formattedQuestions.push({
            text: 'user response',
          });
        } else {
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
            activity at any time. Each section will be revealed sequentially,
            and <br />
            simply click "next" to proceed.
          </Text>
        </Center>


      <Container maxW="6xl">
        <Center>
          <ActivityControls />
        </Center>

        <Center>
          <QuestionDisplay
            handleNextQuestion={handleNextQuestion}
            handlePrevQuestion={handlePrevQuestion}
            currentIndex={currentIndex}
            currentDialogue={questions[currentIndex]}
          />
        </Center>
      </Container>
    </Box>
  );
};

export default QnA;
