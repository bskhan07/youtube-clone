import React from 'react'

import { Heading, Text } from '@chakra-ui/react'
import { useParams } from "react-router-dom"
import { Box, VStack, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { fetchFromApi } from "./utils/FetchFromApi"
import Loader from './utils/Loader'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
const SearchResult = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [video, setVideo] = useState([])
    useEffect(() => {
        fetchFromApi(`search?part=snippet&q=${id}`).then((data) => { setVideo(data.items), setLoading(false) })
    }, [id])

    return (
        <>
            <Navbar setLoading={setLoading} />
            <Heading mt={{ base: "20px", md: "50px" }} textAlign={"center"} as={"h1"} size={"xl"}> Search result for : <Text display={"inline"} color={"#C53030"} > {id}</Text> </Heading>

            {
                loading ? <Loader /> : <Box p={{ base: "20px", md: "50px" }} display={"flex"} flexWrap={"wrap"} gap={"20px"} justifyContent={"center"}>

                    {
                        video.map((e, i) => {
                            return (
                                <VStack onClick={() => navigate(`/video/${e.id.videoId}`)} key={i} cursor={"pointer"} pb={" 20px "} boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px"} alignItems={"start"} w={"300px"}>
                                    <Box w={"300px"} >
                                        <Image width={"100%"} objectFit={"cover"} src={e.snippet.thumbnails.high.url} />
                                    </Box>
                                    <Heading ml={"20px"} size={"sm"}>{`${e.snippet.description.slice(0, 60)}...`}</Heading>
                                    <Heading ml={"20px"} size={"xs"}>{e.snippet.channelTitle}</Heading>
                                </VStack>
                            )
                        })
                    }
                </Box>
            }
        </>
    )
}

export default SearchResult