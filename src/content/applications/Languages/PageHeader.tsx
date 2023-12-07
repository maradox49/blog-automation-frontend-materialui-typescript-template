import React from 'react';
import { Typography, Button, Grid, Dialog, DialogTitle, List, ListItem, ListItemAvatar, Avatar, ListItemText, Box, OutlinedInput, InputAdornment, Stack } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { AddIcCallOutlined, PersonPinCircleOutlined, Search } from '@mui/icons-material';
import PropTypes from 'prop-types';

const emails = ["ABCDE", "DEFGH"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose} open={open}>
      <Box
        sx={{
          "width": "369px",
          "height": "510px",
          "background": "linear-gradient(139deg, #0E8A74 23.19%, #26C58B 104.35%)",
          "position": "relative",
          "overflow": "hidden"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "255.429px",
            height: "427.169px",
            top: "-100px",
            right: "-100px",
            flexShrink: 0,
            borderRadius: "100%",
            background: "rgba(205, 255, 242, 0.10)"
          }}
        ></Box>
        <Box sx={{
          position: "absolute",
          top: "33px",
          left: "30px"
        }}
        ><img src="/static/images/languages/wave.png" width={"35px"} /></Box>
        <Box sx={{
          position: "absolute",
          bottom: "30px",
          right: "27px"
        }}
        ><img src="/static/images/languages/vector.png" width={"35px"}/></Box>
        <Box sx={{
          position: "absolute",
          top: "35px",
          left: "120px"
        }}>
          <Typography fontFamily={"Poppins"} fontWeight={"500"} fontSize={"17px"} color={"white"}>
            Add Language
          </Typography>
        </Box>
        <Box padding={"40px"} paddingTop={"100px"} textAlign={"center"}>
          <Stack direction={"column"} spacing={2}>
            <OutlinedInput fullWidth
              sx={{
                "& fieldset": { border: 'none' },
                background: "white",
                padding: "5px"
              }}
              id="outlined-adornment-amount"
              placeholder='Language'
            />
            <OutlinedInput fullWidth
              sx={{
                "& fieldset": { border: 'none' },
                background: "white",
                padding: "5px"
              }}
              id="outlined-adornment-amount"
              placeholder='URL'
            />
            <OutlinedInput fullWidth
              sx={{
                "& fieldset": { border: 'none' },
                background: "white",
                padding: "5px"
              }}
              id="outlined-adornment-amount"
              placeholder='Username'
            />
            <OutlinedInput fullWidth
              sx={{
                "& fieldset": { border: 'none' },
                background: "white",
                padding: "5px"
              }}
              id="outlined-adornment-amount"
              placeholder='Password'
            />
          </Stack>
          <Box paddingTop={"33px"}>
            <Button sx={{width: "200px"}} variant='contained' color='primary'>Add</Button>
          </Box>
        </Box>
      </Box>
      {/* <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem
            button
            onClick={() => handleListItemClick(email)}
            key={email}
          >
            <ListItemAvatar>
              <PersonPinCircleOutlined />
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick('addAccount')}
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcCallOutlined />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List> */}
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};

function PageHeader() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Languages
        </Typography>
      </Grid>
      <Grid item>
        <Box>
          <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={handleClickOpen}
          >
            Add Language
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
