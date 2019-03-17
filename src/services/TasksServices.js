let tasks = [
  {
    _id: "1",
    title: "Pomodoro Timer",
    date: Date.now() + 60000 * 20,
    done: false,
    show: true
  },
  {
    _id: "2",
    title: "Check Emails",
    date: Date.now() + 20000,
    done: true,
    show: false
  },
  {
    _id: "3",
    title: "Make Coffee",
    date: Date.now() + 60000 * 10,
    done: false,
    show: true
  },
  {
    _id: "4",
    title: "Take dog to vet",
    date: new Date("April 20, 2019 16:28:00"),
    done: false,
    show: true
  },
  {
    _id: "5",
    title: "Take out trash",
    date: Date.now(),
    done: false,
    show: false
  }
];

export const getTasks = () => {
  return tasks.sort(function(a, b) {
    return a.date - b.date;
  });
};

export function archiveTask(id) {
  const found = tasks.find(task => task._id === id);
  found.show = false;
  Object.assign(tasks, found);
  return found;
}

export function deleteTaskfromTasks(id) {
  const remainingTasks = tasks.filter(task => task._id !== id);
  tasks = remainingTasks;
  return remainingTasks;
}

export function newTask(title, date) {
  const newtask = {
    _id: Date.now().toString(),
    title,
    date,
    done: false,
    show: true
  };

  tasks.push(newtask);
  return newtask;
}

export function checkIfDone(selectedTask) {
  let changeTask = tasks.find(task => task._id === selectedTask._id);
  changeTask.done = !selectedTask.done;
  changeTask.show = !selectedTask.done;
  tasks = tasks.filter(task => task._id !== changeTask._id);
  tasks.push(changeTask);

  return tasks.sort(function(a, b) {
    return a.date - b.date;
  });
}
