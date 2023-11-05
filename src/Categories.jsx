import { Button, VStack } from '@chakra-ui/react'
import React from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import { categories } from "./utils/constent"
import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"
const Categories = ({ setCategory, setLoading }) => {
    const navigate = useNavigate()
    const handler = (category) => {
        onClose(),
            setLoading(true)
        navigate("/")
        setCategory(category)
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
        <>
            <Button ref={btnRef} w={"30px"} h={"40px"} borderRadius={"50%"} colorScheme='red' onClick={onOpen}
                zIndex={99}
                pos={"fixed"}
                p={"1"}
                left={"4"}
                top={"4"}
            >
                <BiMenuAltLeft />
            </Button>
            <Drawer isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <VStack
                            gap={"20px"}
                            p={12}
                        >

                            {
                                categories.map((category) => {
                                    return (
                                        <Button key={category} onClick={() => handler(category)} textTransform={"capitalize"} colorScheme="red" width={"150px"} borderRadius={"20px"} variant='ghost'>
                                            {category}
                                        </Button>
                                    )
                                })
                            }
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Categories