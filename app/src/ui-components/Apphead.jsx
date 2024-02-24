/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Icon, Image, View } from "@aws-amplify/ui-react";
export default function Apphead(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="428px"
      height="44px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Apphead")}
      {...rest}
    >
      <View
        width="428px"
        height="44px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0%"
        bottom="0%"
        left="0%"
        right="0%"
        boxShadow="0px 10px 10px rgba(0.08627451211214066, 0.27843138575553894, 0.5568627715110779, 0.05000000074505806)"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(255,255,255,1)"
        {...getOverrideProps(overrides, "Rectangle 6")}
      ></View>
      <View
        width="24px"
        height="24px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        position="absolute"
        top="22.73%"
        bottom="22.73%"
        left="90.65%"
        right="3.74%"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "bell")}
      >
        <Icon
          width="18px"
          height="15px"
          viewBox={{ minX: 0, minY: 0, width: 18, height: 15 }}
          paths={[
            {
              d: "M9 0L9 -1L9 0ZM3 6L2 6L3 6ZM0 15L-0.5547 14.1679C-0.921357 14.4124 -1.08479 14.868 -0.957092 15.2898C-0.829394 15.7115 -0.440667 16 0 16L0 15ZM18 15L18 16C18.4407 16 18.8294 15.7115 18.9571 15.2898C19.0848 14.868 18.9214 14.4124 18.5547 14.1679L18 15ZM16 6C16 4.14349 15.2625 2.36301 13.9497 1.05025L12.5355 2.46447C13.4732 3.40215 14 4.67392 14 6L16 6ZM13.9497 1.05025C12.637 -0.262502 10.8565 -1 9 -1L9 1C10.3261 1 11.5979 1.52678 12.5355 2.46447L13.9497 1.05025ZM9 -1C7.14348 -1 5.36301 -0.262502 4.05025 1.05025L5.46447 2.46447C6.40215 1.52678 7.67392 1 9 1L9 -1ZM4.05025 1.05025C2.7375 2.36301 2 4.14348 2 6L4 6C4 4.67392 4.52678 3.40215 5.46447 2.46447L4.05025 1.05025ZM2 6C2 9.35266 1.28293 11.4346 0.622104 12.6461C0.290309 13.2544 -0.0327743 13.6535 -0.257203 13.8904C-0.369678 14.0091 -0.458062 14.0878 -0.511278 14.1322C-0.5379 14.1544 -0.555753 14.168 -0.563453 14.1737C-0.567303 14.1766 -0.568614 14.1775 -0.567214 14.1765C-0.566514 14.176 -0.565135 14.175 -0.563057 14.1736C-0.562018 14.1729 -0.560804 14.1721 -0.559412 14.1711C-0.558716 14.1706 -0.557975 14.1701 -0.55719 14.1696C-0.556798 14.1694 -0.556175 14.1689 -0.555979 14.1688C-0.555345 14.1684 -0.5547 14.1679 0 15C0.5547 15.8321 0.555368 15.8316 0.556048 15.8312C0.556289 15.831 0.556981 15.8305 0.557464 15.8302C0.558432 15.8296 0.559445 15.8289 0.560505 15.8282C0.562623 15.8267 0.564925 15.8252 0.567406 15.8235C0.572368 15.8201 0.578049 15.8161 0.584426 15.8116C0.597179 15.8026 0.612713 15.7915 0.630836 15.778C0.667081 15.751 0.713681 15.7148 0.769091 15.6686C0.879937 15.5762 1.02593 15.444 1.1947 15.2659C1.53277 14.909 1.95969 14.3706 2.3779 13.6039C3.21707 12.0654 4 9.64734 4 6L2 6ZM0 16L18 16L18 14L0 14L0 16ZM18 15C18.5547 14.1679 18.5553 14.1684 18.556 14.1688C18.5562 14.1689 18.5568 14.1694 18.5572 14.1696C18.558 14.1701 18.5587 14.1706 18.5594 14.1711C18.5608 14.1721 18.562 14.1729 18.5631 14.1736C18.5651 14.175 18.5665 14.176 18.5672 14.1765C18.5686 14.1775 18.5673 14.1766 18.5635 14.1737C18.5558 14.168 18.5379 14.1544 18.5113 14.1322C18.4581 14.0878 18.3697 14.0091 18.2572 13.8904C18.0328 13.6535 17.7097 13.2544 17.3779 12.6461C16.7171 11.4346 16 9.35266 16 6L14 6C14 9.64734 14.7829 12.0654 15.6221 13.6039C16.0403 14.3706 16.4672 14.909 16.8053 15.2659C16.9741 15.444 17.1201 15.5762 17.2309 15.6686C17.2863 15.7148 17.3329 15.751 17.3692 15.778C17.3873 15.7915 17.4028 15.8026 17.4156 15.8116C17.422 15.8161 17.4276 15.8201 17.4326 15.8235C17.4351 15.8252 17.4374 15.8267 17.4395 15.8282C17.4406 15.8289 17.4416 15.8296 17.4425 15.8302C17.443 15.8305 17.4437 15.831 17.444 15.8312C17.4446 15.8316 17.4453 15.8321 18 15Z",
              stroke: "rgba(2,5,10,1)",
              fillRule: "nonzero",
              strokeLinejoin: "round",
              strokeWidth: 2,
            },
          ]}
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="8.33%"
          bottom="29.17%"
          left="12.5%"
          right="12.5%"
          {...getOverrideProps(overrides, "Vector15")}
        ></Icon>
        <Icon
          width="3.46px"
          height="1px"
          viewBox={{
            minX: 0,
            minY: 0,
            width: 3.4600067138671875,
            height: 0.9964561462402344,
          }}
          paths={[
            {
              d: "M4.325 0.501772C4.60212 0.0240456 4.4395 -0.587879 3.96177 -0.865C3.48404 -1.14212 2.87212 -0.979498 2.595 -0.501772L4.325 0.501772ZM0.865 -0.501772C0.587879 -0.979498 -0.0240456 -1.14212 -0.501772 -0.865C-0.979498 -0.587879 -1.14212 0.0240456 -0.865 0.501772L0.865 -0.501772ZM2.595 -0.501772C2.50709 -0.350232 2.38092 -0.224445 2.22911 -0.137006L3.22734 1.59607C3.68276 1.33375 4.06128 0.956388 4.325 0.501772L2.595 -0.501772ZM2.22911 -0.137006C2.07731 -0.0495675 1.90519 -0.00354385 1.73 -0.00354385L1.73 1.99646C2.25557 1.99646 2.77191 1.85839 3.22734 1.59607L2.22911 -0.137006ZM1.73 -0.00354385C1.55481 -0.00354385 1.38269 -0.0495675 1.23089 -0.137006L0.23266 1.59607C0.688086 1.85839 1.20443 1.99646 1.73 1.99646L1.73 -0.00354385ZM1.23089 -0.137006C1.07908 -0.224445 0.952906 -0.350232 0.865 -0.501772L-0.865 0.501772C-0.601285 0.956388 -0.222765 1.33375 0.23266 1.59607L1.23089 -0.137006Z",
              stroke: "rgba(2,5,10,1)",
              fillRule: "nonzero",
              strokeLinejoin: "round",
              strokeWidth: 2,
            },
          ]}
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="87.5%"
          bottom="8.35%"
          left="42.79%"
          right="42.79%"
          {...getOverrideProps(overrides, "Vector16")}
        ></Icon>
        <Icon
          width="7px"
          height="7px"
          viewBox={{ minX: 0, minY: 0, width: 7, height: 7 }}
          paths={[
            {
              d: "M6 3.5C6 4.88071 4.88071 6 3.5 6L3.5 8C5.98528 8 8 5.98528 8 3.5L6 3.5ZM3.5 6C2.11929 6 1 4.88071 1 3.5L-1 3.5C-1 5.98528 1.01472 8 3.5 8L3.5 6ZM1 3.5C1 2.11929 2.11929 1 3.5 1L3.5 -1C1.01472 -1 -1 1.01472 -1 3.5L1 3.5ZM3.5 1C4.88071 1 6 2.11929 6 3.5L8 3.5C8 1.01472 5.98528 -1 3.5 -1L3.5 1Z",
              stroke: "rgba(255,255,255,1)",
              fillRule: "nonzero",
              strokeWidth: 1,
            },
            {
              d: "M7 3.5C7 5.433 5.433 7 3.5 7C1.567 7 0 5.433 0 3.5C0 1.567 1.567 0 3.5 0C5.433 0 7 1.567 7 3.5Z",
              fill: "rgba(255,175,50,1)",
              fillRule: "nonzero",
            },
          ]}
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="4.17%"
          bottom="66.67%"
          left="62.5%"
          right="8.33%"
          {...getOverrideProps(overrides, "Ellipse 39")}
        ></Icon>
      </View>
      <View
        width="24px"
        height="24px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        position="absolute"
        top="22.73%"
        bottom="22.73%"
        left="9.35%"
        right="85.05%"
        transformOrigin="top left"
        transform="rotate(90deg)"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "menu")}
      >
        <Icon
          width="0px"
          height="10px"
          viewBox={{ minX: 0, minY: 0, width: 10, height: 1 }}
          paths={[
            {
              d: "M-1 10C-1 10.5523 -0.552285 11 0 11C0.552285 11 1 10.5523 1 10L-1 10ZM1 0C1 -0.552285 0.552285 -1 0 -1C-0.552285 -1 -1 -0.552285 -1 0L1 0ZM1 10L1 0L-1 0L-1 10L1 10Z",
              stroke: "rgba(2,5,10,1)",
              fillRule: "nonzero",
              strokeLinejoin: "round",
              strokeWidth: 2,
            },
          ]}
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="41.67%"
          bottom="16.67%"
          left="75%"
          right="25%"
          {...getOverrideProps(overrides, "Vector19")}
        ></Icon>
        <Icon
          width="0px"
          height="16px"
          viewBox={{ minX: 0, minY: 0, width: 16, height: 1 }}
          paths={[
            {
              d: "M-1 16C-1 16.5523 -0.552285 17 0 17C0.552285 17 1 16.5523 1 16L-1 16ZM1 0C1 -0.552285 0.552285 -1 0 -1C-0.552285 -1 -1 -0.552285 -1 0L1 0ZM1 16L1 0L-1 0L-1 16L1 16Z",
              stroke: "rgba(2,5,10,1)",
              fillRule: "nonzero",
              strokeLinejoin: "round",
              strokeWidth: 2,
            },
          ]}
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="16.67%"
          bottom="16.67%"
          left="50%"
          right="50%"
          {...getOverrideProps(overrides, "Vector110")}
        ></Icon>
        <Icon
          width="0px"
          height="6px"
          viewBox={{ minX: 0, minY: 0, width: 6, height: 1 }}
          paths={[
            {
              d: "M-1 6C-1 6.55228 -0.552285 7 0 7C0.552285 7 1 6.55228 1 6L-1 6ZM1 0C1 -0.552285 0.552285 -1 0 -1C-0.552285 -1 -1 -0.552285 -1 0L1 0ZM1 6L1 0L-1 0L-1 6L1 6Z",
              stroke: "rgba(2,5,10,1)",
              fillRule: "nonzero",
              strokeLinejoin: "round",
              strokeWidth: 2,
            },
          ]}
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="58.33%"
          bottom="16.67%"
          left="25%"
          right="75%"
          {...getOverrideProps(overrides, "Vector111")}
        ></Icon>
      </View>
      <Image
        width="38.02%"
        height="68.18%"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="15.91%"
        bottom="15.91%"
        left="31.07%"
        right="30.9%"
        padding="0px 0px 0px 0px"
        objectFit="cover"
        {...getOverrideProps(overrides, "logo 1")}
      ></Image>
    </View>
  );
}
