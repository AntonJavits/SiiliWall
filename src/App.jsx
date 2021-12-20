import React from 'react'
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 400, // Custom, was originally 600
            md: 900,
            lg: 1200,
            xl: 1536,
            xxl: 1980, // Added custom breakpoint for setting container max-size
        },
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'branding' },
                    style: {
                        fontSize: '1.1em',
                        fontWeight: 'bold',
                        border: '0',
                        color: '#3f3f3f',
                        textDecoration: 'none',
                        padding: 0,
                        margin: 0,
                        textTransform: 'uppercase',
                        paddingRight: '0.4rem',
                        paddingLeft: '0.4rem',
                    },
                },
                {
                    props: { variant: 'actionButton' },
                    style: {
                        height: '5.5rem',
                        width: '5.5rem',
                        margin: '0.2rem',
                        lineHeight: '1.3',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        borderRadius: '50%',
                        border: '2px solid #ff8d58',
                        color: '#ff8d58',
                        textAlign: 'center',
                        textDecoration: 'none',
                        paddingBottom: '1rem',
                        paddingLeft: '1rem',
                        paddingRight: '1rem',
                        paddingTop: '1rem',
                    },
                },
                {
                    props: { variant: 'actionButtonSmall' },
                    style: {
                        margin: '0.2rem',
                        lineHeight: '1.3',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        borderRadius: '10px',
                        border: '2px solid #ff8d58',
                        color: '#ff8d58',
                        textAlign: 'center',
                        textDecoration: 'none',
                        padding: '0.3rem, 0.5rem',
                    },
                },
                {
                    props: { variant: 'navigationButton' },
                    style: {
                        textDecoration: 'none',
                        color: '#fff',
                        width: '100%',
                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                        borderRadius: '3',
                        border: 0,
                        height: 48,
                        padding: '0 30px',
                        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                        fontSize: '0.9rem',
                        minWidth: '16rem',
                    },
                },
                {
                    props: { variant: 'titleButton' },
                    style: {
                    //  fontFamily: 'Helvetica', too wide font
                        fontSize: '1rem',
                        fontWeight: '700',
                        whiteSpace: 'nowrap',
                        color: '#949494',
                        textDecoration: 'underline',
                        marginTop: '0.3rem',
                        paddingRight: '0.4rem',
                        paddingLeft: '0.4rem',
                    },
                },
            ],
        },
        MuiTypography: {
            variants: [
                {
                    props: { variant: 'h1' },
                    style: {
                        fontFamily: 'Roboto Slab',
                        fontSize: '3em',
                        fontWeight: '300',
                        whiteSpace: 'nowrap',
                    },
                },
                {
                    props: { variant: 'h2' },
                    style: {
                        fontFamily: 'Roboto Slab',
                        fontSize: '2.6em',
                        fontWeight: '300',
                        whiteSpace: 'nowrap',
                    },
                },
                {
                    props: { variant: 'h3' },
                    style: {
                        fontFamily: 'Roboto Slab',
                        fontSize: '2.3rem',
                        fontWeight: '400',
                        whiteSpace: 'nowrap',
                        marginBottom: '0.5rem',
                    },
                },
                {
                    props: { variant: 'header-separator' },
                    style: {
                        /*  fontFamily: 'Helvetica', */
                        fontSize: '2rem',
                        fontWeight: '100',
                        whiteSpace: 'normal',
                        color: '#949494',
                        margin: '0.5rem',
                    },
                },
                /* {
                    props: { variant: 'menu-icon' },
                    style: {
                        marginTop: '1.5em',
                    },
                }, */
            ],
        },
    },
})

const useStyles = makeStyles((theme) => {
    {
        // some css that access to theme
    }
})

function App() {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <SnackbarProvider>
                    <Router>
                        <Routes />
                    </Router>
                </SnackbarProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    )
}
export default App
