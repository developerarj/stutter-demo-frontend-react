import React, { useState } from 'react';
import { Box, Center, Button, Text } from '@chakra-ui/react';
import { AiOutlineFolderOpen } from 'react-icons/ai';

const FileUpload = ({ setSelectedFile }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = e => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = e => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileUpload = files => {
    // Assuming you only upload one file

    const file = files[0];
    setSelectedFile(file);
  };

  const handleFileSelect = e => {
    const files = Array.from(e.target.files);
    handleFileUpload(files);
  };

  return (
    <Box
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Box
        // border={`4px dashed ${isDragging ? '#1EE66E' : '#89969F'}`}
        p="4"
        rounded="md"
        cursor="grab"
      >
        <Center>
          <AiOutlineFolderOpen size={80} color="#1EE66E" cursor="grab" />
        </Center>
        <Center cursor="grab">
          <Text fontSize="lg">Drag and drop your files</Text>
        </Center>
      </Box>
      <Center>
        <Text fontSize="md" m={4}>
          or
        </Text>
      </Center>
      <Center>
        <input
          type="file"
          id="file-input"
          style={{ display: 'none' }}
          onChange={handleFileSelect}
          accept=".mp3, .wav" // Accepts only mp3 and wav files
        />

        <label htmlFor="file-input">
          <Button colorScheme="teal" bg="#1EE66E" as="span">
            Select File
          </Button>
        </label>
      </Center>

      {/* {audioUrl && <AudioPlayer audioUrl={audioUrl} />} */}
    </Box>
  );
};

export default FileUpload;
