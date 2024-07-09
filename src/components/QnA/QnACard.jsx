import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Center,
  Flex,
  Container,
  IconButton,
} from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { useParams, useLocation } from 'react-router-dom';
import {
  userDetails,
  addActivitySession,
  getQuestions,
} from '../../services/Common';

const QnACard = ({ showUserIcon }) => {
  const { id } = useParams();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isSession, setIsSession] = useState(false);
  const [session, setSession] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // Fetch user details
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

  // Handle adding activity session
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

  // Convert API response to questions array
  const convertApiResponseToQuestions = apiQuestions => {
    if (!apiQuestions) return [];

    try {
      const questions = apiQuestions?.result;
      const newQuestionsArray = splittingQuestionsArray(questions);
      console.log('questions: ', newQuestionsArray);
      return newQuestionsArray;
    } catch (error) {
      console.error('Error converting API response to questions:', error);
      return [];
    }
  };

  // Split text into questions based on regex
  function splittingQuestionsArray(text) {
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
  }

  // Fetch questions based on optionValue
  const fetchQuestions = async () => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const optionValue = searchParams.get('option');
      const res = await getQuestions(optionValue);

      if (res.status === 200) {
        const convertedQuestions = convertApiResponseToQuestions(res.data);
        setQuestions(convertedQuestions);
        console.log('Converted Questions:', convertedQuestions);
      } else {
        console.error('Failed to fetch questions:', res.status, res.statusText);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // useEffect to fetch user details and questions on component mount
  useEffect(() => {
    fetchUser();
    fetchQuestions();
  }, []);

  // useEffect to handle adding session when isSession and session change
  useEffect(() => {
    if (isSession && !session) {
      handleAddSession();
    }
  }, [isSession, session]);

  // Logging current index for debugging
  useEffect(() => {
    console.log('Current Index:', currentIndex);
  }, [currentIndex]);

  // give a max width , max width will do this
  return (
    <Box position="relative">
      <Container maxW="6xl">
        <Center>
        </Center>

        <Center>
          <Flex>
            {/* User icon positioned conditionally */}
            {currentIndex % 2 === 0 && (
              <IconButton
                mr={3}
                ml={4}
                mb={3}
                variant="ghost"
                position="absolute"
                right={-103} // Positioning the icon to the right
                bg="#1EE66E"
                borderRadius="50%"
                cursor="pointer"
                _hover={{ bg: '#1FB159' }}
              >
                <FaUser color="black" fontSize="22px" />
              </IconButton>
            )}
          </Flex>
        </Center>
      </Container>
    </Box>
  );
};

export default QnACard;
