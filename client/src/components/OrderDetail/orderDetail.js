import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';

class orderDetail extends React.Component {

    render () {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order Details
            </Typography>
            <Grid container spacing={24}>
                {/*<Grid item xs={12} sm={6}>*/}
                <Grid item xs={12}>
                    <TextField
                        required
                        id="partnum"
                        name="partnum"
                        label="partnum"
                        fullWidth
                        autoComplete="pnum"
                        onChange={this.props.updateval}
                        value={this.props.inputpart}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="quantity"
                        name="quantity"
                        label="Quantity"
                        fullWidth
                        autoComplete="qty"
                        onChange={this.props.updateval}
                        value={this.props.inputqty}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="tagnum"
                        name="tagnum"
                        label="Tag Number"
                        fullWidth
                        autoComplete="tgnum"
                        onChange={this.props.updateval}
                        value={this.props.inputtagnum}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );}
}
export default orderDetail;



{/*<Grid item xs={12}>*/}
{/*<FormControlLabel*/}
{/*control={<Checkbox color="secondary" name="saveAddress" value="yes" />}*/}
{/*label="Use this address for payment details"*/}
{/*/>*/}
{/*</Grid>*/}