import { FC, ChangeEvent, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Stack,
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
  CardHeader,
  styled,
  Dialog,
  Grid
} from '@mui/material';

import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { BlogStatus, BlogType } from 'src/models/blog';
import { DoneAll, Link, Send, Translate } from '@mui/icons-material';
import { BlogContext } from 'src/contexts/BlogContext';
import { UserContext } from 'src/contexts/UserContext';

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
      color: 'primary'
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

const TableCellItem = styled(TableCell)(
  ({ theme }) => `
        color: ${theme.colors.secondary.main};
`
);

const LabelBox = styled(Box)(
  ({ theme }) => `
  background: white;
  color: ${theme.colors.primary.main};
  width: 100%;
  height: 100%; 
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  `
)

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const theme = useTheme()

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
          // "height": "510px",
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
        {/* <Box sx={{
          position: "absolute",
          bottom: "30px",
          right: "27px"
        }}
        ><img src="/static/images/languages/vector.png" width={"35px"}/></Box> */}
        <Box sx={{
          position: "absolute",
          top: "35px",
          left: "120px"
        }}>
          <Typography fontFamily={"Poppins"} fontWeight={"500"} fontSize={"17px"} color={"white"}>
            Automation Status
          </Typography>
        </Box>
        <Box padding={"40px"} paddingTop={"100px"} paddingBottom={"30px"} textAlign={"center"}>
          <Grid container spacing={2}>
          <Grid item sm={5}>
              <LabelBox>
                <Typography variant='h4'>
                  German
                </Typography>
              </LabelBox>
            </Grid>
            <Grid item sm={7}>
              <Button endIcon={<Link />} fullWidth variant='contained' color='primary'>
                View
              </Button>
            </Grid>
            <Grid item sm={5}>
              <LabelBox>
                <Typography variant='h4'>
                  Italian
                </Typography>
              </LabelBox>
            </Grid>
            <Grid item sm={7}>
              <Button endIcon={<Translate />} fullWidth variant='contained' color='primary'>
                Translate
              </Button>
            </Grid>
            <Grid item sm={5}>
              <LabelBox>
                <Typography variant='h4'>
                  French
                </Typography>
              </LabelBox>
            </Grid>
            <Grid item sm={7}>
              <Button endIcon={<Link />} fullWidth variant='contained' color='primary'>
                View
              </Button>
            </Grid>
            
          </Grid>
          {/* <Stack direction={"column"} spacing={2}>
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
          </Stack> */}
          <Box paddingTop={"33px"}>
            <Button sx={{ width: "200px" }} variant='contained' color='primary' endIcon={<Translate />}>Translate All</Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};

const RecentOrdersTable = () => {
  const [selectedBlogTypes, setSelectedBlogTypes] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedBlogTypes.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("hello");
  const { blogs, loadBlogs, blogCount, search } = useContext(BlogContext);
  const { username } = useContext(UserContext);

  useEffect(()=>{
    if ( username ) {
      loadBlogs(page+1, limit, search);
    }
  }, [username])

  useEffect(()=>{
    const possiblePageCount = Math.ceil(blogCount/limit);
    console.log(page, search, limit, blogCount)
    if ( possiblePageCount === 0 ) {
      if ( page === 0 ) {
        loadBlogs(1, limit, search);
      } else 
        setPage(0);
    }
    else if ( page >= possiblePageCount )
      setPage(possiblePageCount-1);
    else if ( page < 0 )
      setPage(0);
    else
      loadBlogs(page+1, limit, search);
  }, [search, page, limit])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

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
      {/* {selectedBulkActions && (
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
      <Divider /> */}
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
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Number</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => {
              const isBlogTypeSelected = selectedBlogTypes.includes(
                blog.id
              );
              return (
                <TableRow
                  hover
                  key={blog.id}
                  selected={isBlogTypeSelected}
                >
                  <TableCellItem padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isBlogTypeSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneBlogType(event, blog.id)
                      }
                      value={isBlogTypeSelected}
                    />
                  </TableCellItem>
                  <TableCellItem>
                    <Typography
                      variant="body2"
                      gutterBottom
                      noWrap
                    >
                      #{blog.id}
                    </Typography>
                  </TableCellItem>
                  <TableCellItem>

                    <Typography
                      variant="body2" noWrap>
                      {blog.date.split('T')[0]}
                    </Typography>
                    <Typography
                      variant="body2" noWrap>
                      {blog.date.split('T')[1]}
                    </Typography>
                  </TableCellItem>
                  <TableCellItem>
                    <Typography
                      variant="body2"
                      gutterBottom
                      noWrap
                    >
                      {blog.slug}
                    </Typography>
                  </TableCellItem>
                  <TableCellItem>
                    <Typography
                      variant="body2"
                      gutterBottom
                      noWrap
                    >
                      {blog.title}
                    </Typography>
                  </TableCellItem>
                  <TableCellItem align="center">
                    {getStatusLabel(blog.status)}
                  </TableCellItem>
                  <TableCellItem align="right">
                    <Typography
                      variant="body2"
                      gutterBottom
                      noWrap
                    >
                      {blog.number}
                    </Typography>
                  </TableCellItem>
                  <TableCellItem align="center">
                    {
                      parseInt(blog.id) % 2 ?
                        <Button
                          onClick={handleClickOpen}
                          variant='contained' sx={{ width: "120px", justifyContent: "flex-start" }} startIcon={<DoneAll />} color='primary' size='small'>&nbsp;&nbsp;&nbsp;Done</Button> :
                        <Button variant='contained' sx={{ width: "120px", justifyContent: "flex-start" }} startIcon={<Translate />} color='error' size='small'>Translate</Button>
                    }
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
            count={blogCount}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Stack>
      </Box>

      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </Card>
  );
};

// RecentOrdersTable.propTypes = {
//   blogs: PropTypes.array.isRequired
// };

// RecentOrdersTable.defaultProps = {
//   blogs: []
// };

export default RecentOrdersTable;
