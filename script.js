/*
=======  Seletores =======
*/

const ul = document.querySelector('ul');

const itemLista = document.querySelector('.item-lista');
const input = document.querySelector('input');
// adiciona uma class nos elementos
const contentItem = document.querySelector('.content-lista');
const myItem = document.querySelector('.item');
const itens = document.getElementById('NumberItems');

// footer
const deleteAll = document.getElementById('deleteAll');

// Seletores dark mode

let moon = document.getElementById('moon');
let sun = document.getElementById('sun');
let imagemLight = document.querySelector('.image-light');
let todoFormDarkMode = document.querySelector('.todo-form');
let itemContainerForm = document.querySelector('.item-container');
let itemsFooter = document.querySelector('.items');

let tarefas = [
  {
    title: 'Estudar JavaScript',
    done: false,
  },
  {
    title: 'Estudar ReactJS',
    done: false,
  },
];

// Uma forma de puxar os itens no frontend;
function itensNumbers() {
  const totalTasks = tarefas.filter((t) => !t.done).length;
  itens.innerText = `${totalTasks} Item(s)`;
}

itensNumbers();

function adicionar(evento) {
  if (evento.key === 'Enter' && input.value != '') {
    evento.preventDefault();
    tarefas.push({ title: input.value, done: false });
    input.value = '';

    render();
  }
}
input.addEventListener('keypress', adicionar);

// atualizo a tela
function render() {
  itemLista.innerHTML = null;

  tarefas.forEach((item, index) => {
    // create div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo_div');
    ul.appendChild(todoDiv);

    // create li
    const li = document.createElement('li');
    li.classList.add('todo_item');
    todoDiv.appendChild(li);

    //button "check"
    let icon_check = document.createElement('button');
    icon_check.innerHTML =
      '<img class="icon_check" src="images/icon-check.svg" alt="icon check">';
    icon_check.classList.add('button_icon_check');
    todoDiv.appendChild(icon_check);

    //button "delete"
    let icon_delete = document.createElement('button');
    icon_delete.innerHTML =
      '<img class="icon_cross" src="images/icon-cross.svg" alt="icon cross">';
    icon_delete.classList.add('button_icon_delete');
    todoDiv.appendChild(icon_delete);

    li.innerText = item.title;

    icon_check.setAttribute('data-id', index);
    icon_delete.setAttribute('data-id', index);
    itensNumbers();

    // check on itens
    function checkOnItens() {
      const tarefa = tarefas[index];
      tarefa.done = !tarefa.done;
      document
        .querySelectorAll('.todo_item', 'button_icon_check')
        .forEach(() => {
          if (tarefa.done) {
            li.classList.add('check-text');
            icon_check.classList.add('complete');
          } else {
            li.classList.remove('check-text');
            icon_check.classList.remove('complete');
          }
        });

      itensNumbers();
    }

    icon_check.addEventListener('click', checkOnItens);

    document.querySelectorAll('.button_icon_check').forEach((item, index) => {
      item.addEventListener('click', () => {
        // const tarefa = tarefas[index];
        // tarefa.done = !tarefa.done;
        // if (tarefa.done) {
        //   item.classList.toggle('checked');
        // }
      });
    });
    itensNumbers();
  });

  // deletar itens
  document.querySelectorAll('.button_icon_delete').forEach((item, index) => {
    item.addEventListener('click', (event) => {
      const position = event.target.getAttribute('data-id', index);

      tarefas.splice(position, 1);

      itensNumbers();
      render();
    });
  });

  // Local Storage

  localStorage.setItem('tarefas', JSON.stringify(tarefas));

  let tarefasString = localStorage.getItem('tarefas');

  let tarefasObj = JSON.parse(tarefasString);

  console.log(tarefasObj[0].title);
}

// function classCheck(tarefas) {
//   if (item.done) {
//     alert('oi');
//     render();
//   }
// }

function cleanAllItems(eventoAll) {
  tarefas = [];
  eventoAll.preventDefault();
  render();
  itensNumbers();
}

deleteAll.addEventListener('click', cleanAllItems);

//*****************Dark Mode********************

// Quando clicar no icon Moon, adicionar dark mode nas classes
function clickOnMoon() {
  document.body.classList.add('dark_Mode');
  imagemLight.classList.add('imagem-dark');
  todoFormDarkMode.classList.add('todo-form-darkmode');
  itemContainerForm.classList.add('item-container-darkmode');
  itemsFooter.classList.add('items-form-darkmode');
  sun.style.display = 'block';
  moon.style.display = 'none';
}

moon.addEventListener('click', clickOnMoon);

// Quando clicar no icone Sun, remover a classe dark-mode
function clickOnSun() {
  document.body.classList.remove('dark_Mode');
  imagemLight.classList.remove('imagem-dark');
  todoFormDarkMode.classList.remove('todo-form-darkmode');
  itemsFooter.classList.remove('items-form-darkmode');
  itemContainerForm.classList.remove('item-container-darkmode');
  sun.style.display = 'none';
  moon.style.display = 'block';
}

sun.addEventListener('click', clickOnSun);

render();
