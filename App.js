import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import back from './images/back6.jpg'
import text from './images/corono.jpg'
import {
  fetchCountries,
  fetchCountryData,
  setSelectedCountry,} from './features/covid/covidSlice';
import {
  Box, Select, Text, Spinner,Flex, Heading, HStack, Image} from '@chakra-ui/react';
import Deaths from './components/deaths';
import Active from './components/active';
import Recovered from './components/revocered';
import Infected from './components/infected';

function App() {
  const dispatch = useDispatch();
  const { countries, selectedCountry,  loading, error } = useSelector((state) => state.covid);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCountry) {
      dispatch(fetchCountryData(selectedCountry));
    }
  }, [dispatch, selectedCountry]);

  const handleCountryChange = (e) => {
    dispatch(setSelectedCountry(e.target.value));
  };

  return (
    <>
    <Flex  h="full" w="full" bgImage={`url(${back})`}     bgSize="contain"
  bgPosition="center" 
  bgRepeat="no-repeat" justifyContent="center" maxH="1500px" pb="500px"
        alignItems="center"  pt="42px"
        flexDirection="column">
          <Flex flexDirection="row" justifyContent="center" >
             <Box w={["10%" , "20%"]} ></Box>
            <Box w={["87%" , "78%"]} >
      <Image src={text}  w="420px" h="100px" />
      <Text mt="10px" fontSize="20px" color="#393e40" fontWeight="bold" fontFamily="monospace" textDecoration="underline" textDecorationColor="gray.400"> Country Wise Cases of Corona Virus</Text>
    <i> <Text mt="2px" fontSize="14px" color="#393e40" fontWeight="normal" fontFamily="monospace"  textDecoration="underline" textDecorationColor="gray.400" > (For a Particlar select a Country from below)</Text> </i>
</Box>
<Box w={["3%" , "2%"]} >
           <Box w="350px">
       
      <Select onChange={handleCountryChange} value={selectedCountry}       sx={{
              width: '200px', 
              border: '2px solid gray.200', 
              borderRadius: 'md', 
              padding: '8px',
              fontSize: '16px', 
              backgroundColor: '#ebf0ef', 
            }}
            placeholder="Bir ülke seçin" 
          >  
        {countries.map((country) => (
          <option key={country} value={country}>{country}</option>
        ))}  
       
       
      </Select>

       </Box>
    
</Box>
 </Flex>
      {loading ? (
        <Flex justifyContent="center" alignContent="center"  h="full" w="full"> 
        <Spinner size="md"     w="100px" 
        h="100px" 
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column" />
        </Flex>
      ) : error ? (
        <Text color="red.500">Hata: {error}</Text>
      ) : (
        <>
        <Flex direction="row"  mt="50px"   justifyContent="space-around" w="100%" maxW="1200px" mx="auto">
         
         <Box w={["20%" ,"30%"]}>
       <Deaths/>
       </Box>
        <Box  w={["20%" ,"30%"]}>
       <Active/>
       </Box>
        <Box  w={["20%" ,"30%"]}>
       <Recovered/>
       </Box>
        <Box  w={["20%" ,"30%"]}>
       <Infected/>  
       </Box>  
        </Flex>
    
        </>
      )}
    </Flex>
    </>
  );
}

export default App;
