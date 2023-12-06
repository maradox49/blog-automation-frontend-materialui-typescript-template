import { FC, ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  Button,
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
import { BlogStatus, BlogType } from 'src/models/blog';

interface SourceBlogsTable {
  className?: string;
  blogs: BlogType[];
}

interface Filters {
  status?: BlogStatus;
}

const getStatusLabel = (blogStatus: BlogStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'failed',
      color: 'error'
    },
    publish: {
      text: 'publish',
      color: 'success'
    },
    pending: {
      text: 'pending',
      color: 'warning'
    }
  };

  const { text, color }: any = map[blogStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  blogs: BlogType[],
  filters: Filters
): BlogType[] => {
  return blogs.filter((blog) => {
    let matches = true;

    if (filters.status && blog.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  blogs: BlogType[],
  page: number,
  limit: number
): BlogType[] => {
  return blogs.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<SourceBlogsTable> = ({ blogs }) => {
  const [selectedBlogTypes, setSelectedBlogTypes] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedBlogTypes.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'all'
    },
    {
      id: 'publish',
      name: 'publish'
    },
    {
      id: 'pending',
      name: 'pending'
    },
    {
      id: 'failed',
      name: 'failed'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllBlogTypes = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedBlogTypes(
      event.target.checked
        ? blogs.map((blog) => blog.id)
        : []
    );
  };

  const handleSelectOneBlogType = (
    event: ChangeEvent<HTMLInputElement>,
    blogId: string
  ): void => {
    if (!selectedBlogTypes.includes(blogId)) {
      setSelectedBlogTypes((prevSelected) => [
        ...prevSelected,
        blogId
      ]);
    } else {
      setSelectedBlogTypes((prevSelected) =>
        prevSelected.filter((id) => id !== blogId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredBlogTypes = applyFilters(blogs, filters);
  const paginatedBlogs = applyPagination(
    filteredBlogTypes,
    page,
    limit
  );
  const selectedSomeBlogTypes =
    selectedBlogTypes.length > 0 &&
    selectedBlogTypes.length < blogs.length;
  const selectedAllBlogTypes =
    selectedBlogTypes.length === blogs.length;
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
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Source Blogs"
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
                  checked={selectedAllBlogTypes}
                  indeterminate={selectedSomeBlogTypes}
                  onChange={handleSelectAllBlogTypes}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Number</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBlogs.map((blog) => {
              const isBlogTypeSelected = selectedBlogTypes.includes(
                blog.id
              );
              return (
                <TableRow
                  hover
                  key={blog.id}
                  selected={isBlogTypeSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isBlogTypeSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneBlogType(event, blog.id)
                      }
                      value={isBlogTypeSelected}
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
                      {blog.sourceId}
                    </Typography>
                  </TableCell>
                  <TableCell>

                  <Typography variant="body2" color="text.secondary" noWrap>
                      {blog.date.split(' ')[0]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {blog.date.split(' ').slice(1,3).join(' ')}
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
                      {blog.slug}
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
                      {blog.title}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(blog.status)}
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {blog.number}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                      {
                        parseInt(blog.id) % 2 ?
                        <Button variant='contained'
                        sx={{
                          width: "80%"
                        }}
                         color='success' size='small'>Done</Button>:
                        <Button variant='contained' color='error'  size='small'>Translate</Button>
                      }
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
          count={filteredBlogTypes.length}
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
  blogs: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  blogs: []
};

export default RecentOrdersTable;
