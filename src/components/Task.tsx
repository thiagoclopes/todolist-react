
import styles from './Task.module.css'
import { Trash } from '@phosphor-icons/react'
import icon2 from '../assets/icon2.svg'
import {FormEvent, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

  interface TaskProps{
    id: string;
    description: string;
    isChecked: boolean;
  }


export function Task(){
    const [CheckedTasksCount, setCheckedTasksCount] = useState(0);
    const [TasksCount, setTasksCount] = useState(0);

    const [tasks, setTasks] = useState<TaskProps[]>([
    ]);

    const [newTaskText, setNewTaskText] = useState('');

    function handleCreateNewTask(event: FormEvent){
        
        event.preventDefault();
        const newTask: TaskProps = {
            id: uuidv4(),
            description: newTaskText,
            isChecked: false
          };
        setTasks([...tasks, newTask]);
        setNewTaskText('');
        setTasksCount(TasksCount+1);
        console.log(newTask.id)
    }
    

    function handleCheckBoxChange(taskId: TaskProps['id']){
        tasks.map(task => {
            if(task.id == taskId){
                const taskToUpdate: TaskProps = {
                    id: taskId,
                    description: task.description,
                    isChecked: !task.isChecked
                  };
                  const updatedTasks: TaskProps[] = tasks.map((task) => {
                    if(task.id === taskId){
                        return taskToUpdate;
                    } else return task;
                  })

                  setTasks(updatedTasks);
                  if(task.isChecked == false)
                    setCheckedTasksCount(CheckedTasksCount+1);
                  else
                  setCheckedTasksCount(CheckedTasksCount-1);
            }
        })
    }

    function handleDeleteTask(taskId: TaskProps['id']){
        tasks.map(task => {
            if(task.id == taskId){
                if(task.isChecked)
                    setCheckedTasksCount(CheckedTasksCount-1);
            }
        })
        const tasksWithoutDeletedOne = tasks.filter((task) => task.id !== taskId);
        setTasks(tasksWithoutDeletedOne);
        setTasksCount(TasksCount-1);
    }

    return(
    <div  className={styles.task}>
        <div className={styles.taskUploadContainer}>
            <form className={styles.taskUploadContainer} onSubmit={handleCreateNewTask}>
                <textarea 
                    placeholder="Adicione uma nova tarefa"
                    onChange={(event) => setNewTaskText(event.target.value)}
                    value={newTaskText}
                    required
                    />
                <button type="submit">
                    Criar
                    <img src = { icon2 }/>
                </button>
            </form>
        </div>
        
        <div className={styles.taskListContainer}>
            <div className={styles.header}>
                <div className={ styles.createdTasks }>
                    Tarefas criadas <span>{TasksCount}</span>
                </div>
                <div className={ styles.finishedTasks }>
                    Concluidas <span>{CheckedTasksCount}</span>
                </div>
            </div>

            <div className={styles.taskList}>
                {tasks.map(task => {
                    return(
                        <div className={styles.taskPanel}>
                            <div className={ styles.checkContentBox}>
                                <label className={styles.checkBox}>
                                    <input 
                                        type="checkbox"
                                        checked={task.isChecked}
                                        onChange={() => handleCheckBoxChange(task.id)} 
                                    />
                                </label>
                                    {task.isChecked?(
                                        <p className={styles.isCheckedDescription} key = {task.id}>{task.description}</p>
                                    ):(
                                        <p key = {task.id}>{task.description}</p>
                                    )}
                                    
                            </div>
                            <button className={styles.trash}
                                onClick={() => handleDeleteTask(task.id)}
                            >
                                <Trash size={18}/>
                            </button>
                            
                        </div>
                    )
                })}
            </div>

        </div>


        
    </div>
    )
}