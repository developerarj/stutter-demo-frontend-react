import {
  Box,
  Stat,
  Center,
  WrapItem,
  Wrap,
  Text,
  Divider,
  Flex,
  StatLabel,
  StatNumber,
  Spacer,
  Select,
  useStyleConfig,
  Collapse,
  useDisclosure,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import { FiActivity } from 'react-icons/fi';
import { getActivityList, getActivitySession } from '../../services/Common';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Activity = () => {
  const { isOpen, onToggle } = useDisclosure();

  const [activity, setActivity] = useState([]);
  const [selectedStat, setSelectedStat] = useState(null);
  const [activitySessions, setActivitySessionList] = useState([]);
  const navigate = useNavigate();
  const boxRef = useRef(null);

  const fetchActivityList = async () => {
    try {
      const res = await getActivityList();

      if (res.status === 200) {
        setActivity(res.data.activities);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchActivitySession = async () => {
    try {
      const res = await getActivitySession('666a948d4d5cfd71e72ef22f');

      if (res.status === 200) {
        setActivitySessionList(res.data.activities);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSessionResult = async sessionId => {
    navigate(
      `/user/activity/simple-dialog/666a948d4d5cfd71e72ef22f/${sessionId}`
    );
  };

  const handleNavigateUrl = url => {
    window.location.href = url;
  };

  const handleStatClick = index => {
    onToggle();
    setSelectedStat(selectedStat === index ? null : index);
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

  const handleScroll = e => {
    const scrollAmount = 200;
    if (e.deltaY > 0) {
      boxRef.current.scrollLeft += scrollAmount;
    } else {
      boxRef.current.scrollLeft -= scrollAmount;
    }
  };

  useEffect(() => {
    fetchActivityList();
    fetchActivitySession();
  }, []);

  return (
    <Box p={4}>
      <Flex>
        <Text fontSize="2xl">Activity</Text>
        <Spacer />
      </Flex>

      <Divider orientation="horizontal" bg="#1EE66E" borderWidth="2px" mt={4} />

      {activity.length === 0 && (
        <Stack padding={4} spacing={1} direction={['column', 'row']}>
          <Skeleton
            m={2}
            height="80px"
            width="200px"
            isLoaded={activity.length !== 0}
          />
          <Skeleton
            m={2}
            height="80px"
            width="200px"
            isLoaded={activity.length !== 0}
          />
          <Skeleton
            m={2}
            height="80px"
            width="200px"
            isLoaded={activity.length !== 0}
          />
        </Stack>
      )}

      {activity.length !== 0 && (
        <Wrap spacing="30px" m={4}>
          {activity.map((item, index) => (
            <WrapItem key={index}>
              <Box width="100%">
                <Stat
                  px={{ base: 2, md: 4 }}
                  py={'5'}
                  shadow={'xl'}
                  border={'1px solid '}
                  borderColor={'#1EE66E'}
                  rounded={'sm'}
                  cursor="pointer"
                  onClick={() => handleStatClick(index)}
                >
                  <Flex justifyContent={'space-between'}>
                    <Box pl={{ base: 2, md: 4 }}>
                      <StatLabel fontWeight={'medium'} isTruncated>
                        {item.title}
                      </StatLabel>
                      <StatNumber
                        fontSize={'xl'}
                        fontWeight={'medium'}
                      ></StatNumber>
                    </Box>
                    <Box ml={8} my={'auto'} alignContent={'center'}>
                      <FiActivity size={'2em'} />
                    </Box>
                  </Flex>
                </Stat>

                <Box mt={4}>
                  <Collapse
                    in={isOpen}
                    transition={{
                      exit: { delay: 0.2 },
                      enter: { duration: 0.5 },
                    }}
                  >
                    {item.theme.map((th, index) => (
                      <Box
                        key={index}
                        p={2}
                        color="white"
                        mt={2}
                        bg="#232340"
                        border={'1px solid '}
                        borderColor={'#1EE66E'}
                        rounded="sm"
                        shadow="md"
                        cursor="pointer"
                        onClick={e =>
                          handleNavigateUrl(
                            `/user${item.endpoint}/${item._id}?option=${th._id}`
                          )
                        }
                      >
                        <Text>{th.theme}</Text>
                      </Box>
                    ))}
                  </Collapse>
                </Box>
              </Box>
            </WrapItem>
          ))}
        </Wrap>
      )}

      {activitySessions.length !== 0 && (
        <>
          <Flex>
            <Text fontSize="2xl">Sessions</Text>
            <Spacer />
          </Flex>

          <Divider
            orientation="horizontal"
            bg="#1EE66E"
            borderWidth="2px"
            mt={4}
          />

          <Box
            ref={boxRef}
            mt={4}
            overflowX="auto"
            sx={customScrollbarStyle}
            display="flex"
            onWheel={handleScroll}
          >
            {activitySessions.length === 0 && (
              <Stack padding={4} spacing={1} direction={['column', 'row']}>
                <Skeleton
                  m={2}
                  height="80px"
                  width="200px"
                  isLoaded={activity.length !== 0}
                />
                <Skeleton
                  m={2}
                  height="80px"
                  width="200px"
                  isLoaded={activity.length !== 0}
                />
                <Skeleton
                  m={2}
                  height="80px"
                  width="200px"
                  isLoaded={activity.length !== 0}
                />
              </Stack>
            )}

            {activitySessions.length !== 0 &&
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
              ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Activity;
