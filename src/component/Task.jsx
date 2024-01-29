import { useDrag } from "react-dnd"

const Task = ({ task, container, hovered, hoveredTask, isHovered }) => {
    const [{ isDragging }, drag] = useDrag({
        type: "task",
        item: { task, oldContainer: container },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    var isDraggingFn = () =>
        !hovered
            ? isDragging
                ? 'bg-green-100 opacity-50'
                : 'bg-neutral-50'
            : 'bg-blue-100 opacity-50';

    var isVisibilityFn = () => (hoveredTask === task?.task && isHovered) ? 'hidden' : '';
    return (
        <div
            ref={drag}
            className={`p-4 my-2 text-sm rounded-md cursor-grab ${isDraggingFn()} ${isVisibilityFn()}`}
        >
            {task?.task}
        </div>
    )
}

export default Task;