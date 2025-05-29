import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Heading,
  VStack,
  Card,
  CardBody,
  Text,
  Badge,
  Spinner,
  Center,
  Image,
  HStack,
  useColorModeValue,
  Icon,
  useColorMode,
  IconButton,
  Spacer,
} from '@chakra-ui/react';
import { FaBasketballBall, FaMoon, FaSun } from 'react-icons/fa';
import teamLogos from './teamLogos'; // your team logos map

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle dark mode"
      icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
      onClick={toggleColorMode}
      size="md"
      variant="ghost"
      colorScheme="blue"
    />
  );
}

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
       // const response = await axios.get('http://localhost:5000/api/games');
        const response = await axios.get('https://nba-schedule-tracker.onrender.com/api/games');
        setGames(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch games');
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata',
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh" py={8}>
      <Container maxW="container.lg">
        <HStack spacing={3} mb={8} align="center">
          <Icon as={FaBasketballBall} w={8} h={8} color="orange.500" />
          <Heading color={useColorModeValue('blue.600', 'blue.300')}>
            Upcoming NBA Games
          </Heading>
          <Spacer />
          <ColorModeToggle />
        </HStack>
        <VStack spacing={4} align="stretch">
          {games.map((game) => (
            <Card
              key={game.id}
              boxShadow="lg"
              borderRadius="xl"
              bg={useColorModeValue('white', 'gray.800')}
              _hover={{ transform: 'translateY(-2px)', transition: 'all 0.2s ease-in-out' }}
            >
              <CardBody>
                <Box>
                  <HStack justify="space-between" align="center" mb={4}>
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      color={useColorModeValue('gray.600', 'gray.400')}
                    >
                      {formatDate(game.date)}
                    </Text>
                    <Badge
                      colorScheme={game.status === 'Final' ? 'green' : 'blue'}
                      fontSize="sm"
                      borderRadius="full"
                      px={3}
                      py={1}
                      textTransform="uppercase"
                      letterSpacing="wider"
                    >
                      {game.status}
                    </Badge>
                  </HStack>
                  <HStack spacing={4} align="center" justify="space-around">
                    <VStack flex={1} align="center">
                      <Image
                        src={teamLogos[game.homeTeam]}
                        boxSize="50px"
                        objectFit="contain"
                        alt={game.homeTeam}
                        mb={2}
                      />
                      <Text
                        fontSize="lg"
                        fontWeight="semibold"
                        color={useColorModeValue('gray.800', 'white')}
                      >
                        {game.homeTeam}
                      </Text>
                    </VStack>
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      color={useColorModeValue('orange.500', 'orange.300')}
                    >
                      VS
                    </Text>
                    <VStack flex={1} align="center">
                      <Image
                        src={teamLogos[game.visitorTeam]}
                        boxSize="50px"
                        objectFit="contain"
                        alt={game.visitorTeam}
                        mb={2}
                      />
                      <Text
                        fontSize="lg"
                        fontWeight="semibold"
                        color={useColorModeValue('gray.800', 'white')}
                      >
                        {game.visitorTeam}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              </CardBody>
            </Card>
          ))}
        </VStack>
      </Container>
    </Box>
  );
}

export default App;
