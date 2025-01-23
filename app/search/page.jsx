import { Suspense } from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { fetchHandler } from "@/utils/fetchHandler";
import { SearchPage } from "./SearchPage";

export default function SearchPageWrapper() {
  return (
    <Suspense
      fallback={
        <Box textAlign="center" alignContent="center" mt="4" h={"200px"}>
          <Spinner size="xl" />
          <Text mt="2" fontSize="2xl">
            Loading page...
          </Text>
        </Box>
      }
    >
      <SearchPage fetchHandler={fetchHandler} />
    </Suspense>
  );
}
