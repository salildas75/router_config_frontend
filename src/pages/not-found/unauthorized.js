import React from "react"
import { useNavigate } from "react-router-dom"
import { Container, Grid, Button, Typography } from '@mui/material';
import { Path } from "../../routes/route-config"

const Unauthorized = () => {
  const navigate = useNavigate()

  const goBack = () => navigate(Path.login)

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Unauthorized
      </Typography>
      <Typography variant="h6" paragraph>
        You do not have access to the requested page.
      </Typography>
      <Button
        variant="contained"
        color="accent1"
        onClick={goBack}
      >
        Go Back
      </Button>
    </Container>
  )
}

export default Unauthorized
