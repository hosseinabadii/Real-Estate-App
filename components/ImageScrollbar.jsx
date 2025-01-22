"use client";

import React from "react";
import Image from "next/image";
import { Box } from "@chakra-ui/react";
import { blurDataURL } from "@/utils/blurData";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ImageScrollbar({ data }) {
  var settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          dots: false,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {data.map((item) => (
          <Box
            width={["400px", "700px", "800px", "1000px"]}
            height={["200px", "350px", "400px", "500px"]}
            itemId={item.id}
            overflow="hidden"
            p="1"
            key={item.id}
            position="relative"
            bg="gray.100"
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
      </Slider>
    </div>
  );
}
