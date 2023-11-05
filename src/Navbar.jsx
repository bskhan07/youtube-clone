import React, { useState } from 'react'
import { Box, HStack, Input } from '@chakra-ui/react'
import { MdOndemandVideo } from "react-icons/md"
import { BiSearch } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
const Navbar = ({ setLoading  }) => {
  const navigate = useNavigate()
  const [serach, setSearch] = useState("")
  const searchHandler = () => {
    setLoading(true)
    navigate(`/search/${serach}`)
  }
  return (
    <Box mt={"10px"} display={"flex"} justifyContent={"center"}>
      <HStack p={"10px 30px "} boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"} w={"70%"} justifyContent={"space-between"}><MdOndemandVideo onClick={()=>navigate('/')} cursor={"pointer"} color='#C53030' fontSize={"50px "} />
        <HStack>
          <Input value={serach} onChange={(e) => setSearch(e.target.value)} outline={"none"} w={"200px"} /> <BiSearch onClick={() => searchHandler()} cursor={"pointer"} fontSize={"30px"} />
        </HStack>
      </HStack>
    </Box>
  )
}

export default Navbar

