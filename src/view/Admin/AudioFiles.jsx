import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Badge,
  Button,
} from '@chakra-ui/react';
import { getAllAudioFiles, deleteAudioFile } from '../../services/Admin';

const AudioFiles = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAudioFiles = async () => {
    try {
      const response = await getAllAudioFiles();
      if (response.status === 200) {
        setAudioFiles(response.data?.audiofiles);
      }
    } catch (error) {
      console.log('Error fetching audio files:', error);
      setError('An error occurred while fetching audio files.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAudioFile = async id => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this audio file?'
    );
    if (!confirmed) {
      return;
    }

    setLoading(true); // Set loading to true when starting the operation
    try {
      const res = await deleteAudioFile(id);

      if (res.status === 200) {
        fetchAudioFiles();
      }
    } catch (error) {
      setError('An error occurred while deleting the audio file.');
    } finally {
      setLoading(false); // Set loading to false after operation completes
    }
  };

  useEffect(() => {
    fetchAudioFiles();
  }, []);

  return (
    <Box maxW="7xl" mx={'auto'} pt={10} px={{ base: 2, sm: 12, md: 17 }}>
      <Box mb={4}>AudioFiles</Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Filename</Th>
              <Th>URL</Th>
              <Th>isPredicted</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {audioFiles &&
              audioFiles.length > 0 &&
              audioFiles.map(audioFile => (
                <Tr key={audioFile._id}>
                  <Td>{audioFile.filename}</Td>
                  <Td>
                    <a
                      href={audioFile.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'block',
                        textDecoration: 'underline',
                        color: 'inherit',
                      }}
                    >
                      {audioFile.file_url}
                    </a>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={audioFile.isPredicted ? 'green' : 'red'}
                      variant="subtle"
                    >
                      {audioFile.isPredicted ? 'True' : 'False'}
                    </Badge>
                  </Td>
                  <Td>
                    {!audioFile.isPredicted && (
                      <Button
                        colorScheme="red"
                        onClick={() => handleDeleteAudioFile(audioFile._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AudioFiles;
