import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mantine/core';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      styles={(theme) => ({
        root: {
          backgroundColor: '#115598',
          border: 5,
          height: 44,
          paddingLeft: 25,
          paddingRight: 25,
          paddingBottom: 4,
          borderRadius: 8,
          fontWeight: 450,
          fontSize: 18,

          '&:hover': {
            backgroundColor: theme.fn.darken('#0f4881', 0.05),
          },
        },
      })}
      size="lg"
      radius="md"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </Button>
  );
};

export default LoginButton;
