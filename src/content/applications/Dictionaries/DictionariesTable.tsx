import { FC, ChangeEvent, useState } from 'react';
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
  IconButton,
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
  CardHeader,
  styled
} from '@mui/material';

import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { DictionaryType } from 'src/models/dictionary';
import { LanguageName } from 'src/models/language';

interface RecentOrdersTableProps {
  className?: string;
  dictionaries: DictionaryType[];
}

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
  dictionaries: DictionaryType[],
  page: number,
  limit: number
): DictionaryType[] => {
  return dictionaries.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ dictionaries }) => {
  const [selectedDictionaryTypes, setSelectedDictionaryTypes] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedDictionaryTypes.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

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
                        <MenuItem value={10}>
                          Delete
                        </MenuItem>
                        <MenuItem value={20}>Edit</MenuItem>
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
            count={dictionaries.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Stack>
      </Box>
    </Card >
  );
};

RecentOrdersTable.propTypes = {
  dictionaries: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  dictionaries: []
};

export default RecentOrdersTable;
