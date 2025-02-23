import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  name: string;
  error: string | null; // Adiciona o campo de erro
}

const initialState: TasksState = {
  tasks: [],
  name: "teste",
  loading: false,
  error: null, // Inicializa o campo de erro
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch tasks');
      }
      return response.data.tasks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk(
  'tasks/addTodo',
  async ({ title, description, startDate, tags }: { title: string; description: string; startDate: string; tags: string[] }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, {
        title,
        description,
        author_id: 1,
        start_date: startDate,
        end_date: startDate,
        tags
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const removeTodo = createAsyncThunk(
  'tasks/removeTodo',
  async (taskId: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`);
      return { taskId };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateTodo = createAsyncThunk(
  'tasks/updateTodo',
  async (task: Task, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/tasks/${task.id}`, task);
      return response.data; // Retorna a tarefa atualizada
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const changeTaskState = createAsyncThunk(
  'tasks/changeTaskState',
  async (taskData: { taskId: number; status: string }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/tasks/status/${taskData.taskId}`,
        { status: taskData.status }
      );
      return response.data;  // Aqui você deve acessar os dados da resposta
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload.reverse();
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch tasks';
      });

    builder
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = [action.payload.task, ...state.tasks];
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add task';
      });

    builder
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload.taskId);
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to remove task';
      });

      builder
      .addCase(changeTaskState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeTaskState.fulfilled, (state, action) => {
        state.loading = false; // Atualiza o loading
        const updatedTask = action.payload.task; // A tarefa retornada pela API
        
        // Atualiza a tarefa no estado
        state.tasks = state.tasks.map((task) =>
          task.id === updatedTask.id ? { ...task, status: updatedTask.status } : task
        );
      })


  },
});

export default tasksSlice.reducer;
