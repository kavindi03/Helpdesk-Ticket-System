// src/components/TicketList.js
import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  TablePagination,
  TextField,
  InputAdornment,
  TableSortLabel,
  Avatar,
  Badge,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Refresh as RefreshIcon,
  Check as CheckIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  ArrowUpward as ArrowUpwardIcon,
  PriorityHigh as PriorityHighIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { format, formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';

const API_URL = process.env.REACT_APP_API_URL;

// Styled Components
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgba(161, 48, 48, 0.9)',
  },
  '&:nth-of-type(even)': {
    backgroundColor: 'rgba(32, 32, 162, 0.9)',
  },
  '&:hover': {
    backgroundColor: 'rgba(137, 207, 240, 0.15)',
    transform: 'translateX(4px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '& td': {
    padding: '16px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
  },
  '& th': {
    fontWeight: 600,
    color: theme.palette.text.secondary,
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #e9ecef',
  },
}));

const StatusBadge = styled('span')(({ status, theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '6px 14px',
  borderRadius: '16px',
  fontWeight: 600,
  fontSize: '0.75rem',
  textTransform: 'capitalize',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  '& svg': {
    marginRight: '6px',
    fontSize: '1rem',
  },
  ...(status === 'OPEN' && {
    backgroundColor: 'rgba(25, 118, 210, 0.1)',
    color: '#1565c0',
    border: '1px solid rgba(25, 118, 210, 0.2)',
  }),
  ...(status === 'IN_PROGRESS' && {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    color: '#f57c00',
    border: '1px solid rgba(255, 152, 0, 0.2)',
  }),
  ...(status === 'RESOLVED' && {
    backgroundColor: 'rgba(46, 125, 50, 0.1)',
    color: '#388e3c',
    border: '1px solid rgba(46, 125, 50, 0.2)',
  }),
  ...(status === 'CLOSED' && {
    backgroundColor: 'rgba(97, 97, 97, 0.08)',
    color: '#616161',
    border: '1px solid rgba(97, 97, 97, 0.15)',
  }),
}));

const PriorityBadge = styled('span')(({ priority, theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '6px 12px',
  borderRadius: '16px',
  fontWeight: 600,
  fontSize: '0.75rem',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  '& svg': {
    marginRight: '6px',
  },
  padding: '4px 12px',
  borderRadius: '12px',
  fontWeight: 600,
  fontSize: '0.75rem',
  textTransform: 'capitalize',
}));

const priorityIcons = {
  1: <PriorityHighIcon sx={{ color: '#f44336', fontSize: '1.1rem' }} />,
  2: <PriorityHighIcon sx={{ color: '#ff9800', fontSize: '1.1rem' }} />,
  3: <PriorityHighIcon sx={{ color: '#2196f3', fontSize: '1.1rem' }} />,
};

const priorityLabels = {
  1: { 
    text: 'High', 
    bgColor: 'rgba(244, 67, 54, 0.1)', 
    color: '#d32f2f',
    icon: <PriorityHighIcon sx={{ color: '#f44336', fontSize: '1rem', mr: 0.5 }} />
  },
  2: { 
    text: 'Medium', 
    bgColor: 'rgba(255, 152, 0, 0.1)', 
    color: '#ed6c02',
    icon: <PriorityHighIcon sx={{ color: '#ff9800', fontSize: '1rem', mr: 0.5 }} />
  },
  3: { 
    text: 'Low', 
    bgColor: 'rgba(33, 150, 243, 0.1)', 
    color: '#1976d2',
    icon: <PriorityHighIcon sx={{ color: '#2196f3', fontSize: '1rem', mr: 0.5 }} />
  },
};

const statusChip = (status) => {
  const statusMap = {
    OPEN: 'Open',
    IN_PROGRESS: 'In Progress',
    RESOLVED: 'Resolved',
    CLOSED: 'Closed'
  };
  
  return (
    <StatusBadge status={status}>
      {statusMap[status] || status}
    </StatusBadge>
  );
};

