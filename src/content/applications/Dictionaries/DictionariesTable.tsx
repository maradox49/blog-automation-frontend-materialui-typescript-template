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
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { DictionaryType } from 'src/models/dictionary';

interface RecentOrdersTableProps {
  className?: string;
  dictionaries: DictionaryType[];
}


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
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          title="Recent Orders"
        />
      )}
      <Divider />
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
              <TableCell align="right" sx={{paddingRight: "35px"}}>Actions</TableCell>
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
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isDictionaryTypeSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneDictionaryType(event, dictionary.id)
                      }
                      value={isDictionaryTypeSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {dictionary.language}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {dictionary.badEntry}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {dictionary.rightEntry}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <FormControl sx={{
                      width: "90px"
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
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={dictionaries.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  dictionaries: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  dictionaries: []
};

export default RecentOrdersTable;
