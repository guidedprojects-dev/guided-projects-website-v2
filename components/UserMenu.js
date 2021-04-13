import { signOut } from "next-auth/client";
import {
  Avatar,
  Button,
  MenuButton,
  MenuList,
  Menu,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";

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
            <MenuItem
              color="red.600"
              icon={<FiLogOut />}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
      ) : null}{" "}
    </>
  );
}
