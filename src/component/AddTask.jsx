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
                className="border p-2 mb-2 w-full rounded-md ring-2 max-h-40 min-h-11 focus-visible:outline-none ring-blue-400"
            />
            <button
                onClick={() => handleAddTask(title)}
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            >
                Add
            </button>
            <button
                onClick={handleCancelClick}
                className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer ml-2"
            >
                Cancel
            </button>
        </>
    );
};

export default AddTask;
