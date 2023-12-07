import { FC, useState, createContext, useContext } from 'react';
import { loginService } from 'src/services/Auth/Auth';
import { LoadingContext } from './LoadingContext';
import { BlogType } from 'src/models/blog';
import { UserContext } from './UserContext';
import { getAllBlogsService } from 'src/services/Blog';
type BlogContext = {
    blogs: BlogType[],
    blogCount: number,
    loadBlogs: (page, pagecCount, search) => void,
    search: string,
    updateSearch: (string) => void
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const BlogContext = createContext<BlogContext>(
  {} as BlogContext
);

export const BlogProvider: FC = ({ children }) => {
    const [blogs, setBlogs] = useState<BlogType[]>([])
    const [blogCount, setBlogCount] = useState(0);
    const [search, setSearch] = useState("")
    const { username, password } = useContext(UserContext);
    const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);

    const updateSearch = (_search: string) => {
        setSearch(_search);
    }

    const loadBlogs = async (page: number = 1, pageCount: number = 5, search: string = "") => {
        if ( isLoading ) return ;
        startLoading("Loading Blogs...")
        const response = await getAllBlogsService(username, password, page, pageCount, search);
        stopLoading();
        if (response) {
            console.log(response);
            setBlogs(response.blogs);
            setBlogCount(response.count);
        } else {
          setBlogs([]);
          setBlogCount(0)
        }
    }

  return (
    <BlogContext.Provider
      value={{ blogs, blogCount, loadBlogs, search, updateSearch }}
    >
      {children}
    </BlogContext.Provider>
  );
};
