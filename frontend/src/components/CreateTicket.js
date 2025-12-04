// src/components/CreateTicket.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  FormHelperText,
  Fade,
  Zoom,
} from '@mui/material';
import { 
  Add as AddIcon, 
  PriorityHigh as PriorityHighIcon,
  Info as InfoIcon 
} from '@mui/icons-material';
import { 
  Alert,
  CircularProgress 
} from '@mui/material';

const API_URL = process.env.REACT_APP_API_URL;

function CreateTicket({ onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(2);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (title.trim() === '') {
      setError('Title is required');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, priority }),
      });

      if (!res.ok) {
        throw new Error('Failed to create ticket');
      }

      const data = await res.json();
      setTitle('');
      setDescription('');
      setPriority(2);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      onCreated();
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityLabel = (value) => {
    switch (value) {
      case 1:
        return 'High';
      case 2:
        return 'Medium';
      case 3:
        return 'Low';
      default:
        return 'Medium';
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 4 },
        borderRadius: 3,
        mb: 4,
        background: 'linear-gradient(145deg, #ffffff, #f8faff)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
        backdropFilter: 'blur(8px)',
        '&:hover': {
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.06)',
          transform: 'translateY(-2px)'
        },
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #4F46E5, #7C3AED, #EC4899)',
          borderRadius: '3px 3px 0 0'
        }
      }}
    >
      <Box sx={{ mb: 4, position: 'relative' }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            fontWeight: 800, 
            mb: 1, 
            background: 'linear-gradient(90deg, #2C3E50 0%, #4F46E5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            letterSpacing: '-0.5px',
            position: 'relative',
            pl: 3,
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '8px',
              height: '32px',
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              borderRadius: '4px',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
            }
          }}
        >
          Create New Ticket
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ 
          display: 'flex', 
          alignItems: 'center',
          pl: 3,
          '& svg': {
            mr: 1,
            color: '#4F46E5'
          }
        }}>
          <InfoIcon fontSize="small" />
          Fill in the details below to create a new support ticket
        </Typography>
      </Box>

      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        noValidate 
        sx={{ 
          mt: 1,
          '& .MuiFormLabel-root.Mui-focused': {
            color: '#4F46E5',
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4F46E5',
            boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)'
          },
          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#A5B4FC'
          }
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Ticket Title"
          name="title"
          autoComplete="off"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          error={!!error && title === ''}
          helperText={error && title === '' ? error : 'A clear and descriptive title helps us understand your issue better'}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              transition: 'all 0.3s ease',
              '&.Mui-focused': {
                backgroundColor: '#fff',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.1)'
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
              },
              '&.Mui-error': {
                backgroundColor: 'rgba(255, 235, 238, 0.3)'
              }
            },
            '& .MuiInputLabel-root': {
              fontWeight: 500,
              color: '#4B5563'
            },
            '& .MuiFormHelperText-root': {
              ml: 0,
              mt: 1,
              fontSize: '0.75rem',
              color: '#6B7280'
            },
            '& .MuiFormHelperText-contained': {
              marginLeft: 0,
              marginTop: 1
            }
          }}
        />

        <TextField
          margin="normal"
          fullWidth
          name="description"
          label="Description"
          id="description"
          multiline
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          placeholder="Please provide detailed information about your issue..."
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              transition: 'all 0.3s ease',
              '&.Mui-focused': {
                backgroundColor: '#fff',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.1)'
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
              },
              '& textarea': {
                '&::placeholder': {
                  color: '#9CA3AF',
                  opacity: 1,
                }
              }
            },
            '& .MuiInputLabel-root': {
              fontWeight: 500,
              color: '#4B5563'
            },
            '& .MuiFormHelperText-root': {
              ml: 0,
              mt: 1,
              fontSize: '0.75rem',
              color: '#6B7280'
            }
          }}
          helperText="Be as detailed as possible to help us assist you better"
        />

        <FormControl
          fullWidth
          variant="outlined"
          margin="normal"
          sx={{ 
            mb: 4,
            '& .MuiInputLabel-root': {
              color: '#4B5563',
              '&.Mui-focused': {
                color: '#4F46E5'
              }
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              transition: 'all 0.3s ease',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#A5B4FC'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#4F46E5',
                boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)'
              }
            },
            '& .MuiSelect-select': {
              display: 'flex',
              alignItems: 'center',
              padding: '16.5px 14px',
              '& .MuiSvgIcon-root': {
                marginRight: '10px',
                fontSize: '1.25rem'
              }
            }
          }}
        >
          <InputLabel id="priority-label">Priority Level</InputLabel>
          <Select
            labelId="priority-label"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            label="Priority Level"
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PriorityHighIcon
                  sx={{
                    mr: 1.5,
                    color: selected === 1 ? '#EF4444' : selected === 2 ? '#F59E0B' : '#3B82F6',
                    fontSize: '1.25rem'
                  }}
                />
                {selected === 1 ? 'High Priority' : selected === 2 ? 'Medium Priority' : 'Low Priority'}
              </Box>
            )}
          >
            <MenuItem value={1}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Box sx={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 1.5
                }}>
                  <PriorityHighIcon sx={{ color: '#EF4444', fontSize: '1rem' }} />
                </Box>
                <Box>
                  <Box sx={{ fontWeight: 500, color: '#111827' }}>High Priority</Box>
                  <Box sx={{ fontSize: '0.75rem', color: '#6B7280' }}>Critical issue affecting business operations</Box>
                </Box>
              </Box>
            </MenuItem>
            <MenuItem value={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Box sx={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 1.5
                }}>
                  <PriorityHighIcon sx={{ color: '#F59E0B', fontSize: '1rem' }} />
                </Box>
                <Box>
                  <Box sx={{ fontWeight: 500, color: '#111827' }}>Medium Priority</Box>
                  <Box sx={{ fontSize: '0.75rem', color: '#6B7280' }}>Important but not critical issue</Box>
                </Box>
              </Box>
            </MenuItem>
            <MenuItem value={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Box sx={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 1.5
                }}>
                  <PriorityHighIcon sx={{ color: '#3B82F6', fontSize: '1rem' }} />
                </Box>
                <Box>
                  <Box sx={{ fontWeight: 500, color: '#111827' }}>Low Priority</Box>
                  <Box sx={{ fontSize: '0.75rem', color: '#6B7280' }}>Minor issue or general question</Box>
                </Box>
              </Box>
            </MenuItem>
          </Select>
          <FormHelperText sx={{
            ml: 0,
            mt: 1,
            fontSize: '0.75rem',
            color: '#6B7280'
          }}>
            Select the urgency level of your issue
          </FormHelperText>
        </FormControl>

        {error && (
          <Fade in={!!error}>
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                border: '1px solid rgba(220, 38, 38, 0.2)',
                '& .MuiAlert-icon': {
                  color: '#DC2626',
                  opacity: 0.9
                },
                '& .MuiAlert-message': {
                  color: '#991B1B'
                }
              }}
            >
              {error}
            </Alert>
          </Fade>
        )}

        <Fade in={showSuccess}>
          <Alert 
            severity="success" 
            sx={{ 
              mb: 3,
              borderRadius: 2,
              border: '1px solid rgba(16, 185, 129, 0.2)',
              '& .MuiAlert-icon': {
                color: '#10B981',
                opacity: 0.9
              },
              '& .MuiAlert-message': {
                color: '#065F46'
              }
            }}
          >
            Ticket created successfully!
          </Alert>
        </Fade>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 6,
          pt: 3,
          borderTop: '1px dashed rgba(0, 0, 0, 0.08)'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            '& svg': {
              color: '#4F46E5',
              mr: 1
            }
          }}>
            <InfoIcon fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              We'll respond to your ticket within 24 hours
            </Typography>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <AddIcon />}
            sx={{
              py: 1.25,
              px: 4,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
              boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(79, 70, 229, 0.4)',
                transform: 'translateY(-2px)',
                background: 'linear-gradient(90deg, #4338CA 0%, #6D28D9 100%)',
              },
              '&:active': {
                transform: 'translateY(0)',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
              },
              '&.Mui-disabled': {
                background: '#E5E7EB',
                color: '#9CA3AF',
                boxShadow: 'none',
              },
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '5px',
                height: '5px',
                background: 'rgba(255, 255, 255, 0.5)',
                opacity: 0,
                borderRadius: '100%',
                transform: 'scale(1, 1) translate(-50%, -50%)',
                transformOrigin: '50% 50%',
              },
              '&:focus:not(:active)::after': {
                animation: 'ripple 1s ease-out',
              },
              '@keyframes ripple': {
                '0%': {
                  transform: 'scale(0, 0)',
                  opacity: 0.5,
                },
                '100%': {
                  transform: 'scale(24, 24)',
                  opacity: 0,
                },
              },
            }}
          >
            {isSubmitting ? 'Creating Ticket...' : 'Create Ticket'}
          </Button>
        </Box>

        {error && !showSuccess && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default CreateTicket;