import React from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Button, Avatar, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const ProfileContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    width: 80,
    height: 80,
    fontSize: '2rem',
}));

const ProfileButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(2, 0),
    width: '200px',
    fontWeight: 700,
}));

export default function Profile() {
    const router = useRouter();

    const handleConnectAccounts = () => {
        console.log('Redirect to connect accounts functionality'); // Implement functionality as needed
    };

    const handleSignOut = () => {
        localStorage.clear(); // Clear local storage
        router.push('/login'); // Redirect to login page
    };

    return (
        <ProfileContainer>
            {/* User Avatar */}
            <UserAvatar>A</UserAvatar> {/* Replace 'A' with dynamic initials */}

            {/* User Name */}
            <Typography variant="h5" sx={{ mt: 2, mb: 4 }}>
                John Doe {/* Replace with dynamic user name */}
            </Typography>

            {/* Connect Other Accounts Button */}
            <ProfileButton
                variant="contained"
                color="primary"
                onClick={handleConnectAccounts}
            >
                Connect Other Accounts
            </ProfileButton>

            {/* Sign Out Button */}
            <ProfileButton
                variant="outlined"
                color="secondary"
                onClick={handleSignOut}
            >
                Sign Out
            </ProfileButton>
        </ProfileContainer>
    );
}
