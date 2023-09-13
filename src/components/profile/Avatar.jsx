import React from 'react'
import { Avatar as ChakraAvatar } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { PROTECTED } from '../../lib/routes.jsx'

export default function Avatar({user, size='xl'}) {
    if(!user) return "Loading..."
  return (
    <ChakraAvatar size={size} name={user.username} src={user.avatar} _hover={{cursor: "pointer", opacity: "80%"}} as={Link} to={`${PROTECTED}/profile/${user.id}`}/>
  )
}
