import { useSelector } from "react-redux"
import { Flex , Box , Text ,Heading  , HStack} from "@chakra-ui/react"

function Infected() {
    const { data , selectedCountry} = useSelector(state => state.covid)
  return (
      <>
   <Flex direction="column">
       <Box 
       bg="#dae2e8"
        w="180px" 
        h="300px" 
        border="2px solid"  
        borderColor="white"  
        boxShadow="xl"
        padding="20px" 
        rounded="40px"  
        display="flex"
        
        alignItems="center"
        flexDirection="column"
      >
      <Heading textDecoration="underline" color="#2e3233"> Infected </Heading>
         <HStack mt="10px">
      <Text fontSize="18px" color="#313536"fontWeight="bold"> Sayı :</Text>
       <Text fontSize="16px" textDecoration="underline">{data.cases?.toLocaleString()}</Text>
       </HStack>
        <Box mt="50px"textAlign="end">
          <Text fontFamily="monospace" fontSize="14px"> Number of Infected Cases of Covid-19  from {selectedCountry}</Text>
          </Box>
    </Box>
   </Flex>
  </>
  )
}

export default Infected