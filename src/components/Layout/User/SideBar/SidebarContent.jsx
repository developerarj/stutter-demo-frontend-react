import React, { forwardRef } from 'react';
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  Icon,
  Image,
} from '@chakra-ui/react';
import { FiHome, FiActivity, FiLogOut } from 'react-icons/fi';
import { FaMusic, FaFile, FaNetworkWired } from 'react-icons/fa';
import NavItem from '../SideBar/NavItem';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const LinkItems = [
  { name: 'Home', icon: FiHome, link: '/home' },
  // {
  //   name: 'Activities',
  //   icon: FiActivity,
  //   link: '/user/activity',
  // },
  // { name: 'My Audio', icon: FaMusic, link: '/user/myaudio' },
  // { name: 'Predictions', icon: FaNetworkWired, link: '/user/prediction' },
  // { name: 'Progress Report', icon: FaFile, link: '/user/progress' },
];

const SidebarContent = forwardRef(({ sideBarOpen, onClose, ...rest }, ref) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('isAdmin');
    navigate('/login');
  };

  return (
    <Box
      ref={ref} // Forwarding the ref to the Box component
      transition="3s ease"
      bg={useColorModeValue('', 'gray.900')}
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex flexDirection="column" h="full">
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Image boxSize="60px" objectFit="cover" src="/Logo.png" alt="logo" />
          <CloseButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onClose}
          />
        </Flex>
        {LinkItems.map(link => (
          <NavItem key={link.name} icon={link.icon} link={link.link}>
            {link.name}
          </NavItem>
        ))}
        <Box p={4}></Box>
        <Box flex="1" />
        <Box mb={10}>
          <Box onClick={handleLogout}>
            <Flex
              align="center"
              p="4"
              mx="4"
              borderRadius="lg"
              role="group"
              cursor="pointer"
              _hover={{
                bg: 'red.400',
                color: 'white',
              }}
              color="#FB493F"
              {...rest}
            >
              <Icon
                mr="4"
                fontSize="14"
                _groupHover={{
                  color: 'white',
                }}
                as={FiLogOut}
                color="#FB493F"
              />
              Logout
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
});

export default SidebarContent;
