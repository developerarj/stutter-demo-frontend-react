import {
  Box,
  Stack,
  Container,
  Input,
  Button,
  SimpleGrid,
  useBreakpointValue,
  Icon,
  Image,
  Center,
} from '@chakra-ui/react';
import { login } from '../services/Auth';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Blur = props => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setIsSubmit(true);
      const res = await login(username, password);

      if (res.status === 200) {
        if (res.data.isAdmin) {
          navigate('/');
        } else {
          navigate('/home');
        }

        setUsername('');
        setPassword('');
      }
    } catch (error) {
      setIsSubmit(false);
      setError('Invalid username or password');
    }
  };

  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}></Stack>
        <Stack
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}
          bg="#161622"
        >
          <Stack spacing={4}>
            <Center>
              <Image
                borderRadius="full"
                boxSize="150px"
                src="/Logo.png"
                alt="Dan Abramov"
              />
            </Center>
          </Stack>
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <Input
                bg={'#1E1E2D'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                placeholder="Username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <Input
                placeholder="password"
                bg={'#1E1E2D'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {error && <Box color="red">{error}</Box>}
            </Stack>
            <Button
              isLoading={isSubmit}
              loadingText="Submitting"
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bg="#1FB159"
              color={'white'}
              _hover={{
                bg: '#1FB159',
                boxShadow: 'xl',
              }}
              onClick={handleLogin}
            >
              Submit
            </Button>
          </Box>
          form
        </Stack>
      </Container>
      <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(70px)' }}
      />
    </Box>
  );
}
