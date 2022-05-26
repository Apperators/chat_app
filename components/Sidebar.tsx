import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import fetchJson from "../lib/fetchJson";
import useUser from "../lib/useUser";


const Sidebar: React.FC = () => {
  const { mutateUser } = useUser();
  const router = useRouter();
  
  return (
    <SidebarContainer>
      <SidebarHeader>
        <div>Channel</div>
        {/* <Button leftIcon={AddIcon} /> */}
      </SidebarHeader>
      <Button
        colorScheme="teal"
        variant="ghost"
        onClick={async (e) => {
          e.preventDefault();
          mutateUser(await fetchJson("/api/logout", { method: "POST" }), false);
          router.push("/login");
        }}
      >
        Logout
      </Button>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div({
  width: "15%",
  height: "100%",
  background: "grey",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const SidebarHeader = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
})
