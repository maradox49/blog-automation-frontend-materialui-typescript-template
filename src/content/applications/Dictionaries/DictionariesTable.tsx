import { FC, ChangeEvent, useState, useContext, useEffect } from 'react';
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
  Stack,
  Checkbox,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  OutlinedInput,
  styled,
  Dialog
} from '@mui/material';

import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { DictionaryType } from 'src/models/dictionary';
import { LanguageName } from 'src/models/language';
import { DictionaryContext } from 'src/contexts/DictionaryContext';

interface RecentOrdersTableProps {
  className?: string;
  dictionaries: DictionaryType[];
}

const TableCellItem = styled(TableCell)(
  ({ theme }) => `
        color: ${theme.colors.secondary.main};
`
);

function SimpleDialog(props) {
  const { onClose, open, dictionary } = props;
  const [language, setLanguage] = useState("")
  const [badEntry, setBadEntry] = useState("")
  const [rightEntry, setRightEntry] = useState("")
  const { editDictionary } = useContext(DictionaryContext);

  useEffect(() => {
    setLanguage(dictionary?.language)
    setBadEntry(dictionary?.badEntry)
    setRightEntry(dictionary?.rightEntry)
  }, [dictionary])

  const handleClose = () => {
    onClose("");
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleUpdateDictionary = () => {
    onClose("")
    editDictionary({
      id: dictionary.id,
      language: language,
      badEntry: badEntry,
      rightEntry: rightEntry
    })
  }

  return (
    <Dialog
      onClose={handleClose} open={open}>
      <Box
        sx={{
          "width": "369px",
          "height": "425px",
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
            Add Dictionary
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
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
            <OutlinedInput fullWidth
              sx={{
                "& fieldset": { border: 'none' },
                background: "white",
                padding: "5px"
              }}
              id="outlined-adornment-amount"
              placeholder='Bad Entry'
              value={badEntry}
              onChange={(e) => setBadEntry(e.target.value)}
            />
            <OutlinedInput fullWidth
              sx={{
                "& fieldset": { border: 'none' },
                background: "white",
                padding: "5px"
              }}
              id="outlined-adornment-amount"
              placeholder='Right Entry'
              value={rightEntry}
              onChange={(e) => setRightEntry(e.target.value)}
            />
          </Stack>
          <Box paddingTop={"33px"}>
            <Button
              onClick={handleUpdateDictionary}
              sx={{ width: "200px" }}
              variant='contained'
              color='primary'>
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  dictionary: PropTypes.any.isRequired
};

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
  dictionaries: DictionaryType[],
  page: number,
  limit: number
): DictionaryType[] => {
  return dictionaries.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable = () => {
  const [selectedDictionaryTypes, setSelectedDictionaryTypes] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedDictionaryTypes.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [editDictionary, setEditDictionary] = useState({});

  const { dictionaries, loadDictionary, removeDictionary } = useContext(DictionaryContext);

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleEditDictionary = async (dictionary: DictionaryType) => {
    setEditDictionary(dictionary);
    handleClickOpen();
  }

  const handleSelectAllDictionaryTypes = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedDictionaryTypes(
      event.target.checked
        ? dictionaries.map((dictionary) => dictionary.id)
        : []
    );
  };

  const handleSelectOneDictionaryType = (
    event: ChangeEvent<HTMLInputElement>,
    dictionaryId: string
  ): void => {
    if (!selectedDictionaryTypes.includes(dictionaryId)) {
      setSelectedDictionaryTypes((prevSelected) => [
        ...prevSelected,
        dictionaryId
      ]);
    } else {
      setSelectedDictionaryTypes((prevSelected) =>
        prevSelected.filter((id) => id !== dictionaryId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedDictionaryTypes = applyPagination(
    dictionaries,
    page,
    limit
  );
  const selectedSomeDictionaryTypes =
    selectedDictionaryTypes.length > 0 &&
    selectedDictionaryTypes.length < dictionaries.length;
  const selectedAllDictionaryTypes =
    selectedDictionaryTypes.length === dictionaries.length;
  const theme = useTheme();

  return (
    <Card>
      {/* {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          title="Recent Orders"
        />
      )}
      <Divider /> */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllDictionaryTypes}
                  indeterminate={selectedSomeDictionaryTypes}
                  onChange={handleSelectAllDictionaryTypes}
                />
              </TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Bad Entry</TableCell>
              <TableCell>Right Entry</TableCell>
              <TableCell align="right" sx={{ paddingRight: "45px" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDictionaryTypes.map((dictionary) => {
              const isDictionaryTypeSelected = selectedDictionaryTypes.includes(
                dictionary.id
              );
              return (
                <TableRow
                  hover
                  key={dictionary.id}
                  selected={isDictionaryTypeSelected}
                >
                  <TableCellItem padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isDictionaryTypeSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneDictionaryType(event, dictionary.id)
                      }
                      value={isDictionaryTypeSelected}
                    />
                  </TableCellItem>
                  <TableCellItem>
                    <ImageWrapper>
                      <img src={getFlagUrl(dictionary.language)} />
                    </ImageWrapper>
                  </TableCellItem>
                  <TableCellItem>
                    <Typography
                      variant="body2"
                      gutterBottom
                      noWrap
                    >
                      {dictionary.badEntry}
                    </Typography>
                  </TableCellItem>
                  <TableCellItem>
                    <Typography
                      variant="body2"
                      gutterBottom
                      noWrap
                    >
                      {dictionary.rightEntry}
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
                          onClick={() => removeDictionary(dictionary.id)}
                          value={10}>
                          Delete
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleEditDictionary(dictionary)}
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
              <BulkActions
                selected={selectedDictionaryTypes}
                setSelected={setSelectedDictionaryTypes}
              />
            )}
          </Box>
          <TablePagination
            component="div"
            count={dictionaries.length}
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
        dictionary={editDictionary}
      />
    </Card >
  );
};

// RecentOrdersTable.propTypes = {
//   dictionaries: PropTypes.array.isRequired
// };

// RecentOrdersTable.defaultProps = {
//   dictionaries: []
// };

export default RecentOrdersTable;
