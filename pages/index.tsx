import type { NextPage } from 'next'
import Head from 'next/head'
import styled, { ThemeProvider } from "styled-components";
import { useSelector } from 'react-redux'; 
import { RootState } from '../store/store';
import { lightTheme, darkTheme, GlobalStyles } from "../theme"
import NavBar from "../components/NavBar"
import NewTodo from '../components/NewTodo';
import Todo from '../components/Todo';



const Home: NextPage = () => {
  const themeMode = useSelector<RootState>((state) => state.theme.mode)

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
<GlobalStyles />
<NavBar />
<Todo />
<NewTodo />
    </ThemeProvider>
  
  )
}

export default Home