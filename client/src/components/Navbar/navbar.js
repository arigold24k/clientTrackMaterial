import React, {useState}  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    button2: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginLeft: 'auto',
    },
    appBar: {
        position: 'static',
    },
    links: {
        textDecoration: 'none',
        color: 'black'
    }
};

class navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEL: null,
        };
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default" className={classes.appBar}>
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" aria-owns={open ? 'fade-menu' : undefined} aria-haspopup="true" onClick={this.handleClick}>
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="fade-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={this.handleClose}
                            TransitionComponent={Fade}
                        >
                            <MenuItem onClick={this.handleClose}><a className={classes.links} href="/home_page"> Process Material </a></MenuItem>
                            <MenuItem onClick={this.handleClose}>Reporting</MenuItem>
                            <MenuItem onClick={this.props.handleSignOut}>Logout</MenuItem>
                        </Menu>

                        <Typography variant="h6" color="inherit" noWrap>
                            PaceSetter Steel
                        </Typography>

                        <Button
                            color="primary"
                            onClick={this.props.handleSignOut}
                            className={classes.button2}
                        >
                            Sign Out
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

navbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(navbar);
