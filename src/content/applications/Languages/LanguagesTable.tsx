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
import { LanguageType } from 'src/models/language';

interface RecentOrdersTableProps {
  className?: string;
  languages: LanguageType[];
}

const TableCellItem = styled(TableCell)(
  ({ theme }) => `
        color: ${theme.colors.secondary.main};
`
);

const applyPagination = (
  languages: LanguageType[],
  page: number,
  limit: number
): LanguageType[] => {
  return languages.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ languages }) => {
  const [selectedLanguageTypes, setSelectedLanguageTypes] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedLanguageTypes.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

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
              <TableCell align="right" sx={{paddingRight: "45px"}}>Actions</TableCell>
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
                    <Typography
                      variant="body2"
                      gutterBottom
                      noWrap
                    >
                      {language.name}
                    </Typography>
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
        <TablePagination
          component="div"
          count={languages.length}
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
  languages: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  languages: []
};

export default RecentOrdersTable;
