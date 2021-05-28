import React from "react";
import { Avatar, Flex, Box, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData = true }:ProfileProps) {
  return (
    <Flex align="center">
      {
        showProfileData && (
        <Box mr="4">
          <Text>José Ricardo</Text>
          <Text
            color="gray.300"
            fontSize="small"
          >
            ricardo.guidetti@hotmail.com
          </Text>
        </Box>
        )
      }
      <Avatar size="md" name="José Ricardo" src="https://github.com/thelokys.png"/>
    </Flex>
  )
}