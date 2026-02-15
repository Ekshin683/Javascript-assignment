let tasks = [];
let Id = 1;

const add = (title) => {
    if(!title){
        console.log("task title can't be empty");
        return;
    }

    const task = {
        id:Id++,
        title,
        status: "pending"
    };

    tasks.push(task);

    console.log(`Task Added: ${title}`);
}

const gettasks = () => {
    if(tasks.length === 0){
        console.log("No tasks found");
        return;
    }
    console.log(tasks);
}

const completetask = (id) =>{
    const task = tasks.find(t => t.id === id);

    if(!task){
        console.log("Task not found");
        return;
    }
    task.status = "completed";
    console.log(`Task ${id} marked completed`);
}

const deletetask = (id) =>{
    const task = tasks.find(t => t.id === id);

    if(!task){
        console.lof("task not found");
        return;
    }

    tasks = tasks.filter(t => t.id !== id);
    console.log(`Task ${id} deleted`);
}


add("Learn JavaScript");
add("Build Mern Project");
add("Practice DSA");

gettasks();

completetask(1);

deletetask(1);
gettasks();


