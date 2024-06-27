import { Box, Center, Flex, WrapItem, Wrap } from '@chakra-ui/react';
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

  const navigateToPredictions=()=>{
    navigate('/admin/prediction')
  }

  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      {count && (
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
                title={'Perdictions'}
                stat={count.predictions_count}
                icon={<FiServer size={'3em'} />}
                onClick={navigateToPredictions}
              />
            </WrapItem>

            <WrapItem>
              <StatsCard
                title={'AudioFile'}
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
