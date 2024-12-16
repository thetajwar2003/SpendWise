import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

export default function TabsLayout({ tabs, currentTab, onTabChange }) {
    return (
        <Box sx={{ padding: '8px', typography: 'body1' }}>
            <Tabs
                orientation="vertical"
                value={currentTab}
                onChange={onTabChange}
                sx={{
                    borderRight: 1,
                    borderColor: 'divider',
                    height: '100vh',
                    '.MuiTab-root': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        width: '100%',
                        margin: 0, // Reset any margin
                        padding: '10px', // Add controlled padding
                        minHeight: '48px', // Prevent excessive height
                    },
                }}
            >
                {tabs.map((tab, index) => (
                    <Tab key={index} label={tab.label} />
                ))}
            </Tabs>
        </Box>
    );
}
