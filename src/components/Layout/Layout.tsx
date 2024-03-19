import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";

export const Layout = () => (
    <AppShell
        header={{height: 60}}
        padding="md"
    >
        <AppShell.Header>
            <div>Logo</div>
        </AppShell.Header>

        <AppShell.Main>
            <Outlet/>
        </AppShell.Main>
    </AppShell>
)