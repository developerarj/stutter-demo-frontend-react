import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Text,
  ListItem,
  Flex,
  OrderedList,
  Spinner,
  Container,
  useBreakpointValue,
  Skeleton,
  Stack,
  SkeletonText,
  Center,
} from '@chakra-ui/react';
import {
  getActivitySessionResults,
  getSessionPrediction,
} from '../../services/Common';
import AudioPlayer from '../../components/AudioPlayer';
import SessionPrediction from '../../components/Prediction/SessionPrediction';

const ActivitySessionResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [predictionExists, setPredictionExists] = useState(false);
  const [predictionSaved, setPredictionSaved] = useState(false);

  const containerMaxWidth = useBreakpointValue({ base: 'full', md: '4xl' });
  const boxHeight = useBreakpointValue({ base: '70vh', md: '90vh' });

  let { seesionId, option } = useParams();
  const navigate = useNavigate();

  const fetchgetActivitySessionResults = async () => {
    try {
      const res = await getActivitySessionResults(seesionId);

      if (res.status === 200) {
        setPredictionSaved(true);
        setLoading(true);
      } else {
        setPredictionExists(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchgetActivitySessionResults();
  }, []);

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

  const fetchPrediction = async id => {
    try {
      const res = await getSessionPrediction(id);

      if (res.status === 200) {
        setResults(res.data.results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (predictionExists) {
      fetchPrediction(seesionId);
    }
  }, [predictionExists]);

  return (
    <Box>
      <Flex justifyContent="center" my={4}>
        <Text fontSize={{ base: 'xl', md: '2xl' }}>Session Results</Text>
      </Flex>

      {results.length === 0 && (
        <Container maxW={containerMaxWidth}>
          <Box>
            <SkeletonText
              padding={4}
              mt="4"
              noOfLines={4}
              spacing="4"
              skeletonHeight="2"
            />
            <Stack padding={4} spacing={1} direction={['column', 'row']}>
              <Skeleton
                m={2}
                height="80px"
                width="200px"
                isLoaded={results.length !== 0}
              />
              <Skeleton
                m={2}
                height="80px"
                width="200px"
                isLoaded={results.length !== 0}
              />
              <Skeleton
                m={2}
                height="80px"
                width="200px"
                isLoaded={results.length !== 0}
              />
              <Skeleton
                m={2}
                height="80px"
                width="200px"
                isLoaded={results.length !== 0}
              />
            </Stack>
          </Box>
        </Container>
      )}

      {results.length !== 0 && (
        <Container maxW={containerMaxWidth}>
          <Box sx={customScrollbarStyle} overflow="auto" h={boxHeight}>
            <OrderedList spacing={4}>
              {results.length !== 0 &&
                results.map((item, index) => (
                  <ListItem key={index}>
                    <SessionPrediction
                      audioFileName={item.audioFile.filename}
                      audioFileUrl={item.audioFile.file_url}
                      modelName={item.modal.type}
                      modelVersion={item.modal.version}
                      totalFile={Number(item.totalFiles)}
                      num_files_after_prediction={{
                        Disfluent: item.disfluency,
                        Fluent: item.fluency,
                        Interjection: item.interjection,
                        Music: item.music,
                        NaturalPause: item.naturalPause,
                        NoSpeech: item.noSpeech,
                      }}
                      isPlayer={true}
                      text={item.audioFile.text}
                    />
                  </ListItem>
                ))}
            </OrderedList>
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default ActivitySessionResults;
