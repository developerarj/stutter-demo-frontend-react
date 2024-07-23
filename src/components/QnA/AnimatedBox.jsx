import styled, { keyframes } from 'styled-components';
import { Box } from '@chakra-ui/react';

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const AnimatedBox = styled(Box)`
  animation: ${props => (props.direction === 'up' ? slideDown : slideUp)} 0.5s
    ease-out;
`;

export default AnimatedBox;
