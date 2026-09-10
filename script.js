// 获取页面元素
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const countSpan = document.getElementById("count");
const clearBtn = document.getElementById("clear-btn");

// 待办数据保存在这个数组里
// 每一项形如 { text: "买东西", done: false }
let todos = [];

// 添加待办
function addTodo() {
  const text = todoInput.value.trim();
  if (text === "") {
    alert("请输入内容再添加哦~");
    return;
  }
  todos.push({ text: text, done: false });
  todoInput.value = ""; // 清空输入框
  render();
}

// 删除待办
function deleteTodo(index) {
  todos.splice(index, 1);
  render();
}

// 切换完成状态
function toggleTodo(index) {
  todos[index].done = !todos[index].done;
  render();
}

// 清除已完成
function clearDone() {
  todos = todos.filter(function (todo) {
    return !todo.done;
  });
  render();
}

// 把 todos 数组渲染到页面上
function render() {
  todoList.innerHTML = "";

  if (todos.length === 0) {
    const tip = document.createElement("li");
    tip.className = "empty-tip";
    tip.textContent = "还没有待办事项,添加一条试试吧!";
    todoList.appendChild(tip);
  }

  todos.forEach(function (todo, index) {
    const li = document.createElement("li");
    if (todo.done) {
      li.className = "done";
    }

    // 勾选框
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", function () {
      toggleTodo(index);
    });

    // 文字
    const span = document.createElement("span");
    span.textContent = todo.text;

    // 删除按钮
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✕";
    deleteBtn.addEventListener("click", function () {
      deleteTodo(index);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });

  // 更新底部统计
  const doneCount = todos.filter(function (todo) {
    return todo.done;
  }).length;
  countSpan.textContent = "共 " + todos.length + " 项,已完成 " + doneCount + " 项";
}

// 绑定事件
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTodo();
  }
});
clearBtn.addEventListener("click", clearDone);

// 页面打开时先渲染一次
render();
