import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Drawer,
  DrawerContent,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import SidebarContent from './SidebarContent';
import MobileNav from './MobileNav';
import { FaChevronRight } from 'react-icons/fa';
import Footer from '../Footer';
import { userDetails } from '../../../../services/Common';

const SideBar = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const sidebarRef = useRef(null);
  const leaveTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(leaveTimeoutRef.current);
    setSideBarOpen(false);
  };

  const handleMouseLeave = () => {
    clearTimeout(leaveTimeoutRef.current);
    leaveTimeoutRef.current = setTimeout(() => {
      setSideBarOpen(true);
    }, 30000);
  };

  useEffect(() => {
    clearTimeout(leaveTimeoutRef.current);
    leaveTimeoutRef.current = setTimeout(() => {
      setSideBarOpen(true);
    }, 30000);
  }, []);

  const fetchUserDetails = async () => {
    try {
      const res = await userDetails();

      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <Box minH="100vh" bg="#1e1e2d" position="relative">
      {sideBarOpen && (
        <IconButton
          p={2}
          fontSize="24px"
          variant="ghost"
          aria-label="Toggle Sidebar"
          icon={<FaChevronRight />}
          size="md"
          onClick={() => {
            onClose();
            setSideBarOpen(!sideBarOpen);
          }}
          borderRadius="full"
          position="absolute"
          left={4}
          pos="fixed"
          top="50vh"
          zIndex={1}
        />
      )}

      {/* Using React.forwardRef to forward the ref */}
      <SidebarContent
        onClose={onClose}
        display={{ base: 'none', md: sideBarOpen ? 'none' : 'block' }}
        ref={sidebarRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sideBarOpen={sideBarOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} user={user} />
      <Box
        ml={{ base: 0, md: sideBarOpen ? 0 : 60 }}
        p="4"
        transition="0.5s ease"
      >
        {children}
      </Box>
    </Box>
  );
};

export default SideBar;
