import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const calculatePages = () => {
      if (currentPage < 3) {
        setPages([0, 1, 2, 3, 4].slice(0, Math.min(5, totalPages + 1)));
      } else if (currentPage > totalPages - 2) {
        setPages(
          [
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
          ].filter((page) => page <= totalPages)
        );
      } else {
        setPages([
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
        ]);
      }
    };

    calculatePages();
  }, [currentPage, totalPages, setPages]);

  const nextPage = () => {
    setCurrentPage((page) => page + 1);
  };
  const prevPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const setPage = (number) => {
    setCurrentPage(number);
  };

  return (
    <>
      {totalPages > 0 && (
        <Flex p={4} mt={5} justifyContent={"center"} columnGap={2}>
          <Button
            p={2}
            onClick={prevPage}
            isDisabled={currentPage === 0 ? true : false}
          >
            <ArrowBackIcon />
          </Button>
          {pages.map((page) => (
            <Button
              key={page}
              bgColor={currentPage === page ? "gray.300" : "gray.100"}
              onClick={() => setPage(page)}
            >
              {page + 1}
            </Button>
          ))}
          <Button
            p={2}
            onClick={nextPage}
            isDisabled={currentPage === totalPages ? true : false}
          >
            <ArrowForwardIcon />
          </Button>
        </Flex>
      )}
    </>
  );
};

export default Pagination;
