import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../store/store";
import { uiActions } from "../store/theme-slice";
import { ThemeMode } from "../store/types";

const Header = styled.div``;

const LogoDiv = styled.div``;
const Logo = styled.div`
span {
    cursor: pointer;
    color: red;
    text-decoration: none;
    :hover {
        background-color: red;
        color: white;
    }
}`;

const Menu = styled.nav``;

const NavBar = () => {
    const dispatch = useDispatch();
    const themeMode = useSelector((state: RootState) => state.theme.mode);
    const [isDarkMode, setIsDarkMode] = useState<boolean>();
    useEffect(() => {
        setIsDarkMode(themeMode === "dark")
    }, [themeMode]);
    const themeChangeHandler = (mode: ThemeMode) => {
        dispatch(uiActions.toggle(mode));
        setIsDarkMode(mode === "dark" ? true : false);
        localStorage.setItem("theme", mode);
    };
    return(
        <>
        <Header>
            <LogoDiv>
                <Logo>
                    <span>ToDO Next Js</span>
                </Logo>
            </LogoDiv>
            <Menu>
                <ul>
                    <li>
                        <a
                        onClick={() => themeChangeHandler("light")}
                        href="#"></a>
                    </li>
                    <li>
                        <a
                        onClick={() => themeChangeHandler("dark")}
                        href="#"></a>
                    </li>
                </ul>
            </Menu>
        </Header>
        </>
    )
}