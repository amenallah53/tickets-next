import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Base URL
const BASE_URL = 'http://localhost:4000/tickets';

// Async Thunks
/* gets all the 'tickets' data from the http://localhost:4000/tickets json api */
export const fetchTicketsAsync = createAsyncThunk(
  'tickets/fetchTickets',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(BASE_URL,{
        method: 'GET',
        cache: 'no-store' 
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/* adds a 'ticket' to the local api (server-side) */
export const addTicketAsync = createAsyncThunk(
  'tickets/addTicket',
  async (ticket, thunkAPI) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticket),
      });
      const data = await response.json();
      thunkAPI.dispatch(addTicket(data)); // dispatch sync action
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/* delets a 'ticket' from the local api (server-side) */
export const deleteTicketAsync = createAsyncThunk(
  'tickets/deleteTicket',
  async (id, thunkAPI) => {
    try {
      await fetch(`${BASE_URL}/${id}`,{
         method: 'DELETE' 
      });
      thunkAPI.dispatch(deleteTicket(id)); // dispatch sync action
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/* modify a 'ticket' from the local api (server-side) */
export const modifyTicketAsync = createAsyncThunk(
  'tickets/modifyTicket',
  async (ticket, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/${ticket.id}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticket),
      });
      const data = await response.json();
      thunkAPI.dispatch(modifyTicket(data)); // dispatch sync action
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice
export const ticketsSlice = createSlice({
  name: 'tickets',
  /*accessed with state.ticketsList/error/...*/
  initialState: {
    ticketsList: [], //init value
    error: null,
    loading: false,
    hasFetched: false,
  },

  // reducers for sync actions
  reducers: {
    setTickets: (state, action) => {
      state.ticketsList = action.payload;
    },
    addTicket: (state, action) => {
      state.ticketsList.push(action.payload);
    },
    deleteTicket: (state, action) => {
      state.ticketsList = state.ticketsList.filter(
        (t) => t.id !== action.payload
      );
    },
    modifyTicket: (state, action) => {
      const index = state.ticketsList.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) {
        state.ticketsList[index] = action.payload;
      }
    },
  },
  // reducers for async actions
  extraReducers: (builder) => {
    // fetchTicketsAsync cases
    builder.addCase(fetchTicketsAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTicketsAsync.fulfilled, (state, action) => {
      state.ticketsList = action.payload;
      state.loading = false;
      state.hasFetched = true;
    });
    builder.addCase(fetchTicketsAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const {
  setTickets,
  addTicket,
  deleteTicket,
  modifyTicket,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
