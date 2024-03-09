import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";

const FilterItem = ({
  filterType,
  inputType,
  placeholder,
  search,
  handleSearch,
  uniqueBrands,
}) => {
  return (
    <>
      {filterType === "input" && (
        <Input
          w={"20%"}
          type={inputType === "number" ? "number" : "text"}
          value={search ? search : ""}
          borderRadius={5}
          placeholder={placeholder}
          onChange={handleSearch}
        />
      )}

      {filterType === "menu" && (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {search ? search : "Выбрать бренд"}
          </MenuButton>
          <MenuList maxH="190px" overflowY="scroll">
            {uniqueBrands.sort().map((brand, index) => (
              <MenuItem key={index} onClick={() => handleSearch(brand)}>
                {brand ? brand : "Без бренда"}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      )}
    </>
  );
};

export default FilterItem;
