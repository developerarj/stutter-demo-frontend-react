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

const SessionPrediction = ({
  audioFileName,
  modelName,
  modelVersion,
  totalFile,
  num_files_after_prediction,
  audioFileUrl,
  isPlayer,
  text,
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

  return (
    <Box w="100%">
      <Text p={2}>Dialog: {text}</Text>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 6 }} spacing={5}>
        <Box borderWidth="1px" borderColor="#1EE66E" p={4} borderRadius={10}>
          <VStack>
            <Text fontSize="sm">Disfluency</Text>
            <Text fontSize="md" as="b">
              {calculatePercentage(
                num_files_after_prediction.Disfluent,
                totalFile
              ).toFixed(2)}{' '}
              %
            </Text>
          </VStack>
        </Box>
        <Box borderWidth="1px" borderColor="#1EE66E" p={4} borderRadius={10}>
          <VStack>
            <Text fontSize="sm">Fluency</Text>
            <Text fontSize="md" as="b">
              {calculatePercentage(
                num_files_after_prediction.Fluent,
                totalFile
              ).toFixed(2)}{' '}
              %
            </Text>
          </VStack>
        </Box>
        <Box borderWidth="1px" borderColor="#1EE66E" p={4} borderRadius={10}>
          <VStack>
            <Text fontSize="sm">Natural Pause</Text>
            <Text fontSize="md" as="b">
              {calculatePercentage(
                num_files_after_prediction.NaturalPause,
                totalFile
              ).toFixed(2)}{' '}
              %
            </Text>
          </VStack>
        </Box>
        <Box borderWidth="1px" borderColor="#1EE66E" p={4} borderRadius={10}>
          <VStack>
            <Text fontSize="sm">Interjections</Text>
            <Text fontSize="md" as="b">
              {calculatePercentage(
                num_files_after_prediction.Interjection,
                totalFile
              ).toFixed(2)}{' '}
              %
            </Text>
          </VStack>
        </Box>
        <Box borderWidth="1px" borderColor="#1EE66E" p={4} borderRadius={10}>
          <VStack>
            <Text fontSize="sm">Background Noise</Text>
            <Text fontSize="md" as="b">
              {calculatePercentage(
                num_files_after_prediction.Music,
                totalFile
              ).toFixed(2)}{' '}
              %
            </Text>
          </VStack>
        </Box>
        <Box borderWidth="1px" borderColor="#1EE66E" p={4} borderRadius={10}>
          <VStack>
            <Text fontSize="sm">NoSpeech</Text>
            <Text fontSize="md" as="b">
              {calculatePercentage(
                num_files_after_prediction.NoSpeech,
                totalFile
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

export default SessionPrediction;
