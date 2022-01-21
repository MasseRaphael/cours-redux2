import type { NextPage } from 'next'
import Head from 'next/head'
import styled, { ThemeProvider } from "styled-components";
import { useSelector } from 'react-redux'; 
import { RootState } from '../store/store';
import { lightTheme, darkTheme, GlobalStyles } from "../theme"
import NavBar from "../components/NavBar"
import NewTodo from '../components/NewTodo';
import Todo from '../components/Todo';
import Notification from '../components/Notification';

const Main = styled.main`
flex: 1;
display: flex;
flex-direction: column;
jsutify-content: center;
align-items: center;
`;

const Container = styled.div`
display: flex;
flex-direction: column;
min-height: 100vh;
`;

const TodoContainer = styled.div`
padding: 50px;
boder: 1px solid black;
display: flex;
flex-direction: column;
min-height: 500px;
`;

const Home: NextPage = () => {
  const themeMode = useSelector<RootState>((state) => state.theme.mode)
  const notification = useSelector((state: RootState) => state.notification)

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
<GlobalStyles />
<Head>
  <title>NWS - Todo App with Redux</title>
</Head>

<Container className='container'>
  <NavBar />
  <Main>
    <TodoContainer>
      <NewTodo />
      <Todo />
    </TodoContainer>
    {notification.isActive && (
      <Notification notification={notification} />
    )}
  </Main>
</Container>
    </ThemeProvider>
  
  )
}

export default Home