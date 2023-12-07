import { FC, ChangeEvent, useState, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Button,
  Typography,
  useTheme,
  CardHeader,
  styled
} from '@mui/material';

import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { LanguageName, LanguageType } from 'src/models/language';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { getAllLanguageService } from 'src/services/Language';
import { LanguageContext } from 'src/contexts/LanguageContext';
import { Dialog, OutlinedInput } from '@mui/material';

// interface RecentOrdersTableProps {
//   className?: string;
//   languages: LanguageType[];
// }

function SimpleDialog(props) {
  const { onClose, open, editLanguage, language } = props;
  const [lang, setLang] = useState("")
  const [url, setUrl] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    setLang(language?.name);
    setUrl(language?.url);
    setUsername(language?.username);
    setPassword(language?.password);
  }, [language])

  const handleClose = () => {
    onClose("");
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleUpdateLanguage = async () => {
    await editLanguage(
      {
        id: language.id,
        name: lang,
        url: url,
        username: username,
        password: password
      })
    handleClose();
  }

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
        ><img src="/static/images/languages/vector.png" width={"35px"} /></Box>
        <Box sx={{
          position: "absolute",
          top: "35px",
          left: "120px"
        }}>
          <Typography fontFamily={"Poppins"} fontWeight={"500"} fontSize={"17px"} color={"white"}>
            Edit Language
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
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            />
            <OutlinedInput fullWidth
              sx={{
                "& fieldset": { border: 'none' },
                background: "white",
                padding: "5px"
              }}
              id="outlined-adornment-amount"
              placeholder='URL'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <OutlinedInput fullWidth
              sx={{
                "& fieldset": { border: 'none' },
                background: "white",
                padding: "5px"
              }}
              id="outlined-adornment-amount"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <OutlinedInput fullWidth
              sx={{
                "& fieldset": { border: 'none' },
                background: "white",
                padding: "5px"
              }}
              id="outlined-adornment-amount"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Stack>
          <Box paddingTop={"33px"}>
            <Button
              onClick={handleUpdateLanguage}
              sx={{ width: "200px" }}
              variant='contained'
              color='primary'>Update</Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  language: PropTypes.any.isRequired,
  editLanguage: PropTypes.func.isRequired
};

const TableCellItem = styled(TableCell)(
  ({ theme }) => `
        color: ${theme.colors.secondary.main};
`
);

const ImageWrapper = styled(Box)(
  ({ theme }) => `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
      border-radius: 50%;
      overflow: hidden;

  `
)

const getFlagUrl = (language: LanguageName): string => {
  const map = {
    English: 'gb',
    German: 'de',
    Italian: 'it',
    Spanish: 'es',
    Holland: 'nl',
    French: 'fr'
  };

  return `/static/images/flag/${map[language]}.png`;
};

const applyPagination = (
  languages: LanguageType[],
  page: number,
  limit: number
): LanguageType[] => {
  return languages.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable = () => {
  const [selectedLanguageTypes, setSelectedLanguageTypes] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedLanguageTypes.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const { languages, loadLanguage, removeLanguage, editLanguage } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [editingLanguage, setEditingLanguage] = useState({})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }
  };

  const handleSelectAllLanguageTypes = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedLanguageTypes(
      event.target.checked
        ? languages.map((language) => language.id)
        : []
    );
  };

  const handleSelectOneLanguageType = (
    event: ChangeEvent<HTMLInputElement>,
    languageId: string
  ): void => {
    if (!selectedLanguageTypes.includes(languageId)) {
      setSelectedLanguageTypes((prevSelected) => [
        ...prevSelected,
        languageId
      ]);
    } else {
      setSelectedLanguageTypes((prevSelected) =>
        prevSelected.filter((id) => id !== languageId)
      );
    }
  };

  const handleEditLanguage = (lang: LanguageType) => {
    setEditingLanguage(lang);
    handleClickOpen();
  }

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedLanguageTypes = applyPagination(
    languages,
    page,
    limit
  );
  const selectedSomeLanguageTypes =
    selectedLanguageTypes.length > 0 &&
    selectedLanguageTypes.length < languages.length;
  const selectedAllLanguageTypes =
    selectedLanguageTypes.length === languages.length;
  const theme = useTheme();

  useEffect(() => {
    loadLanguage();
  }, []);

  return (
    <Card>
      {/* {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <Box flex={1} p={2}>
          Recent Orders
        </Box>
      )}
      <Divider /> */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllLanguageTypes}
                  indeterminate={selectedSomeLanguageTypes}
                  onChange={handleSelectAllLanguageTypes}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Username</TableCell>
              <TableCell align="right">Password</TableCell>
              <TableCell align="right" sx={{ paddingRight: "45px" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedLanguageTypes.map((language) => {
              const isLanguageTypeSelected = selectedLanguageTypes.includes(
                language.id
              );
              return (
                <TableRow
                  hover
                  key={language.id}
                  selected={isLanguageTypeSelected}
                >
                  <TableCellItem padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isLanguageTypeSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneLanguageType(event, language.id)
                      }
                      value={isLanguageTypeSelected}
                    />
                  </TableCellItem>
                  <TableCellItem>
                    <ImageWrapper>
                      <img src={getFlagUrl(language.name)} />
                    </ImageWrapper>
                  </TableCellItem>
                  <TableCellItem>
                    <Typography
                      variant="body2"
                      gutterBottom
                      noWrap
                    >
                      {language.url}
                    </Typography>
                  </TableCellItem>
                  <TableCellItem>
                    <Typography
                      variant="body2"
                      gutterBottom
                      noWrap
                    >
                      {language.username}
                    </Typography>
                  </TableCellItem>
                  <TableCellItem align="right">
                    <Typography
                      variant="body2"
                      gutterBottom
                      noWrap
                    >
                      {language.password}
                    </Typography>
                  </TableCellItem>
                  <TableCellItem align="right">
                    <FormControl sx={{
                      width: "100px"
                    }}>
                      <InputLabel id="demo-simple-select-label"></InputLabel>
                      <Select
                        size='small'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={10}
                        sx={{
                          textAlign: "left",
                          "& fieldset": { border: 'none' },
                        }}
                      >
                        <MenuItem
                          onClick={() => removeLanguage(language.id)}
                          value={10}>
                          Delete
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleEditLanguage(language)}
                          value={20}>
                          Edit
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </TableCellItem>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <Stack direction="row" justifyContent={"space-between"}>
          <Box>
            {selectedBulkActions && (
              <BulkActions />
            )}
          </Box>
          <TablePagination
            component="div"
            count={languages.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Stack>
      </Box>

      <SimpleDialog
        open={open}
        onClose={handleClose}
        editLanguage={editLanguage}
        language={editingLanguage}
      />
    </Card>
  );
};

// RecentOrdersTable.propTypes = {
//   languages: PropTypes.array.isRequired
// };

// RecentOrdersTable.defaultProps = {
//   languages: []
// };

export default RecentOrdersTable;
