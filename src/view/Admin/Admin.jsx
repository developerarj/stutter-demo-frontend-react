import {
  Box,
  Center,
  Flex,
  WrapItem,
  Wrap,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import StatsCard from '../../components/StatsCard';
import { BsPerson } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import { getCount } from '../../services/Admin';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioFiles from './AudioFiles';

const Admin = () => {
  const [count, setCount] = useState(null);
  const navigate = useNavigate();

  const handleGetCount = async () => {
    try {
      const res = await getCount();

      if (res.status === 200) {
        setCount(res.data);
      }
    } catch (error) {
      console.log('Error uploading');
    }
  };

  useEffect(() => {
    if (!count) {
      handleGetCount();
    }
  }, [count]);

  const handleNavigate = () => {
    navigate('/admin/audio-files');
  };

  const navigateToClassifications = () => {
    navigate('/admin/classifications');
  };

  const navigateToPredictions = () => {
    navigate('/admin/prediction');
  };

  const renderSkeletons = () => (
    <Center>
      <Wrap spacing="30px">
        {[...Array(5)].map((_, index) => (
          <WrapItem key={index}>
            <Box
              px={{ base: 2, md: 4 }}
              py={'5'}
              shadow={'xl'}
              rounded={'lg'}
              width="200px" // Adjust width to match the StatsCard
              height="100px" // Adjust height to match the StatsCard
            >
              <SkeletonText mt="4" noOfLines={2} spacing="4" />
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </Center>
  );

  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      {!count ? (
        renderSkeletons()
      ) : (
        <Center>
          <Wrap spacing="30px">
            <WrapItem>
              <StatsCard
                title={'Users'}
                stat={count.users_count}
                icon={<BsPerson size={'3em'} />}
              />
            </WrapItem>
            <WrapItem>
              <StatsCard
                title={'Predictions'}
                stat={count.predictions_count}
                icon={<FiServer size={'3em'} />}
                onClick={navigateToPredictions}
              />
            </WrapItem>
            <WrapItem>
              <StatsCard
                title={'AudioFiles'}
                stat={count.audioFiles_count}
                icon={<GoLocation size={'3em'} />}
                onClick={handleNavigate}
              />
            </WrapItem>
            <WrapItem>
              <StatsCard
                title={'Active Modals'}
                stat={count.modal_count}
                icon={<GoLocation size={'3em'} />}
              />
            </WrapItem>
            <WrapItem>
              <StatsCard
                title={'Classifications'}
                stat={count.classifications_count}
                icon={<GoLocation size={'3em'} />}
                onClick={navigateToClassifications}
              />
            </WrapItem>
          </Wrap>
        </Center>
      )}
    </Box>
  );
};

export default Admin;
