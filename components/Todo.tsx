import { useState } from "react";
import styled from "styled-components";
import { useUpdateTaskStatusMutation, useDeleteTaskMutation, useGetTasksQuery } from "../store/tasks";
import { Task } from "../store/types";
import { useDispatch } from "react-redux";
import { noticationAction } from "../store/notification-slice";

const Text = styled.h5<{isDone ? : boolean}>`
margin-bottom: 0px;
flex: 1;
text-decoration: ${({ isDone }) => (isDone ? "line-through" : "none")};
color: ${({ isDone }) => isDone ? "var(--secondar-color)" : "var(--font-color)"} !important;
`;

const Button = styled.button``;

const TaskMain = styled.div`
padding-top: 30px;
`;

const TaskDiv = styled.div`
display: flex;
justify-content: spac-between;
align-items: center;
`;

const Div = styled.div`
display: flex;
gap: 30px;
align-items: center;
`;

const CheckBoxGroup = styled.div`
display: flex;
margin-bottom: 0px;
`;

const Todo: React.FC= () => {
    const { data, isLoading, isFetching } = useGetTasksQuery("");
    const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
    const [updateTaskStatus, { isLoading: isUpdating }] = useUpdateTaskStatusMutation();
    const dispatch = useDispatch();

    const [updatingTaskId, setUpdatingTaskId] = useState("");
    const [deletingTaskId, setDeletingTaskId] = useState("");

    const updateTaskHandler = (id: Task["id"], status: Task["status"]) => {
        setUpdatingTaskId(id);
        updateTaskStatus({id, status }).then((res) => {
            dispatch(
                noticationAction.showNotification({
                    text: "Task updated",
                    type: "success",
                })
            );
        });
    };

    const deleTaskHandler = (id: Task["id"]) => {
        setDeletingTaskId(id);
        deleteTask(id).then((res) => {
            dispatch(
                noticationAction.showNotification({
                    text: "Task deleted",
                    type: "success",
                })
            );
        });
    };

    return (
        <>
            <TaskMain>
                {data &&
                data.map((task) => (
                   <TaskDiv key={task.id}>
                       <CheckBoxGroup>
                           <input
                           disabled={
                                (isUpdating || isFetching) && updatingTaskId === task.id
                           }
                           defaultChecked={task.status === "done" ? true : false}
                           value="checked"
                           type="checkbox"
                           id="check"
                           onChange={(e) =>
                            updateTaskHandler(
                                task.id,
                                e.target.checked ? "done" : "progress"
                            )
                           }
                           />
                       </CheckBoxGroup>
                   </TaskDiv> 
                ))}
            </TaskMain>
        </>
    );
};

export default Todo;