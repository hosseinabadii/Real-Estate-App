"use client";

import { useContext } from "react";
import Image from "next/image";
import { Box, Icon, Flex } from "@chakra-ui/react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import "react-horizontal-scrolling-menu/dist/styles.css";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginRight="1">
      <Icon
        onClick={() => scrollPrev()}
        fontSize="2xl"
        cursor="pointer"
        d={["none", "none", "none", "block"]}
      >
        <FaArrowAltCircleLeft />
      </Icon>
    </Flex>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginLeft="1">
      <Icon
        onClick={() => scrollNext()}
        fontSize="2xl"
        cursor="pointer"
        d={["none", "none", "none", "block"]}
      >
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
          width="910px"
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
            blurDataURL="data:image/jpeg;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjYuNzk1IiBoZWlnaHQ9IjEyOS4zODciIHZpZXdCb3g9IjAgMCAxMjYuNzk1IDEyOS4zODciPgogIDxnIGlkPSJHcm91cF8xNDYiIGRhdGEtbmFtZT0iR3JvdXAgMTQ2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjQuNDU2KSI+CiAgICA8Y2lyY2xlIGlkPSJFbGxpcHNlXzE2MSIgZGF0YS1uYW1lPSJFbGxpcHNlIDE2MSIgY3g9IjQ3LjM1OCIgY3k9IjQ3LjM1OCIgcj0iNDcuMzU4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5Ni41MzQpIiBmaWxsPSIjM2YzZDU2Ii8+CiAgICA8Y2lyY2xlIGlkPSJFbGxpcHNlXzE2MiIgZGF0YS1uYW1lPSJFbGxpcHNlIDE2MiIgY3g9IjM5LjA5NiIgY3k9IjM5LjA5NiIgcj0iMzkuMDk2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDQuNzk3IDguMjYyKSIgb3BhY2l0eT0iMC4wNSIvPgogICAgPGNpcmNsZSBpZD0iRWxsaXBzZV8xNjMiIGRhdGEtbmFtZT0iRWxsaXBzZSAxNjMiIGN4PSIzMi4wNDIiIGN5PSIzMi4wNDIiIHI9IjMyLjA0MiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTExLjg1IDE1LjMxNikiIG9wYWNpdHk9IjAuMDUiLz4KICAgIDxjaXJjbGUgaWQ9IkVsbGlwc2VfMTY0IiBkYXRhLW5hbWU9IkVsbGlwc2UgMTY0IiBjeD0iMjIuOTc0IiBjeT0iMjIuOTc0IiByPSIyMi45NzQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyMC45MTggMjQuMzg0KSIgb3BhY2l0eT0iMC4wNSIvPgogICAgPHBhdGggaWQ9IlBhdGhfNjMwIiBkYXRhLW5hbWU9IlBhdGggNjMwIiBkPSJNMzg1LjA0NSwzNjEuMjMycy0zLjcyMywxMC40OC0yLjA2OSwxNC4yYTQ2LjIzOCw0Ni4yMzgsMCwwLDAsNC4yNzUsNy4zMDlTMzg2LjI4NiwzNjEuOTIyLDM4NS4wNDUsMzYxLjIzMloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMTcuMzkyIC0zMDkuNjM2KSIgZmlsbD0iI2QwY2RlMSIvPgogICAgPHBhdGggaWQ9IlBhdGhfNjMxIiBkYXRhLW5hbWU9IlBhdGggNjMxIiBkPSJNMzg1LjA0NSwzNjEuMjMycy0zLjcyMywxMC40OC0yLjA2OSwxNC4yYTQ2LjIzOCw0Ni4yMzgsMCwwLDAsNC4yNzUsNy4zMDlTMzg2LjI4NiwzNjEuOTIyLDM4NS4wNDUsMzYxLjIzMloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMTcuMzkyIC0zMDkuNjM2KSIgb3BhY2l0eT0iMC4xIi8+CiAgICA8cGF0aCBpZD0iUGF0aF82MzIiIGRhdGEtbmFtZT0iUGF0aCA2MzIiIGQ9Ik0zODguMzgxLDUxNC4yNjdhMjIuMzUsMjIuMzUsMCwwLDEtLjQxNCwyLjc1OGMtLjEzOC4xMzguMTM4LjQxNCwwLC44MjdzLS4yNzYuOTY1LDAsMS4xLTEuNTE3LDEyLjI3My0xLjUxNywxMi4yNzMtNC40MTMsNS43OTItMi42MiwxNC44OTNsLjU1Miw5LjIzOXM0LjI3NS4yNzYsNC4yNzUtMS4yNDFhMjUuMjY0LDI1LjI2NCwwLDAsMS0uMjc2LTIuNjJjMC0uODI3LjY4OS0uODI3LjI3Ni0xLjI0MXMtLjQxNC0uNjg5LS40MTQtLjY4OS42ODktLjU1Mi41NTItLjY5LDEuMjQxLTkuOTI5LDEuMjQxLTkuOTI5LDEuNTE3LTEuNTE3LDEuNTE3LTIuMzQ0di0uODI3cy42ODktMS43OTMuNjg5LTEuOTMxLDMuNzIzLTguNTUsMy43MjMtOC41NWwxLjUxNyw2LjA2OCwxLjY1NSw4LjY4OHMuODI3LDcuODYsMi40ODIsMTAuODk0YzAsMCwyLjksOS45MjksMi45LDkuNjUzczQuODI2LS45NjUsNC42ODktMi4yMDYtMi45LTE4LjYxNy0yLjktMTguNjE3TDQwNyw1MTMuOTkxWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMxOC4xMDggLTQzOC40KSIgZmlsbD0iIzJmMmU0MSIvPgogICAgPHBhdGggaWQ9IlBhdGhfNjMzIiBkYXRhLW5hbWU9IlBhdGggNjMzIiBkPSJNMzgwLjE1OCw3NjQuMXMtMy43MjMsNy4zMDktMS4yNDEsNy41ODUsMy40NDguMjc2LDQuNTUxLS44MjdhMTguMzU0LDE4LjM1NCwwLDAsMSwyLjgwOC0yLjAyMkEzLjYzMSwzLjYzMSwwLDAsMCwzODgsNzY1LjM4MWMtLjA3My0uNjc1LS4zMjUtMS4yMzEtLjk0NS0xLjI4MmE4LjQ3LDguNDcsMCwwLDEtMy41ODUtMS42NTVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzEzLjYwOCAtNjQ3LjgyNykiIGZpbGw9IiMyZjJlNDEiLz4KICAgIDxwYXRoIGlkPSJQYXRoXzYzNCIgZGF0YS1uYW1lPSJQYXRoIDYzNCIgZD0iTTUxMC45NjgsNzk4LjMzN3MtMy43MjMsNy4zMDktMS4yNDEsNy41ODUsMy40NDguMjc2LDQuNTUxLS44MjdhMTguMzU2LDE4LjM1NiwwLDAsMSwyLjgwOC0yLjAyMiwzLjYzMSwzLjYzMSwwLDAsMCwxLjcyMy0zLjQ1M2MtLjA3My0uNjc1LS4zMjUtMS4yMzEtLjk0NS0xLjI4MmE4LjQ3Miw4LjQ3MiwwLDAsMS0zLjU4NS0xLjY1NVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00MjMuODcxIC02NzYuNjg4KSIgZmlsbD0iIzJmMmU0MSIvPgogICAgPGNpcmNsZSBpZD0iRWxsaXBzZV8xNjUiIGRhdGEtbmFtZT0iRWxsaXBzZSAxNjUiIGN4PSI1Ljc5NyIgY3k9IjUuNzk3IiByPSI1Ljc5NyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzcuMzY1IDI4LjA0MikiIGZpbGw9IiNmZmI4YjgiLz4KICAgIDxwYXRoIGlkPSJQYXRoXzYzNSIgZGF0YS1uYW1lPSJQYXRoIDYzNSIgZD0iTTQ0OS4zNzgsMjYwLjMwOHMtNC4xNDEsNy42MTktNC40NzIsNy42MTksNy40NTMsMi40ODQsNy40NTMsMi40ODQsMi4xNTMtNy4yODcsMi40ODQtNy45NVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zNjkuOTQyIC0yMjQuNTY1KSIgZmlsbD0iI2ZmYjhiOCIvPgogICAgPHBhdGggaWQ9IlBhdGhfNjM2IiBkYXRhLW5hbWU9IlBhdGggNjM2IiBkPSJNNDEzLjk1NiwyODkuNjg4cy04LjI3NC00LjU1MS05LjEtNC40MTMtOS42NTMsNy44Ni05LjUxNSwxMS4wMzJhNjguMTYyLDY4LjE2MiwwLDAsMCwxLjI0MSw4LjQxMnMuNDE0LDE0LjYxNywxLjI0MSwxNC43NTUtLjEzOCwyLjYyLjEzOCwyLjYyLDE5LjMwNiwwLDE5LjQ0NC0uNDE0UzQxMy45NTYsMjg5LjY4OCw0MTMuOTU2LDI4OS42ODhaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzI4LjE2OCAtMjQ1LjYwNykiIGZpbGw9IiNkMGNkZTEiLz4KICAgIDxwYXRoIGlkPSJQYXRoXzYzNyIgZGF0YS1uYW1lPSJQYXRoIDYzNyIgZD0iTTUyOC40NzcsNTIxLjg5MnMyLjYyLDgsLjQxNCw3LjcyMi0zLjE3Mi02Ljg5NS0zLjE3Mi02Ljg5NVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00MzguMDcgLTQ0NS4wNikiIGZpbGw9IiNmZmI4YjgiLz4KICAgIDxwYXRoIGlkPSJQYXRoXzYzOCIgZGF0YS1uYW1lPSJQYXRoIDYzOCIgZD0iTTQ3NS4wNzYsMzEwLjIzN3MtNS4xLDEuMS00LjI3NSw4LDIuMzQ0LDEzLjc5LDIuMzQ0LDEzLjc5bDUuMSwxMS4xNy41NTIsMi4wNjksMy43MjMtLjk2NS0yLjc1OC0xNnMtLjk2NS0xNy4xLTIuMjA2LTE3LjY1MUE1LjM0MSw1LjM0MSwwLDAsMCw0NzUuMDc2LDMxMC4yMzdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzkxLjcwMiAtMjY2LjYzOSkiIGZpbGw9IiNkMGNkZTEiLz4KICAgIDxwYXRoIGlkPSJQYXRoXzYzOSIgZGF0YS1uYW1lPSJQYXRoIDYzOSIgZD0iTTI3Ny41LDQxMS43bDYuMzQzLDExLjMwOEwyNzguNSw0MTEuMDlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTk3LjIyOSAtMzQ2LjUxOCkiIG9wYWNpdHk9IjAuMSIvPgogICAgPHBhdGggaWQ9IlBhdGhfNjQwIiBkYXRhLW5hbWU9IlBhdGggNjQwIiBkPSJNNDY1LjEsMjA5LjAxbC4wMTktLjQ0My44ODEuMjE5YS45ODUuOTg1LDAsMCwwLS4zOTUtLjcyNWwuOTM5LS4wNTJhMTAuMTI4LDEwLjEyOCwwLDAsMC02Ljc3NC00LjE4Niw2LjQ3LDYuNDcsMCwwLDAtNS42ODMsMS42MzgsNi44NSw2Ljg1LDAsMCwwLTEuNCwyLjYwOWMtLjU1NiwxLjc0Ni0uNjY5LDMuODI4LjQ5LDUuMjQ4LDEuMTc4LDEuNDQzLDMuMjM2LDEuNzI1LDUuMDksMS45YTQuMDE5LDQuMDE5LDAsMCwwLDEuOTQxLS4xMzIsNC42NjgsNC42NjgsMCwwLDAtLjI2LTIuMDQ4LDEuMzY1LDEuMzY1LDAsMCwxLS4xMzgtLjY1MmMuMDgyLS41NTIuODE4LS42OTEsMS4zNzEtLjYxNnMxLjIxNy4xODksMS41OC0uMjM1YTEuODc4LDEuODc4LDAsMCwwLC4yNjktMS4xQzQ2My4xMTUsMjA5LjQsNDY1LjA4NywyMDkuMjI5LDQ2NS4xLDIwOS4wMVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zNzYuMTYzIC0xNzYuODc4KSIgZmlsbD0iIzJmMmU0MSIvPgogIDwvZz4KPC9zdmc+Cg=="
            priority={false}
            width={1000}
            height={500}
            sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
          />
        </Box>
      ))}
    </ScrollMenu>
  );
}
