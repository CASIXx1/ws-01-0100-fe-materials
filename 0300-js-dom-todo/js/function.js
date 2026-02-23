
const state = {
  showCompleted: false,
  tasks: [
    {
      name: 'Task 1',
      deadline: new AppDate().getDateInXMonth(1),
      completed: false,
    },
    {
      name: 'Task 2',
      deadline: new AppDate().getDateInXMonth(2),
      completed: false,
    },
    {
      name: 'Task 3',
      deadline: new AppDate().getDateInXMonth(3),
      completed: false,
    },
  ]
}

// ↓↓↓ ここを実装

function renderTasks(container) {
  container.innerHTML = '';

  const tasks = state.tasks.filter(task => state.showCompleted || !task.completed)

  for (const task of tasks) {
    const li = renderTask(task, container);
    container.appendChild(li);
  }
}

function renderTask(task, container) {
  const { name, deadline } = task;

  const li = document.createElement('li')
  const listItem = div('list__item');
  const listCheckbox = div('list__item-col list__item-col--checkbox');

  const checkboxLabel = checkbox(task.completed, (checked) => {
    task.completed = checked;
    renderTasks(container);
  });

  const listName = div('list__item-col list__item-col--name');
  const listDeadline = div('list__item-col list__item-col--deadline');
  const listActions = div('list__item-col list__item-col--actions');

  const trash = icon('icon icon--trash fa-solid fa-trash', () => {
    const confirmed = window.confirm('このタスクを削除しますか？');
    if (!confirmed) return;

    state.tasks = state.tasks.filter((stateTask) => stateTask !== task)
    renderTasks(container);
  });

  listName.textContent = name;
  listDeadline.textContent = deadline;

  li.append(listItem);
  listItem.append(listCheckbox);
  listCheckbox.append(checkboxLabel);

  listItem.append(listName);
  listItem.append(listDeadline);
  listItem.append(listActions);
  listActions.append(trash);

  return li;
}

function onSubmitTask(container){
  const form = document.querySelector('.js-form');
  if (!form) return;

  const formData = new FormData(form);
  const name = String(formData.get('name'));
  const deadline = AppDate.parse(String(formData.get('deadline')));

  if (!name || !deadline) return;

  state.tasks.push({
    name: name,
    deadline: deadline,
    completed: false,
  })

  state.tasks.sort((a, b) => a.deadline.getTime() - b.deadline.getTime());

  renderTasks(container);
}

// ↑↑↑

function main() {
  const todoContainer = document.querySelector('.js-list-container')

  document.querySelector('.js-form').addEventListener('submit', (e) => {
    e.preventDefault()
    onSubmitTask(todoContainer)
  })

  document.querySelector('.js-show-completed').addEventListener('change', (e) => {
    state.showCompleted = e.target.checked
    renderTasks(todoContainer)
  })
  renderTasks(todoContainer)
}

main()
