import {
  Wrap,
  WrapItem,
  Box,
  Center,
  Card,
  CardBody,
  Text,
  Flex,
  Spacer,
  Input,
  Button,
  Badge,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import ModalDetailesCard from '../../components/ModalCard/ModalDetailesCard';
import { getModal, uploadModalFile } from '../../services/Admin';
import React, { useEffect, useState } from 'react';

const ModalDetails = () => {
  let { id } = useParams();
  const [isSubmit, setIsSubmit] = useState(false);
  const [predList, setPredList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getModal(id);

        if (response && response.data) {
          setModal(response.data); // Assuming the API returns data in the form of an array of audio files
          setLoading(false);
        } else {
          setError('Failed to fetch modals files');
          setLoading(false);
        }
      } catch (error) {
        setError('An error occurred while fetching modal files');
        setLoading(false);
      }
    };

    if (!modal) fetchData();
  }, [modal]);

  const handleUploadFile = async () => {
    setIsSubmit(true);
    if (modal && modal.type) {
      try {
        const res = await uploadModalFile(selectedFile, modal.type);

        if (res.status === 200) {
          setModal(null);
          setIsSubmit(false);
        }
      } catch (error) {
        console.log('Error uploading');
      }
    } else {
      setIsSubmit(false);
    }
  };

  const handleFileSelect = e => {
    const files = Array.from(e.target.files);
    const file = files[0];
    setSelectedFile(file);
  };

  return (
    <Box>
      {modal && (
        <Center>
          <Card w="100%" h="100%">
            <CardBody>
              <Wrap spacing="20px">
                <WrapItem>
                  <Box>
                    <Text fontSize="2xl">
                      {modal.type} | Version{modal.version}
                    </Text>
                    <Text fontSize="sm">Accuracy: {modal.accuracy}%</Text>
                    {modal.isActive && (
                      <Badge bg="#1EE66E" color="black">
                        Active
                      </Badge>
                    )}

                    {!modal.isActive && <Badge bg="#FB493F">InActive</Badge>}
                  </Box>
                </WrapItem>

                {modal.url.length === 0 && (
                  <WrapItem>
                    <Box>
                      <Text fontSize="sm">
                        No file found. please upload modal
                      </Text>

                      <Input
                        type="file"
                        accept=".h5"
                        w="50%"
                        mr={2}
                        p={1}
                        onChange={handleFileSelect}
                      />

                      <Button
                        isLoading={isSubmit}
                        bg={'#1EE66E'}
                        color={'black'}
                        rounded={'xl'}
                        boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                        _hover={{
                          bg: 'green.500',
                        }}
                        _focus={{
                          bg: 'green.500',
                        }}
                        onClick={handleUploadFile}
                      >
                        Update Modal
                      </Button>
                    </Box>
                  </WrapItem>
                )}
              </Wrap>
            </CardBody>
          </Card>
        </Center>
      )}

      {modal && modal.url.length !== 0 && predList.length !== 0 && (
        <>
          <Wrap>
            <WrapItem>
              <ModalDetailesCard
                filename="username+filename"
                fluent="8"
                disfluent="9"
                naturalPause="9"
                Interjection="9"
                modal="lstm_v1"
              />
            </WrapItem>
          </Wrap>
        </>
      )}
    </Box>
  );
};

export default ModalDetails;
