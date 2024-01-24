import { useState } from "react";
import TaskContainer from "./component/TaskContainer";
import contentJson from './data/content.json'

function App() {
  const [content, setContent] = useState(contentJson);

  const handleChange = ({ task, oldContainer }, newContainer) => {
    setContent(prevContent => {
      const updatedContent = [...prevContent];
      const oldIndex = updatedContent.findIndex(section => section.title === oldContainer);
      const newIndex = updatedContent.findIndex(section => section.title === newContainer);

      if (oldIndex !== -1 && newIndex !== -1) {
        const updatedTask = { ...task }; // Assuming task is an object

        // Remove the task from the old container
        const oldContainerTasks = updatedContent[oldIndex].task.filter(t => t !== task);
        updatedContent[oldIndex] = { ...updatedContent[oldIndex], task: oldContainerTasks };

        // Update the new container with the task
        updatedContent[newIndex] = {
          ...updatedContent[newIndex],
          task: [...updatedContent[newIndex].task, updatedTask],
        };
      }

      return updatedContent;
    });
  };

  return (
    <div className="m-5 select-none mt-10">
      <p className="text-2xl m-2">Kanban Board</p>
      <div className="grid grid-rows-1 grid-cols-5 gap-4">
        {
          content?.map((taskContent, key) => {
            return (
              <TaskContainer
                key={key}
                content={taskContent}
                originalContent={content}
                setContent={(newUpdatedTask, container) => handleChange(newUpdatedTask, container)}
                addContent={(content) => setContent(content)}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default App;