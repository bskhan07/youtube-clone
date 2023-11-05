import React, { useState } from 'react'
import Navbar from './Navbar'
import ReactPlayer from 'react-player'
import { Box, Stack, VStack, Image, Heading, HStack, Text } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from './utils/Loader'
import { fetchFromApi } from './utils/FetchFromApi'
import { useEffect } from 'react'
const VidoeDetail = () => {
    const [loading, setLoading] = useState(true)
    const [videoDetail, setVideoDetail] = useState(null)
    const [relatedVideos, setRelatedVideos] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        fetchFromApi(`videos?part=snippet,statistics&id=${id}`).then((data) => { setLoading(false), setVideoDetail(data.items[0]) })
        fetchFromApi(`search?part=sinppet&relatedToVideoId=${id}&type=video`).then((data) => setRelatedVideos(data.items))
    }, [id])
    const navigateHanler = (video) => {
        setLoading(true)
        navigate(`/video/${video.id.videoId}`)
    }
    return (
        <>
            <Navbar setLoading={setLoading} />
            {loading ? <Loader /> : <Stack width={"100%"} alignItems={"center"} justifyContent={'center'} p={"50px"} gap={"30px"} direction={"column"}>

                <VStack pb={"20px"} height={"fit-content"} alignItems={"start"} boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px"} width={"89%"} >
                    <ReactPlayer width={"100%"} height={"77vh"} controls url={`https://www.youtube.com/watch?v=${id}`} />
                    <Heading ml={"20px"} size={"md"} >
                        {`${videoDetail?.snippet?.title.slice(0, 60)}...`}
                    </Heading>
                    <HStack pl={" 20px"} width={"100%"} justifyContent={"space-between"}>
                        <Text color={'grey'}>{videoDetail?.snippet?.channelTitle}</Text>
                        <Text>{parseInt(videoDetail?.statistics?.viewCount).toLocaleString()} views</Text>
                    </HStack>
                </VStack>
                <Heading>
                    Related Videos
                </Heading>
                <Box justifyContent={"center"} gap={"20px"} display={"flex"} flexWrap={"wrap"} >
                    {
                        relatedVideos.map((video, id) => {
                            return (
                                <VStack onClick={() => navigateHanler(video)} key={id} cursor={"pointer"} height={"fit-content"} pb={" 20px "} boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px"} alignItems={"start"} w={"300px"}>
                                    <Box w={"300px"} >
                                        <Image src={video?.snippet?.thumbnails?.high?.url} width={"100%"} objectFit={"cover"} />
                                    </Box>
                                    <Heading ml={"20px"} size={"sm"}>{`${video?.snippet?.title.slice(0, 40)}...`}</Heading>
                                    <Heading ml={"20px"} size={"xs"}>{video?.snippet?.channelTitle}</Heading>
                                </VStack>
                            )
                        })
                    }
                </Box>
            </Stack>}
        </>
    )
}

export default VidoeDetail