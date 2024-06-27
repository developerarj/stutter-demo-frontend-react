import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Badge,
  Button,
} from '@chakra-ui/react';

const AdminPrediction = () => {
  return (
    <Box maxW="7xl" mx={'auto'} pt={10} px={{ base: 2, sm: 12, md: 17 }}>
      <Box mb={4}>All Predictions</Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>username</Th>
              <Th>Text</Th>
              <Th>Fluency</Th>
              <Th>Disfluency</Th>
            </Tr>
          </Thead>
          <Tbody></Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminPrediction;
