import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'
import {
    Container, Grid, Button, IconButton, Menu, MenuItem, Typography,
} from '@mui/material'
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined'
import { projectPageStyles } from '../styles/styles'

const TopBar = () => {
    const history = useHistory()
    const { t, i18n } = useTranslation('common')
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language)
    const classes = projectPageStyles()
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorElLanguage, setAnchorElLanguage] = useState(null)
    const openUserMenu = Boolean(anchorEl)
    const openLanguageMenu = Boolean(anchorElLanguage)

    const changeLanguage = (value) => {
        Cookies.set('language', value)
        i18n.changeLanguage(value)
        setCurrentLanguage(value)
        setAnchorElLanguage(null) // Here we close drop-down menu after menu item is clicked
    }

    const handleLanguageMenuClick = (event) => {
        setAnchorElLanguage(event.currentTarget)
    }

    const handleLanguageMenuClose = () => {
        setAnchorElLanguage(null)
    }

    const handleUserMenuClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleUserMenuItemClick = (index, selectedId) => {
        setAnchorEl(null)
    }

    const handleUserMenuClose = () => {
        setAnchorEl(null)
    }

    return (
        <Container maxWidth="xxl" sx={{ borderBottom: '1px solid #d5d5d5' }}>
            <Grid container spacing={0} justifyContent="space-between" sx={{ p: 0, mt: 0.5, mr: 0, mb: 0.5, ml: 0 }}>
                <Grid item xs={12} sm={6} sx={{ p: 0, m: 0 }}>
                    <Button
                        variant="branding"
                        sx={{ mt: 0.3 }}
                        onClick={() => history.push('/')}
                    >
                        Siiliwall
                    </Button>
                </Grid>
                <Grid item container xs={12} sm={6} spacing={0} sx={{ p: 0, m: 0 }} justifyContent="flex-end" alignItems="center" direction="row">
                    <Grid item>
                        <Typography
                            sx={{
                                fontFamily: 'Roboto Slab',
                                fontSize: '1em',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                color: '#3f3f3f',
                            }}
                        >
                            {currentLanguage}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton
                            id="lock-button-language"
                            aria-controls="lock-menu-language"
                            aria-label="Language menu"
                            aria-expanded={openLanguageMenu ? 'true' : undefined}
                            className={classes.headerDropdownMenuIcon}
                            onClick={handleLanguageMenuClick}
                            sx={{ mt: 0, mr: 2.5, mb: 0, ml: 0.6, p: 0 }}
                        >
                            <ArrowDropDownCircleOutlinedIcon sx={{ m: 0, p: 0 }} />
                        </IconButton>
                        <Menu
                            id="lock-menu-language"
                            anchorEl={anchorElLanguage}
                            open={openLanguageMenu}
                            onClose={handleLanguageMenuClose}
                            MenuListProps={{
                                'aria-labelledby': 'lock-button-language',
                                role: 'listbox',
                            }}
                        >
                            <MenuItem onClick={() => changeLanguage('fi')} selected={currentLanguage === 'fi'}>
                                Fi
                            </MenuItem>
                            <MenuItem onClick={() => changeLanguage('en')} selected={currentLanguage === 'en'}>
                                En
                            </MenuItem>
                        </Menu>
                    </Grid>
                    <Grid item>
                        <Typography
                            sx={{
                                fontFamily: 'Roboto Slab',
                                fontSize: '1em',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                color: '#3f3f3f',
                            }}
                        >
                            User
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton
                            id="lock-button-user"
                            aria-controls="lock-menu-user"
                            aria-label="User menu"
                            aria-expanded={openUserMenu ? 'true' : undefined}
                            className={classes.headerDropdownMenuIcon}
                            onClick={handleUserMenuClick}
                            sx={{ mt: 0, mr: 0, mb: 0, ml: 0.6, p: 0 }}
                        >
                            <ArrowDropDownCircleOutlinedIcon sx={{ m: 0, p: 0 }} />
                        </IconButton>
                        <Menu
                            id="lock-menu-user"
                            anchorEl={anchorEl}
                            open={openUserMenu}
                            onClose={handleUserMenuClose}
                            MenuListProps={{
                                'aria-labelledby': 'lock-button',
                                role: 'listbox',
                            }}
                        >
                            <MenuItem>
                                {t('topBarJSX.menuUserSetting')}
                            </MenuItem>
                            <MenuItem>
                                {t('topBarJSX.menuLogOutUser')}
                            </MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default TopBar
