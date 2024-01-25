import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000'
});

export const getTasksApi = async params => {
  try {
    const { data } = await instance.get('/tasks', {
      params
    });
    return { success: true, tasks: data };
  } catch (error) {
    return { success: false, error };
  }
};

export const addTaskApi = async task => {
  try {
    const { data } = await instance.post('/tasks', task);
    return { success: true, task: data };
  } catch (error) {
    return { success: false, error };
  }
};

export const deleteTaskApi = async id => {
  try {
    const { data } = await instance.delete(`/tasks/${id}`);
    return { success: true, task: data };
  } catch (error) {
    return { success: false, error };
  }
};

export const updateTaskApi = async task => {
  try {
    const { data } = await instance.put(`/tasks/${task.id}`, task);
    return { success: true, task: data };
  } catch (error) {
    return { success: false, error };
  }
};

export const changeTaskStatusApi = async ({ completed, id }) => {
  try {
    const { data } = await instance.patch(`/tasks/${id}`, { completed });
    return { success: true, task: data };
  } catch (error) {
    return { success: false, error };
  }
};
