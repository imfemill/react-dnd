const ContainerTitle = ({ title, task, handleAddClick }) => {
    return (
        <div className="flex justify-between items-center mb-5">
            <span className={`text-xs uppercase`}>{`${title} ${task.length || ""}`}</span>
            <span className="cursor-pointer" onClick={() => handleAddClick()}>+</span>
        </div>
    )
}

export default ContainerTitle;