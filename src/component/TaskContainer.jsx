import { useDrop } from "react-dnd"
import Task from "./Task"
import { useState } from "react";
import ContainerTitle from "./ContainerTitle";
import AddTask from "./AddTask";

const TaskContainer = ({ content, setContent, originalContent, addContent }) => {
    const [isInputVisible, setIsInputVisible] = useState(false);

    const [noDrop, setNoDrop] = useState(false);
    const [hoverTask, setHoverTask] = useState({});
    const [{ isOver }, drop] = useDrop({
        accept: 'task',
        drop: task => {
            !noDrop && setContent(task, content?.title)
            setHoverTask({})
            // handle drop events from drop event handler
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        }),
        hover: (task) => {
            setHoverTask(task)
            setNoDrop(() => areValuesNearby(task?.oldContainer, content.title) ? true : false)
        }
    });

    const handleAddClick = () => {
        setIsInputVisible(true);
    };



    // Usage
    // Pass the desired section title to the function when calling it
    // For example, if you want to add a task to "To Do" section:
    // handleAddTask('To Do');

    function areValuesNearby(index1, index2) {
        var [num1, num2] = [
            originalContent.findIndex(section => section.title === index1),
            originalContent.findIndex(section => section.title === index2)
        ]
        // Check if the absolute difference between the values is less than or equal to 1
        return (Math.abs(num1 - num2) === 1 || Math.abs(num1 - num2) === -1) ? !1 : !0;
    }

    const isOverFn = () => isOver
        ? noDrop
            ? 'bg-red-200'
            : 'bg-green-200'
        : 'bg-[#e9ecef]';


    return (
        <div ref={drop} className="p-2 min-w-full">
            <div className={`rounded-md w-full p-4 pt-3 ${isOverFn()}`}>
                <ContainerTitle task={content?.task} title={content?.title} handleAddClick={handleAddClick} />
                {
                    content?.task.map((title, key) => {
                        return (
                            <Task
                                key={key}
                                task={title}
                                container={content?.title}
                                hoveredTask={hoverTask?.task?.task}
                                isHovered={(!noDrop)}
                            />
                        )
                    })
                }
                {isOver && !noDrop && <Task task={hoverTask?.task} hovered={true} />}

                {
                    isInputVisible && (
                        <>
                            <AddTask
                                title={content?.title}
                                addContent={(content) => addContent(content)}
                                setIsInputVisible={() => setIsInputVisible(false)}
                            />
                        </>
                    )}
            </div>
        </div>
    )
}

export default TaskContainer;

