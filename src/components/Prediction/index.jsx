import {
  Box,
  Badge,
  Text,
  Wrap,
  WrapItem,
  VStack,
  SimpleGrid,
} from '@chakra-ui/react';
import AudioPlayer from '../AudioPlayer';
import { useEffect } from 'react';

const Prediction = ({
  predictionId,
  audioFileName,
  modelName,
  modelVersion,
  totalFile,
  num_files_after_prediction,
  audioFileUrl,
  isPlayer,
  setFeedbackPayload,
  feedbackPayload,
}) => {
  function calculatePercentage(part, total) {
    if (typeof part !== 'number' || typeof total !== 'number') {
      throw new Error('Invalid input: part and total must be numbers');
    }
    if (total === 0) {
      throw new Error('Total must not be zero');
    }

    const percentage = (part / total) * 100;
    return parseFloat(percentage); // Ensure the result is a number
  }

  function valueCorrection() {
    const musicFiles = num_files_after_prediction.Music;
    const noSpeechFiles = num_files_after_prediction.NoSpeech;

    if (musicFiles === undefined || noSpeechFiles === undefined) {
      throw new Error(
        'Invalid input: num_files_after_prediction.Music or num_files_after_prediction.NoSpeech is undefined'
      );
    }

    const correction =
      calculatePercentage(musicFiles, totalFile) +
      calculatePercentage(noSpeechFiles, totalFile);

    if (isNaN(correction)) {
      throw new Error('Correction calculation resulted in NaN');
    }

    const toAdd = correction / 6;

    return toAdd; // Return as a string with 2 decimal places
  }

  useEffect(() => {
    if (!feedbackPayload) {
      setFeedbackPayload({
        predictionId: predictionId,
        disfluency:
          (
            calculatePercentage(
              num_files_after_prediction.Disfluent,
              totalFile
            ) + valueCorrection()
          ).toFixed(2) + '%',
        fluency:
          (
            calculatePercentage(num_files_after_prediction.Fluent, totalFile) +
            valueCorrection()
          ).toFixed(2) + '%',
        interjection:
          (
            calculatePercentage(
              num_files_after_prediction.Interjection,
              totalFile
            ) + valueCorrection()
          ).toFixed(2) + '%',
        naturalPause:
          (
            calculatePercentage(
              num_files_after_prediction.NaturalPause,
              totalFile
            ) + valueCorrection()
          ).toFixed(2) + '%',
      });
    }
  }, [feedbackPayload]);

  return (
    <Box>
      <Wrap m={2}>
        <WrapItem>
          <Badge>Audio File Name : {audioFileName}</Badge>
        </WrapItem>
        <WrapItem>
          <Badge>Model : {modelName}</Badge>
        </WrapItem>
        <WrapItem>
          <Badge>Model Version: {modelVersion}</Badge>
        </WrapItem>
      </Wrap>

      <SimpleGrid columns={4} spacing={5}>
        <Box borderWidth="1px" borderColor="#1EE66E" p={4} borderRadius={10}>
          <VStack>
            <Text fontSize="xl">Disfluency</Text>
            <Text fontSize="2xl" as="b">
              {(
                calculatePercentage(
                  num_files_after_prediction.Disfluent,
                  totalFile
                ) + valueCorrection()
              ).toFixed(2)}{' '}
              %
            </Text>
          </VStack>
        </Box>
        <Box borderWidth="1px" borderColor="#1EE66E" p={4} borderRadius={10}>
          <VStack>
            <Text fontSize="xl">Fluency</Text>
            <Text fontSize="2xl" as="b">
              {(
                calculatePercentage(
                  num_files_after_prediction.Fluent,
                  totalFile
                ) + valueCorrection()
              ).toFixed(2)}{' '}
              %
            </Text>
          </VStack>
        </Box>
        <Box borderWidth="1px" borderColor="#1EE66E" p={4} borderRadius={10}>
          <VStack>
            <Text fontSize="xl">Natural Pause</Text>
            <Text fontSize="2xl" as="b">
              {(
                calculatePercentage(
                  num_files_after_prediction.NaturalPause,
                  totalFile
                ) + valueCorrection()
              ).toFixed(2)}{' '}
              %
            </Text>
          </VStack>
        </Box>
        <Box borderWidth="1px" borderColor="#1EE66E" p={4} borderRadius={10}>
          <VStack>
            <Text fontSize="xl">Interjections</Text>
            <Text fontSize="2xl" as="b">
              {(
                calculatePercentage(
                  num_files_after_prediction.Interjection,
                  totalFile
                ) + valueCorrection()
              ).toFixed(2)}{' '}
              %
            </Text>
          </VStack>
        </Box>
      </SimpleGrid>

      {isPlayer && (
        <Box p={4}>
          <AudioPlayer audioUrl={audioFileUrl} />
        </Box>
      )}
    </Box>
  );
};

export default Prediction;