const TicketList = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  // Format date for display
  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const theme = useTheme();

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/tickets`);
      const data = await response.json();
      setTickets(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tickets. Please try again later.');
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleResolveTicket = async (ticketId) => {
    try {
      const response = await fetch(`${API_URL}/tickets/${ticketId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'RESOLVED' }),
      });

      if (!response.ok) {
        throw new Error('Failed to update ticket status');
      }

      fetchTickets();
    } catch (err) {
      setError('Failed to update ticket status');
      console.error('Error updating ticket status:', err);
    }
  };

  const filteredTickets = tickets
    .filter((ticket) => {
      const matchesSearch = Object.values(ticket).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesStatus =
        statusFilter === 'ALL' || ticket.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (aValue < bValue) {
        return order === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredTickets.length)
      : 0;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box 
        sx={{ 
          mb: 4, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          backgroundColor: '#fff',
          p: 3,
          borderRadius: 2,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          border: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" sx={{ 
            fontWeight: 800, 
            color: 'text.primary',
            mb: 0.5,
            background: 'linear-gradient(90deg, #2C3E50 0%, #4CA1AF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            Helpdesk Tickets
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
            <InfoIcon color="action" fontSize="small" sx={{ mr: 0.5 }} />
            {tickets.length} {tickets.length === 1 ? 'ticket' : 'tickets'} in total
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenCreateDialog(true)}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1,
              boxShadow: '0 4px 14px rgba(0, 149, 255, 0.2)',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(0, 149, 255, 0.25)',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            New Ticket
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchTickets}
            disabled={loading}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 500,
              px: 3,
              py: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
              },
            }}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
        </Box>
      </Box>
      <TableContainer 
        component={Paper} 
        sx={{ 
          p: 0, 
          overflow: 'hidden',
          background: 'linear-gradient(145deg, rgba(240, 248, 255, 0.9), rgba(230, 240, 255, 0.9))',
          '&:hover': {
            background: 'linear-gradient(145deg, rgba(240, 248, 255, 1), rgba(230, 240, 255, 1))'
          }
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ 
              '& th': { 
                fontWeight: 600, 
                color: '#2C3E50',
                background: 'linear-gradient(145deg, rgba(240, 248, 255, 0.8), rgba(230, 240, 255, 0.8))',
                borderBottom: '1px solid rgba(200, 220, 255, 0.5)',
                py: 2,
                px: 3,
                '&:first-of-type': {
                  borderTopLeftRadius: '12px',
                  pl: 4
                },
                '&:last-child': {
                  borderTopRightRadius: '12px',
                  pr: 4
                }
              } 
            }}>
              <TableCell>
                <TableSortLabel
                  active={orderBy === '_id'}
                  direction={orderBy === '_id' ? order : 'asc'}
                  onClick={() => handleRequestSort('_id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'title'}
                  direction={orderBy === 'title' ? order : 'asc'}
                  onClick={() => handleRequestSort('title')}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'status'}
                  direction={orderBy === 'status' ? order : 'asc'}
                  onClick={() => handleRequestSort('status')}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'priority'}
                  direction={orderBy === 'priority' ? order : 'asc'}
                  onClick={() => handleRequestSort('priority')}
                >
                  Priority
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'createdAt'}
                  direction={orderBy === 'createdAt' ? order : 'desc'}
                  onClick={() => handleRequestSort('createdAt')}
                >
                  Created At
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    <CircularProgress />
                    <Typography variant="body2" color="textSecondary">
                      Loading tickets...
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Alert 
                    severity="error" 
                    sx={{ 
                      maxWidth: '500px',
                      mx: 'auto',
                      '& .MuiAlert-message': {
                        width: '100%',
                        textAlign: 'center'
                      }
                    }}
                  >
                    {error}
                    <Box mt={1}>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        onClick={fetchTickets}
                        startIcon={<RefreshIcon />}
                      >
                        Retry
                      </Button>
                    </Box>
                  </Alert>
                </TableCell>
              </TableRow>
            ) : filteredTickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  {searchTerm || statusFilter !== 'ALL' ? (
                    'No matching tickets found'
                  ) : (
                    'No tickets available. Create your first ticket!'
                  )}
                </TableCell>
              </TableRow>
            ) : (
              filteredTickets
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((ticket) => (
                  <TableRow
                    key={ticket._id}
                    sx={{
                      '&:nth-of-type(odd)': {
                        backgroundColor: 'rgba(255, 255, 255, 0.5)'
                      },
                      '&:nth-of-type(even)': {
                        backgroundColor: 'rgba(245, 250, 255, 0.5)'
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(230, 240, 255, 0.7)'
                      },
                      '&:last-child td': {
                        borderBottom: 'none',
                        '&:first-of-type': {
                          borderBottomLeftRadius: '12px'
                        },
                        '&:last-child': {
                          borderBottomRightRadius: '12px'
                        }
                      },
                      '& td': {
                        borderBottom: '1px solid rgba(200, 220, 255, 0.3)',
                        padding: '16px 24px',
                        color: '#2C3E50',
                        '&:first-of-type': {
                          pl: 4
                        },
                        '&:last-child': {
                          pr: 4
                        }
                      }
                    }}
                  >
                    <TableCell sx={{ 
                      fontWeight: 600, 
                      color: '#1a365d',
                      maxWidth: '150px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {ticket._id ? `#${ticket._id.substring(0, 8)}...` : 'N/A'}
                    </TableCell>
                    <TableCell sx={{ 
                      fontWeight: 500, 
                      color: '#2d3748',
                      maxWidth: '200px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {ticket.title || 'Untitled'}
                    </TableCell>
                    <TableCell>
                      {ticket.status ? statusChip(ticket.status) : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1} sx={{ '& .MuiSvgIcon-root': { fontSize: '1.2rem' } }}>
                        {priorityIcons[ticket.priority] || priorityIcons[2]}
                        <Box 
                          component="span" 
                          sx={{ 
                            backgroundColor: priorityLabels[ticket.priority]?.bgColor || priorityLabels[2].bgColor, 
                            color: priorityLabels[ticket.priority]?.color || priorityLabels[2].color, 
                            px: 1.5, 
                            py: 0.5, 
                            borderRadius: 1, 
                            fontSize: '0.75rem', 
                            fontWeight: 500 
                          }}
                        >
                          {priorityLabels[ticket.priority]?.text || 'Medium'}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ 
                        color: '#546E7A',
                        fontSize: '0.875rem',
                        whiteSpace: 'nowrap'
                      }}>
                        {ticket.createdAt ? formatDate(ticket.createdAt) : 'N/A'}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        {ticket.status !== 'RESOLVED' && (
                          <Tooltip title="Mark as Resolved">
                            <IconButton
                              size="small"
                              onClick={() => handleResolveTicket(ticket._id)}
                              sx={{
                                color: '#2e7d32',
                                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                                '&:hover': {
                                  backgroundColor: 'rgba(46, 125, 50, 0.2)'
                                }
                              }}
                            >
                              <CheckIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="View Details">
                          <IconButton 
                            size="small"
                            sx={{
                              color: '#1976d2',
                              backgroundColor: 'rgba(25, 118, 210, 0.1)',
                              '&:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.2)'
                              }
                            }}
                          >
                            <ArrowUpwardIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredTickets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          '& .MuiTablePagination-toolbar': {
            padding: '12px 24px',
            background: 'linear-gradient(145deg, rgba(240, 248, 255, 0.8), rgba(230, 240, 255, 0.8))',
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            borderTop: '1px solid rgba(200, 220, 255, 0.5)'
          },
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
            margin: 0,
            color: '#4a5568',
            fontSize: '0.875rem'
          },
          '& .MuiSelect-select': {
            padding: '4px 24px 4px 8px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(83, 3, 144, 0.8)',
            borderRadius: '6px',
            '&:hover': {
              backgroundColor: 'rgba(176, 7, 202, 1)'
            }
          },
          '& .MuiButtonBase-root': {
            color: '#5F9DC6',
            '&:hover': {
              backgroundColor: 'rgba(95, 157, 198, 0.1)'
            },
            '&.Mui-disabled': {
              color: '#1a89c0ff'
            }
          }
        }}
      />
    </Container>
  );
};

export default TicketList;