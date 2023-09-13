import { Button, Flex, Link } from '@chakra-ui/react'
import React from 'react'
import { DASHBOARD } from '../../lib/routes'
import {Link as RouterLink} from 'react-router-dom'
import { useLogout } from '../../hooks/auth'

export const Navbar = () => {
    const {logout, isLoading} = useLogout()

  return (
    <Flex
    shadow={'sm'}
    pos={'fixed'}
    width={'full'}
    borderTop={'6px solid'}
    borderColor={'teal.400'}
    height={'16'}
    zIndex={'3'}
    // zIndex={'sticky'}
    bg={'white'}
    // align={'center'}
    justify={'center'}
    >
        <Flex width={'full'} maxW={'container.xl'} align={'center'} justify={'space-between'} px={'4'}> {/* change maxW to 100% for full length navbar */}
            <Link color={'teal'} as={RouterLink} to={DASHBOARD} fontWeight={'bold'}>Home</Link>
            <Button colorScheme={'teal'} ml={'auto'} size={'sm'} onClick={logout} isLoading={isLoading}>Log Out</Button>
        </Flex>
    </Flex>
  )
}
