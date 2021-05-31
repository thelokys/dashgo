import { Box, Button, Checkbox, Spinner, Flex, Icon, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Heading } from "../../components/Heading";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import Link from 'next/link'
import { useQuery } from 'react-query'

export default function UserList() {
  const { isLoading, error, data } = useQuery('users', async () => {
    const response = await fetch('http://localhost:3000/api/users')
    const data = await response.json()

    const users =data.users.map(user => {
      return {
        id: user.id,
        name: user.name,
        createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        })
      }
    })

    return users
  }, {
    staleTime: 1000 * 5, // 5 seconds
  })


  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  useEffect(() => {
   
  },[]) 

  return (
    <Box>
      <Header/>
        <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
          <Sidebar />

          <Box flex="1" borderRadius={8} bg="gray.800" p="8">
            <Flex mb="8" justify="space-between" align="center">
              <Heading>Usuários</Heading>
              <Link href="/users/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
                >
                  Criar novo
                </Button>
              </Link>
            </Flex>
            { isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>Falha ao obter dados do usuário</Text>
              </Flex>
            ) : (
            <>
            <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th px={["4", "4", "6"]} color="gray.300" width="8">
                    <Checkbox colorScheme="pink"/>
                  </Th>
                  <Th>Usuário</Th>
                  { isWideVersion && (<Th>Data de cadastro</Th>)}
                  <Th width="8"></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((user) => {
                    return (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink"/>
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
                          <Text fontWeight="sm">{user.email}</Text>
                        </Box>
                      </Td>
                      { isWideVersion && (<Td>{user.createdAt}</Td>)}
                      { isWideVersion && (
                      <Td>
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          colorScheme="purple"
                          leftIcon={<Icon as={RiPencilLine} fontSize="16"/>}
                        >
                          {isWideVersion ? 'Editar' : ''}
                        </Button>
                      </Td>
                      )}
                  </Tr>
                  )
                })}
              </Tbody>
            </Table>
            <Pagination />
            </>
            )}
          </Box>
        </Flex>
    </Box>   
  )
}