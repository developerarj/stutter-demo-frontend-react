import React from 'react';
import { Grid, GridItem, Box, Text, Progress, Icon } from '@chakra-ui/react';
import CustomBarChart from '../../components/Charts/CustomBarChart';
import CustomDoughnutChart from '../../components/Charts/CustomDoughnutChart';
import CustomPieChart from '../../components/Charts/CustomPieChart';
import CustomLineChart from '../../components/Charts/CustomLineChart';
import { FaCrown } from 'react-icons/fa';

const completion_percentage = '50%';
const score = '7/10';
const value_gradient = '50%';

const Results = () => {
  return (
    <Box p={4}>
      <Grid
        templateColumns={{
          base: '1fr',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        gap={4}
      >
        <GridItem
          w="full"
          h={{ base: 'auto', sm: '140px' }}
          bg="#232340"
          borderRadius="10px"
          border="1px"
          borderColor="#1EE66E"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          textAlign="center"
          color="white"
          p={4}
        >
          <Text
            fontSize="16px"
            fontFamily="DM Sans"
            fontWeight="700"
            lineHeight="20px"
            letterSpacing="-0.02em"
            textAlign="left"
            mb={2}
            color="white"
          >
            Your Score
            <Icon as={FaCrown} w={10} h={5} color="rgba(115, 207, 17, 1)" />
          </Text>
          <Box
            fontSize={{ base: '36px', sm: '60px' }}
            fontWeight="bold"
            fontFamily="Roboto"
          >
            {score}
          </Box>
        </GridItem>
        <GridItem
          w="full"
          h={{ base: 'auto', sm: '140px' }}
          bg="#232340"
          borderRadius="10px"
          border="1px"
          borderColor="#1EE66E"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          textAlign="center"
          color="white"
          p={4}
        >
          <Text
            fontSize="16px"
            fontFamily="DM Sans"
            fontWeight="700"
            lineHeight="20px"
            letterSpacing="-0.02em"
            textAlign="left"
            mb={2}
            color="white"
          >
            Speech Disfluency
          </Text>
          <Box width="100%" maxWidth="250px" mt={10} position="relative">
            <Box
              position="relative"
              width="100%"
              height="25px"
              borderRadius="10px"
              bg="rgba(71, 76, 89, 1)" // Background color for the unfilled part
            >
              <Box
                position="absolute"
                top="0"
                left="0"
                width={value_gradient} // Gradient for the first x %
                height="100%"
                bg="linear-gradient(45deg, #5FA11A 0%, #D5FAAE 100%)"
                borderRadius="10px"
              />
              <Progress
                size="md"
                borderRadius="10px"
                height="25px"
                colorScheme="transparent"
                isAnimated={true}
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  bg: 'transparent',
                  borderRadius: '10px',
                }}
              />
            </Box>
          </Box>
        </GridItem>

        <GridItem
          w="full"
          h={{ base: 'auto', sm: '140px' }}
          bg="#232340"
          borderRadius="10px"
          border="1px"
          borderColor="#1EE66E"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          textAlign="center"
          color="white"
          p={4}
        >
          <Text
            fontSize="16px"
            fontFamily="DM Sans"
            fontWeight="700"
            lineHeight="20px"
            letterSpacing="-0.02em"
            textAlign="left"
            mb={2}
            color="white"
          >
            Today's Progress
          </Text>
          <Box
            fontSize={{ base: '36px', sm: '60px' }}
            fontWeight="bold"
            fontFamily="Roboto"
          >
            {completion_percentage}
          </Box>
        </GridItem>
      </Grid>

      {/* Charts Section */}
      <Grid
        templateColumns={{
          base: '1fr',
          sm: 'repeat(1fr)',
          md: 'repeat(2, 1fr)',
        }}
        gap={4}
        mt={6}
      >
        <GridItem
          w="full"
          borderRadius="10px"
          border="1px"
          borderColor="#1EE66E"
          display="flex"
          bg="#232340"
          height="md"
          alignItems="center"
          justifyContent="center"
        >
          <Box width="100%" minWidth="200px" maxWidth="300px" height="300px">
            <CustomBarChart />
          </Box>
        </GridItem>

        <GridItem
          w="full"
          borderRadius="10px"
          border="1px"
          borderColor="#1EE66E"
          bg="#232340"
          height="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box width="100%" minWidth="200px" maxWidth="300px" height="300px">
            <CustomDoughnutChart />
          </Box>
        </GridItem>

        <GridItem
          w="full"
          borderRadius="10px"
          border="1px"
          borderColor="#1EE66E"
          bg="#232340"
          height="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box width="100%" minWidth="200px" maxWidth="300px" height="300px">
            <CustomPieChart />
          </Box>
        </GridItem>

        <GridItem
          w="full"
          borderRadius="10px"
          border="1px"
          borderColor="#1EE66E"
          bg="#232340"
          height="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box width="100%" minWidth="200px" maxWidth="300px" height="300px">
            <CustomLineChart />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Results;
