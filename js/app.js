/** 
 * Ma to Do List
 */

 var app = {

    init: function () {

        app.todoApp = document.querySelector('#todo');

        app.createForm();
        app.createCount();
        app.createList();


    },

    createForm: () => {
        // je créer les éléments que

        const form = document.createElement("form");
        app.input = document.createElement("input");

        // je leur colle mes atributs souhaité !!

        app.input.id = 'todo-input';
        app.input.type = 'text';
        app.input.placeholder = 'Ajouter une tache...'

        // la valeur de l'input est présent dans input.value

        // j'écoute la soumission de mon formulaire :
        // (pas de parenthése, sinon j'exécute illico la fonction... et j'obtient le return, soir undefined...)
        form.addEventListener('submit', app.handleForm)


        // je rattache l'input au form : 
        form.appendChild(app.input);

        // je rattache le form au DOM element
        app.todoApp.appendChild(form);

    },

    // ici la logique de mon addEventListener de mon form
    handleForm: (evt) => {
        evt.preventDefault();

        // Je le met dans un if me perttant d'empecher les entrée vide !
        if (app.input.value) {
            app.generateTask({
                label: app.input.value,
                done: false,
            });
        }


        // et je vide l'input :
        app.input.value = '';
    },

    createCount: () => {

        // je créer mon élément
        app.counter = document.createElement('p');
        app.counter.id = 'todo-counter';

        // je place mon élémént dans le DOM !
        app.todoApp.appendChild(app.counter);

    },

    createList: () => {

        // pour une liste je me fait un ul !
        app.list = document.createElement('ul');

        app.list.id = 'todo-list';

        // va falloir que je me fasse une fonction pour générer des listes.

        app.todoApp.appendChild(app.list);



    },

    // deux infos pour faire cette todo : son text et est ce qu'elle est faite ou non (booleén)
    generateTask: (todoObject) => {

        const task = document.createElement('li');
        const text = document.createElement('span');
        const checkbox = document.createElement('input');
        // className va remplacer / écraser les class par celle définis 
        // classList rajoute une class sans éffacer les autres
        task.className = 'todo';
        text.className = 'todo-text';

        text.textContent = todoObject.label;

        checkbox.type = 'checkbox';


        checkbox.addEventListener('change', (evt) => {
            // evt.target représenta ma chekbox
            // change c'est des qu'un changement arrive ! on aurait pu prendre 'click
            // je dois retrouve le li parent qui lui est associé et lui coller la classe 'done' !
            // toggle : si il y a la classe, ça la vire sinon ça la rajoute ! 
            evt.target.closest('li').classList.toggle('todo--done');


            app.updateCounter();

            // et faut mettre a jour mon compteur


        })

        // et je rajoute une class suplémentaire si la task est faite via la propriété ndone !

        if (todoObject.done) {
            task.classList.add('todo--done');
            checkbox.checked = true;
        }

        // je la met dans ma list !
        task.appendChild(checkbox);
        task.appendChild(text);
        app.list.appendChild(task);
        app.updateCounter();

    },

    // une méthode pour compter les taches non faîte dans le dom

    updateCounter: () => {

        const notDoneTasksCount = document.querySelectorAll('.todo:not(.todo--done)').length;

        console.log(notDoneTasksCount)
        // je selectionne la classe todo mais pas ceux avec la classe todo--done
        // et je compte le nombre d'éléments dans la liste avec .length
        app.counter.textContent = notDoneTasksCount > 1 ? `${notDoneTasksCount} tâches en cours` : `${notDoneTasksCount} tâche en cours`
    },

};

//au chargement du DOM, je lance mon app
document.addEventListener('DOMContentLoaded', app.init);