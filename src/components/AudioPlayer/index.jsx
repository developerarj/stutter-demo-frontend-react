import React, { useRef, useMemo, useState, useEffect } from 'react';
import { IconButton, Card, Box, VStack, HStack, Text } from '@chakra-ui/react';
import { useWavesurfer } from '@wavesurfer/react';
import Timeline from 'wavesurfer.js/dist/plugins/timeline';
import ZoomPlugin from 'wavesurfer.js/dist/plugins/zoom';
import { FaPause, FaPlay } from 'react-icons/fa';

const AudioPlayer = ({ audioUrl }) => {
  const containerRef = useRef();

  const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: audioUrl,
    waveColor: '#1EE66E',
    progressColor: '#89969F',
    height: '20',
    sampleRate: 16000,
    dragToSeek: true,
    minPxPerSec: 10,

    plugins: useMemo(
      () => [
        // Timeline.create(),
        // ZoomPlugin.create({
        //   scale: 0.5,
        //   maxZoom: 5000,
        // }),
      ],
      []
    ),
  });

  const onPlayPause = () => {
    audioUrl && wavesurfer && wavesurfer.playPause();
  };

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      {audioUrl && (
        <HStack>
          <Box>
            {isPlaying ? (
              <IconButton
                boxShadow="xl"
                variant="ghost"
                borderColor="#FB493F"
                icon={<FaPause size={20} color="#FB493F" />}
                size="sm"
                onClick={onPlayPause}
              />
            ) : (
              <IconButton
                boxShadow="xl"
                variant="ghost"
                borderColor="#1EE66E"
                icon={<FaPlay size={20} color="#1EE66E" />}
                size="sm"
                onClick={onPlayPause}
              />
            )}
          </Box>
          <Box ref={containerRef} w="100%" />
          <Text color="#89969F">{formatTime(currentTime)}</Text>
        </HStack>
      )}
    </>
  );
};

export default AudioPlayer;
