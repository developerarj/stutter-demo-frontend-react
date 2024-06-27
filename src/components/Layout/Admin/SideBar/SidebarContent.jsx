import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  Divider,
  Icon,
} from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiActivity, FiStar } from 'react-icons/fi';
import NavItem from '../SideBar/NavItem';
import { FiLogOut } from 'react-icons/fi';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const LinkItems = [
  { name: 'Dashboard', icon: FiHome, link: '/' },
  // { name: 'Prediction', icon: FiActivity, link: '/admin/prediction' },
  { name: 'Modals', icon: FiStar, link: '/admin/modals' },
  // { name: 'Testing', icon: FiTrendingUp, link: '/admin/testing' },
  // { name: 'Classifications', icon: FiStar, link: '/admin/classifications' },

  { name: 'Activities', icon: FiStar, link: '/admin/activities' },
];

const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('isAdmin');
    navigate('/login');
  };

  return (
    <Box
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
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Logo
          </Text>
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
        <Box p={4}>
          <Divider orientation="horizontal" h="2" />
        </Box>
        <Box flex="1" /> {/* Pushes the bottom box to the bottom */}
        <Box mb={10}>
          {/* <Center>
            <Button color="#FB493F" leftIcon={<FiLogOut />} variant="ghost">
              Logout
            </Button>
          </Center> */}
          {/* <NavItem icon={FiLogOut} color="#FB493F">
            Logout
          </NavItem> */}
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
                fontSize="16"
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
};

export default SidebarContent;
