import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { fetchApi } from "../utils/fetchApi";
import Property from "../components/Property";

const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageUrl,
}) => (
  <Flex
    flexWrap="wrap"
    justifyContent="center"
    alignItems="center"
    m="10"
    gap={5}
  >
    <Box width="500px" height="300px" position="relative">
      <Image
        src={imageUrl}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: "cover" }}
        alt="banner"
        priority="false"
      />
    </Box>
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1}
        <br />
        {title2}
      </Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">
        {desc1}
        <br />
        {desc2}
      </Text>
      <Button fontSize="xl">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

const Home = async () => {
  const propertyForRent = await fetchApi("/properties/list", {
    locationExternalIDs: 5002,
    purpose: "for-rent",
    hitsPerPage: 6,
  });

  const propertyForSale = await fetchApi("/properties/list", {
    locationExternalIDs: 5002,
    purpose: "for-sale",
    hitsPerPage: 6,
  });

  const propertiesForRent = propertyForRent?.hits;
  const propertiesForSale = propertyForSale?.hits;

  return (
    <Box>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap" justifyContent="center">
        {propertiesForRent &&
          propertiesForRent.length > 0 &&
          propertiesForRent.map((property) => (
            <Property property={property} key={property.id} />
          ))}
      </Flex>
      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy & Own"
        title2="Your Dream Home"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Flex flexWrap="wrap" justifyContent="center">
        {propertiesForSale &&
          propertiesForSale.length > 0 &&
          propertiesForSale.map((property) => (
            <Property property={property} key={property.id} />
          ))}
      </Flex>
    </Box>
  );
};

export default Home;
