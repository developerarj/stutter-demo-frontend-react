import { Box, Flex, Icon } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NavItem = ({ icon, link, children, ...rest }) => {
  const [isActive, setIsActive] = useState();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === link) {
      setIsActive(true);
    }
  }, [isActive]);

  return (
    <Box
      as="a"
      href={link}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      {...rest}
    >
      <Flex
        align="center"
        p="4"
        m={2}
        bg={isActive ? '#B4F4C1' : 'none'}
        color={isActive ? 'black' : 'none'}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: '#1EE66E',
          color: 'black',
        }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'black',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

export default NavItem;
