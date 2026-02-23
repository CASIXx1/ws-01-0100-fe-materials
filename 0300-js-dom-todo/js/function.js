
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
  tasks.sort((a, b) => a.deadline.getTime() - b.deadline.getTime());

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
  listName.textContent = name;
  listName.addEventListener('click', () => {
    if (listName.querySelector('input')) return;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = task.name;

    listName.textContent = '';
    listName.appendChild(input);
    input.focus();
    input.select();

    const commit = () => {
      const inputText = input.value.trim();
      if (!inputText) {
        input.focus();
        listName.textContent = task.name;
        return;
      }
      task.name = inputText;
      renderTasks(container);
    };

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') commit();
    });

    input.addEventListener('blur', () => {
      commit();
    });
  });

  const listDeadline = div('list__item-col list__item-col--deadline');
  listDeadline.textContent = deadline;
  listDeadline.addEventListener('click', () => {
  if (listDeadline.querySelector('input')) return;

  const input = document.createElement('input');
  input.type = 'date';
  input.value = task.deadline.toString();

  listDeadline.textContent = '';
  listDeadline.appendChild(input);

  input.focus();
  input.showPicker?.();

  const commit = () => {
    task.deadline = AppDate.parse(input.value);

    renderTasks(container);
  };

  input.addEventListener('change', commit);
  input.addEventListener('blur', commit);
});

  const listActions = div('list__item-col list__item-col--actions');

  const trash = icon('icon icon--trash fa-solid fa-trash', () => {
    const confirmed = window.confirm('このタスクを削除しますか？');
    if (!confirmed) return;

    state.tasks = state.tasks.filter((stateTask) => stateTask !== task)
    renderTasks(container);
  });

  listCheckbox.append(checkboxLabel);
  listActions.append(trash);

  listItem.append(
      ...[listCheckbox, listName, listDeadline, listActions]
  );

  li.append(listItem);

  return li;
}

function onSubmitTask(container){
  const form = document.querySelector('.js-form');
  if (!form) return;

  const formData = new FormData(form);
  const name = String(formData.get('name'));
  const deadline = AppDate.parse(String(formData.get('deadline')));

  if (!name) {
    alert('タスク名を入力してください。');
    return;
  }

  if (!deadline) {
    alert('期限日を入力してください。');
    return;
  }

  state.tasks.push({
    name: name,
    deadline: deadline,
    completed: false,
  })

  form.reset();

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
