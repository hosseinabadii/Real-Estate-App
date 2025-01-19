import Link from "next/link";
import { IconButton, Flex, Box, Spacer } from "@chakra-ui/react";

import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from "@/components/ui/menu";

import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";

const Navbar = () => (
  <Flex p="2" borderBottom="2px solid" borderColor="gray.100">
    <Box fontSize="3xl" color="blue.400" fontWeight="bold">
      <Link href="/" paddingleft="2">
        Real Estate App
      </Link>
    </Box>
    <Spacer />
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton variant="ghost">
          <FcMenu />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        <MenuItem asChild value="Home">
          <Link href="/">
            <FcHome />
            Home
          </Link>
        </MenuItem>
        <MenuItem asChild value="Search">
          <a href="/search">
            <BsSearch />
            Search
          </a>
        </MenuItem>
        <MenuItem asChild value="Buy Property">
          <a href="/search?purpose=for-sale">
            <FcAbout />
            Buy Property
          </a>
        </MenuItem>
        <MenuItem asChild value="Rent Property">
          <a href="/search?purpose=for-rent">
            <FiKey />
            Rent Property
          </a>
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  </Flex>
);

export default Navbar;
