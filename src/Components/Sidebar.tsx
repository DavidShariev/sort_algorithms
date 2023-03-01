import React, { ReactNode } from "react";
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Button,
    useColorMode,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

interface LinkItemProps {
    name: string;
    icon: IconType;
    href: string;
}
const LinkItems: Array<LinkItemProps> = [
    { name: "Пузырьковая сортировка", icon: FiHome, href: "/" },
    { name: "Сортировка делением", icon: FiTrendingUp, href: "/division" },
    { name: "Пирамидальная сортировка", icon: FiCompass, href: "/heap" },
    { name: "Сортировка вставками", icon: FiStar, href: "/insertion" },
    { name: "Быстрая сортировка", icon: FiSettings, href: "/quick" },
];

export default function Sidebar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box
            width={80}
            pos="fixed"
            minH="100vh"
            bg={useColorModeValue("gray.100", "gray.900")}
        >
            <SidebarContent
                onClose={() => onClose}
                display={{ base: "none", md: "block" }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />

            <Button
                position="absolute"
                bottom="5"
                left="5"
                onClick={toggleColorMode}
            >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const location = useLocation();

    return (
        <Box
            bg={useColorModeValue("white", "gray.900")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 80 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
            >
                <Text
                    fontSize="1.5rem"
                    fontFamily="monospace"
                    fontWeight="bold"
                    lineHeight="1.5rem"
                >
                    АЛГОРИТМЫ СОРТИРОВКИ
                </Text>
                <CloseButton
                    display={{ base: "flex", md: "none" }}
                    onClick={onClose}
                />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem
                    active={link.href === location.pathname}
                    key={link.name}
                    icon={link.icon}
                    href={link.href}
                >
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    href: string;
    active: boolean;
    children: ReactText;
}
const NavItem = ({ icon, href, active, children, ...rest }: NavItemProps) => {
    return (
        <Link to={href} style={{ textDecoration: "none" }}>
            <Flex
                mt={"1rem"}
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: "blue.300",
                    color: "white",
                }}
                bg={active ? "blue.300" : ""}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: "white",
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justifyContent="flex-start"
            {...rest}
        >
            <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                fontSize="2xl"
                ml="8"
                fontFamily="monospace"
                fontWeight="bold"
            >
                Logo
            </Text>
        </Flex>
    );
};
