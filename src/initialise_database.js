import {createTask} from '../model/tasks.js'

const initial_Tasks = [{
    description: 'React',
    length: 60,
    category: 'Study',
    priority: '2: High'
},
{
    description: 'Work a bit',
    length: 60,
    category: 'Work',
    priority: '4: Low'
},
{
    description: 'Walk the dog',
    length: 120,
    category: 'Extra',
    priority: '3: Medium'
}];

const set_up = initial_Tasks.map((task) => {
    createTask(task);
    
});
console.log(set_up);