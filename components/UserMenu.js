import {
  Avatar,
  Button,
  MenuButton,
  MenuList,
  Menu,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "next-auth/client";

export default function UserMenu({ session }) {
  return (
    <>
      {session ? (
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant="link"
            cursor="pointer"
          >
            <Avatar size={"sm"} image={session.user.image} />
          </MenuButton>
          <MenuList>
            <MenuItem>Link 1</MenuItem>
            <MenuItem>Link 1</MenuItem>
            <MenuItem>Link 1</MenuItem>
          </MenuList>
        </Menu>
      ) : null}{" "}
    </>
  );
}
