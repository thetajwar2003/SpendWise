import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { AccountCircle } from '@mui/icons-material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none',
    borderBottom: `1px solid ${ theme.palette.divider }`,
}));

const LogoTypography = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    fontWeight: 700,
    fontSize: '1.5rem',
    cursor: 'pointer',
    '&:hover': {
        color: theme.palette.secondary.light,
    },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    cursor: 'pointer',
    '&:hover': {
        opacity: 0.8,
    },
}));

export default function Header() {
    const router = useRouter();

    const handleLogoClick = () => {
        router.push('/dashboard'); // Redirect to the dashboard
    };

    const handleUserIconClick = () => {
        router.push('/profile'); // Redirect to the profile page
    };

    return (
        <StyledAppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Logo / App Name */}
                <LogoTypography onClick={handleLogoClick} variant="h6" color="inherit">
                    SpendWise
                </LogoTypography>

                {/* User Avatar */}
                <Box>
                    <IconButton onClick={handleUserIconClick}>
                        <AccountCircle
                            sx={{
                                color: '#fff', // Makes the icon white
                                fontSize: 40,  // Adjust size to make it bigger
                            }}
                        />
                    </IconButton>
                </Box>
            </Toolbar>
        </StyledAppBar>
    );
}
