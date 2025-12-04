// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container, Box, Paper } from '@mui/material';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import theme from './theme';
import Layout from './components/Layout';
import CreateTicket from './components/CreateTicket';
import TicketList from './components/TicketList';

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <EmotionThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Box
            component="main"
            className="dashboard-content"
            sx={{
              flexGrow: 1,
              minHeight: '100vh',
              pt: { xs: 2, sm: 3 },
              pb: 4,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '300px',
                background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.03) 0%, rgba(255, 101, 132, 0.03) 100%)',
                zIndex: 0,
                borderBottomLeftRadius: '40%',
                borderBottomRightRadius: '40%',
              },
            }}
          >
            <Container maxWidth="xl" className="secondary-container" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <h1 style={{ margin: 0 }}>Helpdesk Dashboard</h1>
                <Box sx={{ 
                  height: '4px',
                  width: '80px',
                  background: 'linear-gradient(45deg, #6C63FF 30%, #FF6584 90%)',
                  margin: '12px auto 0',
                  borderRadius: '2px'
                }} />
              </Box>
              
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <>
                      <Paper 
                        className="form-container secondary-container"
                        elevation={0}
                        sx={{ p: 4, mb: 4, borderRadius: 3 }}
                      >
                        <CreateTicket onCreated={() => setRefresh(prev => prev + 1)} />
                      </Paper>
                      <Paper 
                        className="tickets-container secondary-container"
                        elevation={0}
                        sx={{ p: 4, borderRadius: 3 }}
                      >
                        <TicketList key={refresh} />
                      </Paper>
                    </>
                  } 
                />
                <Route 
                  path="/tickets" 
                  element={
                    <Paper 
                      className="tickets-container secondary-container"
                      elevation={0}
                      sx={{ p: 4, borderRadius: 3 }}
                    >
                      <TicketList key={refresh} />
                    </Paper>
                  } 
                />
                <Route 
                  path="/tickets/create" 
                  element={
                    <Paper 
                      className="form-container secondary-container"
                      elevation={0}
                      sx={{ p: 4, borderRadius: 3 }}
                    >
                      <CreateTicket 
                        onCreated={() => {
                          setRefresh(prev => prev + 1);
                        }} 
                      />
                    </Paper>
                  } 
                />
              </Routes>
            </Container>
          </Box>
        </Layout>
      </ThemeProvider>
    </EmotionThemeProvider>
  );
}

export default App;