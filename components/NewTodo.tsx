import { useDispatch } from "react-redux";
import styled from "styled-components";
import { noticationAction } from "../store/notification-slice";
import { useAddTaskMutation } from "../store/tasks";
import { Task } from "../store/types";

const Form = styled.form`
display: flex;
gap: 20px;
`;

const FormItem = styled.div`
margin-bottom: 0px;
`;

const Input = styled.input``;

const Button = styled.button``;

const Select = styled.select`
height: 100%;
`;

const NewTodo: React.FC = () => {
    const [addTask, { isLoading }] = useAddTaskMutation();

    const dispatch = useDispatch();

    const addTaskHandler = (event: any) => {
        const target = event.target;
        const task: Partial<Task> = {
            task_content: target.task_content.value,
            status: target.status.value,
        };

        addTask(task).then((res) => {
            dispatch(
                noticationAction.showNotification({
                    text: "Task added",
                    type: "Success",
                })
            );
        });
        return(
            <Form onSubmit={addTaskHandler}>
                <FormItem>
                    <Input
                    required
                    minLength={5}
                    id="task_content"
                    name="task_content"
                    type="text"
                    placeholder="Add a task"
                    />
                </FormItem>
                <FormItem>
                    <Select id="select" name="status" title="status">
                        <option>progress</option>
                        <option>done</option>
                    </Select>
                </FormItem>
                <Button
                type="submit"
                role="button"
                name="submit"
                id="submit-btn"
                className="btn"
                >
                    {isLoading ? "Loading": "Add"}
                </Button>
            </Form>
        );
    };
};

export default NewTodo;