"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Flex, Spinner, Text, Button } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { createListCollection } from "@chakra-ui/react";
import Property from "@/components/Property";
import { filterData, getFilterValues } from "@/utils/filterData";

export function SearchPage({ fetchHandler }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(Object.fromEntries(searchParams));
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState(() => {
    return filterData.reduce((acc, filter) => {
      acc[filter.queryName] = query[filter.queryName] || "";
      return acc;
    }, {});
  });

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    const values = getFilterValues(filters);
    const params = values.reduce((acc, item) => {
      if (item.value) acc[item.label] = item.value;
      return acc;
    }, {});
    const newParams = {
      ...params,
      locationExternalIDs: 5002,
    };
    const response = await fetchHandler("/properties/list", newParams);
    if (response?.error) {
      setError(response?.error?.message);
    } else {
      setProperties(response?.result?.hits || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleFilterChange = (event, queryName) => {
    const newValue = event.value;
    setFilters((prevFilters) => ({ ...prevFilters, [queryName]: newValue }));
    setQuery((prevQuery) => ({ ...prevQuery, [queryName]: newValue }));
  };

  const handleApplyFilters = () => {
    const queryString = new URLSearchParams(query).toString();
    router.replace(`/search?${queryString}`);
    fetchProperties();
  };

  return (
    <Box>
      <Box p="4" mb="4">
        <form style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Flex flexWrap="wrap" gap="4" mb="4">
            {filterData.map((filter) => {
              const collection = createListCollection({ items: filter.items });
              return (
                <SelectRoot
                  maxWidth="200px"
                  collection={collection}
                  key={filter.queryName}
                  defaultValue={filters[filter.queryName]}
                  onValueChange={(event) =>
                    handleFilterChange(event, filter.queryName)
                  }
                >
                  <SelectLabel fontWeight="bold">
                    {filter.placeholder}
                  </SelectLabel>
                  <SelectTrigger>
                    <SelectValueText placeholder={filter.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {collection.items.map((item) => (
                      <SelectItem item={item} key={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              );
            })}
          </Flex>
          <Button colorPalette="blue" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </form>
      </Box>
      <Suspense fallback={<Spinner />}>
        <Flex flexWrap="wrap" justifyContent="center">
          {loading ? (
            <Flex
              h="200px"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Spinner size="xl" />
              <Text mt="2" fontSize="2xl">
                Loading properties...
              </Text>
            </Flex>
          ) : error ? (
            <Flex h="200px" alignItems="center" justifyContent="center">
              <Text fontSize="2xl" color="red.500">
                {error}
              </Text>
            </Flex>
          ) : properties.length === 0 ? (
            <Flex h="200px" alignItems="center" justifyContent="center">
              <Text fontSize="2xl" color="yellow.500">
                No properties found for the selected filters.
              </Text>
            </Flex>
          ) : (
            properties.map((property) => (
              <Property property={property} key={property.id} />
            ))
          )}
        </Flex>
      </Suspense>
    </Box>
  );
}
