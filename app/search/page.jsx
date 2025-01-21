"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import Property from "@/components/Property";
import { fetchApi } from "@/utils/fetchApi";
import { filterData, getFilterValues } from "@/utils/filterData";

function SearchPage() {
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
    try {
      const values = getFilterValues(filters);
      const params = values.reduce((acc, item) => {
        if (item.value) acc[item.label] = item.value;
        return acc;
      }, {});
      const newParams = {
        ...params,
        locationExternalIDs: 5002,
      };
      const data = await fetchApi("/properties/list", newParams);
      setProperties(data?.hits || []);
    } catch (err) {
      setError("An error occurred while fetching properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleFilterChange = (event, queryName) => {
    const newValue = event.target.value;
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
      <Box bg="gray.100" p="4" mb="4">
        <form style={formStyles}>
          <Flex flexWrap="wrap" gap="4" mb="4">
            {filterData.map((filter) => (
              <div key={filter.queryName} style={selectContainerStyles}>
                <label htmlFor={filter.queryName} style={labelStyles}>
                  {filter.placeholder}
                </label>
                <select
                  id={filter.queryName}
                  value={filters[filter.queryName]}
                  onChange={(event) =>
                    handleFilterChange(event, filter.queryName)
                  }
                  style={selectStyles}
                >
                  <option value="">{filter.placeholder}</option>
                  {filter.items.map((item) => (
                    <option value={item.value} key={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </Flex>
          <button
            type="button"
            onClick={handleApplyFilters}
            style={buttonStyles}
          >
            Apply Filters
          </button>
        </form>
      </Box>
      <Suspense fallback={<Spinner />}>
        <Flex flexWrap="wrap" justifyContent="center">
          {loading ? (
            <Box textAlign="center" alignContent="center" mt="4" h={"200px"}>
              <Spinner size="xl" />
              <Text mt="2" fontSize="2xl">
                Loading properties...
              </Text>
            </Box>
          ) : error ? (
            <Box textAlign="center" alignContent="center" mt="4" h={"200px"}>
              <Text color="red.500">{error}</Text>
            </Box>
          ) : properties.length === 0 ? (
            <Box textAlign="center" alignContent="center" mt="4" h={"200px"}>
              <Text>No properties found for the selected filters.</Text>
            </Box>
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

function SearchPageWrapper() {
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
      <SearchPage />
    </Suspense>
  );
}

const formStyles = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const selectContainerStyles = {
  display: "flex",
  flexDirection: "column",
  minWidth: "150px",
};

const labelStyles = {
  marginBottom: "4px",
  fontSize: "14px",
  fontWeight: "bold",
  color: "#333",
};

const selectStyles = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  outline: "none",
  fontSize: "14px",
};

const buttonStyles = {
  padding: "10px 20px",
  backgroundColor: "#3182ce",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  transition: "background-color 0.3s",
};

export default SearchPageWrapper;
