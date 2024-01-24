import { useState } from 'react';

const AddTask = ({ addContent, title, setIsInputVisible }) => {
    const [newTask, setNewTask] = useState('');

    const handleCancelClick = () => {
        setIsInputVisible();
        setNewTask('');
    };

    const handleAddTask = (sectionTitle) => {
        // Make sure the new task is not empty
        if (newTask.trim() === '') {
            alert('Please enter a task before adding.');
            return;
        }

        // Update the state to add the new task to the "To Do" section
        addContent((prevContent) => {
            const updatedContent = [...prevContent];
            const todoIndex = updatedContent.findIndex((section) => section.title === sectionTitle);

            if (todoIndex !== -1) {
                const newTaskObject = {
                    id: `DEV-${Date.now()}`,
                    task: newTask.trim(),
                };

                updatedContent[todoIndex].task.push(newTaskObject);
            }

            return updatedContent;
        });

        // Clear the input box after adding the task
        setNewTask('');
        setIsInputVisible();
    };


    return (
        <>
            <textarea
                autoFocus
                placeholder="Enter new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="border p-2 mb-2 w-full rounded-md ring-2 max-h-40 min-h-11 focus-visible:outline-none ring-slate-700"
            />
            <button
                onClick={() => handleAddTask(title)}
                className="inline-block px-6 py-2.5 mx-5 mb-0 ml-auto font-bold text-right text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer hover:scale-102 active:opacity-85 hover:shadow-soft-xs dark:bg-gradient-to-tl dark:from-slate-850 dark:to-gray-850 bg-gradient-to-tl from-gray-900 to-slate-800 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25"
            >
                Add
            </button>
            <button
                onClick={handleCancelClick}
                className="inline-block px-6 py-2.5 mx-5 mb-0 ml-auto font-bold text-right text-gray-900 uppercase align-middle transition-all border-0 rounded-lg cursor-pointer hover:scale-102 active:opacity-85 hover:shadow-soft-xs dark:bg-gradient-to-tl bg-gradient-to-tl from-gray-50 to-slate-100 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25"
            >
                Cancel
            </button>
        </>
    );
};

export default AddTask;
