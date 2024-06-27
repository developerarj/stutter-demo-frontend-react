import {
  Box,
  Flex,
  Center,
  Button,
  SimpleGrid,
  Text,
  Divider,
} from '@chakra-ui/react';
import FileUpload from '../../components/FileUpload';
import AudioRecorder from '../../components/AudioRecorder';
import AudioPlayer from '../../components/AudioPlayer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadAudioFile, userDetails } from '../../services/Common';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleFile = file => {
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setAudioUrl(null);
  };

  useEffect(() => {
    if (selectedFile && !audioUrl) {
      const renamedFile = renameFileWithTimestamp(selectedFile);
      setSelectedFile(renamedFile);
      const fileUrl = URL.createObjectURL(selectedFile);
      setAudioUrl(fileUrl);
    }
  }, [audioUrl, selectedFile]);

  const handleUploadFile = async () => {
    setIsSubmit(true);
    try {
      const res = await uploadAudioFile(selectedFile);

      if (res.status === 200) {
        setSelectedFile(null);
        setAudioUrl(null);
        navigate('/user/myaudio');
      }
    } catch (error) {
      console.log('Error uploading');
    }
  };

  const renameFileWithTimestamp = file => {
    const timestamp = Date.now();
    const fileName = `${user?.username}_${timestamp}."mp3"`;
    return new File([file], fileName, { type: file.type });
  };

  const getUserInfo = async () => {
    try {
      const res = await userDetails();

      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (error) {
      console.log('Error uploading');
    }
  };

  useEffect(() => {
    if (!user) getUserInfo();
  });

  return (
    <Box p={4}>
      <Text fontSize="2xl">Upload your document</Text>

      <Divider orientation="horizontal" bg="#1EE66E" borderWidth="2px" mt={4} />

      {!audioUrl && (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} p={4}>
          <FileUpload setSelectedFile={handleFile} audioUrl={audioUrl} />
          <AudioRecorder setSelectedFile={handleFile} audioUrl={audioUrl} />
        </SimpleGrid>
      )}

      {audioUrl && (
        <Center>
          <Box p={10} w="100%">
            <AudioPlayer audioUrl={audioUrl} />
          </Box>
        </Center>
      )}

      <Center>
        {selectedFile && (
          <Flex>
            <Button
              isLoading={isSubmit}
              mt={10}
              mr={2}
              bg="#1EE66E"
              color={'black'}
              rounded={'xl'}
              boxShadow={'xl'}
              _hover={{
                bg: '#1EE66E.500',
              }}
              _focus={{
                bg: '#1EE66E.500',
              }}
              onClick={handleUploadFile}
            >
              Upload File
            </Button>

            <Button
              isLoading={isSubmit}
              mt={10}
              ml={2}
              bg="#FB493F"
              color={'white'}
              rounded={'xl'}
              boxShadow={'xl'}
              _hover={{
                bg: '#FB493F.500',
              }}
              _focus={{
                bg: '#FB493F.500',
              }}
              onClick={handleRemoveFile}
            >
              Remove File
            </Button>
          </Flex>
        )}
      </Center>
    </Box>
  );
};

export default Home;
