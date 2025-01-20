"use client";

import { useContext } from "react";
import Image from "next/image";
import { Box, Icon, Flex } from "@chakra-ui/react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { blurDataURL } from "@/utils/blurData";
import "react-horizontal-scrolling-menu/dist/styles.css";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginRight="1">
      <Icon onClick={() => scrollPrev()} fontSize="2xl" cursor="pointer">
        <FaArrowAltCircleLeft />
      </Icon>
    </Flex>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginLeft="1">
      <Icon onClick={() => scrollNext()} fontSize="2xl" cursor="pointer">
        <FaArrowAltCircleRight />
      </Icon>
    </Flex>
  );
};

export default function ImageSrollbar({ data }) {
  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      style={{ overflow: "hidden" }}
    >
      {data.map((item) => (
        <Box
          width={["400px", "700px", "1000px", "1200px"]}
          height={["200px", "350px", "500px", "600px"]}
          itemId={item.id}
          overflow="hidden"
          p="1"
          key={item.id}
          position="relative"
        >
          <Image
            src={item.url}
            alt="property"
            placeholder="blur"
            blurDataURL={blurDataURL}
            priority={false}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Box>
      ))}
    </ScrollMenu>
  );
}
