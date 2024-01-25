export const getTasksObjByDate = tasks => {
  return tasks.reduce((acc, task) => {
    if (!acc[task.date]) {
      acc[task.date] = [];
    }

    acc[task.date].push(task);

    return acc;
  }, {});
};
