import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import SimpleDialogComponent from '../../components/Activity/SimpleDialog';
import {
  userDetails,
  getActivitySession,
  addActivitySession,
  getDialogue,
} from '../../services/Common';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const SimpleDialog = () => {
  let { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activitySessions, setActivitySessionList] = useState([]);
  const [isSession, setIsSession] = useState(false);
  const [session, setSession] = useState(null);
  const [sessionEnd, setSessionEnd] = useState(false);
  const [dialogue, setDialogue] = useState([]);

  const boxRef = useRef(null);

  const fetchUser = async () => {
    try {
      const res = await userDetails();

      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchActivitySession = async () => {
    try {
      const res = await getActivitySession(id);

      if (res.status === 200) {
        setActivitySessionList(res.data.activities);
      }
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  };

  const customScrollbarStyle = {
    '::-webkit-scrollbar': {
      height: '1px',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    '::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(0,0,0,0)',
    },
  };

  const convertApiResponseToDialogue = dialogue => {
    const dialogues = dialogue
      .split('\n\n')
      .filter(line => line.includes(':'))
      .map(line => {
        const [speaker, text] = line.split(':', 2);
        return {
          speaker: speaker.replace(/\*\*/g, '').trim(),
          text: text.trim(),
        };
      });

    return dialogues;
  };

  const handleScroll = e => {
    const scrollAmount = 200;
    if (e.deltaY > 0) {
      boxRef.current.scrollLeft += scrollAmount;
    } else {
      boxRef.current.scrollLeft -= scrollAmount;
    }
  };

  const fetchDialogue = async () => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const optionValue = searchParams.get('option');

      const res = await getDialogue(optionValue);
      if (res.status === 200) {
        const convertedDialogue = await convertApiResponseToDialogue(
          res.data.feedback
        );

        setDialogue(convertedDialogue);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDialogue();
  }, []);

  useEffect(() => {
    fetchUser();
    fetchActivitySession();
  }, []);

  useEffect(() => {
    if (isSession && !session) {
      handleAddSession();
    }
  }, [isSession, session]);

  const capitalizeFirstLetter = str => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl">Simple Dialog</Text>

      <Box
        ref={boxRef}
        mt={4}
        overflowX="auto"
        sx={customScrollbarStyle}
        display="flex"
        onWheel={handleScroll}
      >
        {/* {activitySessions.length !== 0 &&
          [...activitySessions].reverse().map((item, index) => (
            <Box
              key={index}
              border="1px solid"
              borderColor="#165D37"
              p={4}
              rounded="sm"
              cursor="pointer"
              mr={4}
              onClick={() => handleSessionResult(item._id)}
              minW="200px"
              flexShrink={0}
            >
              <Text fontSize="sm" p={2}>
                Theme: {item?.theme?.theme}
              </Text>
              <Text fontSize="sm" p={2}>
                Created: {item.createdDate}
              </Text>
            </Box>
          ))} */}
      </Box>

      {dialogue && user && (
        <SimpleDialogComponent
          setIsSession={setIsSession}
          isSession={isSession}
          session={session}
          setSession={setSession}
          activityId={id}
          user={user}
          setSessionEnd={setSessionEnd}
          username={capitalizeFirstLetter(user.username)}
          dialogue={dialogue}
        />
      )}
    </Box>
  );
};

export default SimpleDialog;
