import { Box, Grid, Text, Flex, Button } from "@chakra-ui/react";
import {
  useGetFieldsQuery,
  useGetFilteredItemsQuery,
  useGetIdsQuery,
  useGetItemsQuery,
} from "../store/api";
import ItemCard from "./ItemCard";
import { useEffect, useMemo, useState } from "react";
import Pagination from "./Pagination";
import FilterItem from "./FilterItem";

const ItemsList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [params, setParams] = useState({});
  const [totalPages, setTotalPages] = useState(0);

  const { data: brands } = useGetFieldsQuery({ field: "brand" });
  function getUniqueArray(array) {
    return [...new Set(array)];
  }
  const uniqueBrands = getUniqueArray(brands);

  const {
    data: ids,
    error: idsError,
    isLoading: idsLoading,
  } = useGetIdsQuery({ limit: 50, offset: 50 * currentPage });

  const hasParams = Object.keys(params).length > 0;

  const {
    data: filteredIds,
    error: filteredIdsError,
    isLoading: filteredIdsLoading,
  } = useGetFilteredItemsQuery(params, {
    skip: !hasParams,
  });

  const idsToFetch = useMemo(() => {
    if (filteredIds && hasParams) {
      return filteredIds.slice(0 + 50 * currentPage, 50 + 50 * currentPage);
    }
    return ids;
  }, [filteredIds, ids, currentPage, hasParams]);

  const {
    data,
    error: dataError,
    isLoading: itemsLoading,
  } = useGetItemsQuery(
    { ids: getUniqueArray(idsToFetch) },
    { skip: !idsToFetch }
  );

  useEffect(() => {
    setTotalPages(
      filteredIds?.length ? Math.floor(filteredIds?.length / 50) : 161
    );
  }, [data, params, filteredIds]);

  const updateParams = (key, value) => {
    setCurrentPage(0);
    setParams((prevParams) => {
      if (value) {
        return {
          ...prevParams,
          [key]: value,
        };
      } else {
        const { [key]: removeParam, ...rest } = prevParams;
        return rest;
      }
    });
  };

  const handleSearchProduct = (e) => {
    updateParams("product", e.target.value);
  };

  const handleSearchPrice = (e) => {
    updateParams("price", e.target.value ? +e.target.value : null);
  };

  const handleSearchBrand = (e) => {
    updateParams("brand", e);
  };
  const resetFilters = () => {
    setCurrentPage(0);
    setParams({});
  };

  return (
    <Box margin={"0 auto"} p={5} maxW={"1400px"}>
      <Flex alignItems={"center"} columnGap={3} mb={5}>
        <FilterItem
          filterType={"input"}
          placeholder={"Поиск изделия"}
          search={params.product}
          handleSearch={handleSearchProduct}
        />
        <FilterItem
          filterType={"input"}
          inputType={"number"}
          placeholder={"Цена"}
          search={params.price}
          handleSearch={handleSearchPrice}
        />
        <FilterItem
          filterType={"menu"}
          search={params.brand}
          handleSearch={handleSearchBrand}
          uniqueBrands={uniqueBrands}
        />
        <Button
          bgColor={"red.600"}
          color={"white"}
          _hover={{ bgColor: "red.500" }}
          onClick={resetFilters}
        >
          Сбросить фильтры
        </Button>
      </Flex>
      {(idsLoading && itemsLoading && filteredIdsLoading) ||
      (idsToFetch?.length && !data?.length) ? (
        <Text textAlign={"center"}>загрузка</Text>
      ) : (
        <>
          <Grid
            templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }}
            gap={5}
          >
            {!idsToFetch?.length ? (
              <Text>Изделия не найдены</Text>
            ) : (
              data?.map((item, index) => (
                <ItemCard
                  key={index}
                  id={item.id}
                  product={item.product}
                  price={item.price}
                  brand={item.brand}
                />
              ))
            )}
          </Grid>
          {idsToFetch?.length > 0 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default ItemsList;
