import { FC, useState, createContext, useContext } from 'react';
import { loginService } from 'src/services/Auth/Auth';
import { LoadingContext } from './LoadingContext';
import { BlogStatusType, BlogType } from 'src/models/blog';
import { UserContext } from './UserContext';
import { getAllBlogsService, getBlogStatusService, sendBlogService, sendBlogStatus, translateBlogService } from 'src/services/Blog';
import { LanguageContext } from './LanguageContext';
type BlogContext = {
  blogs: BlogType[],
  blogCount: number,
  loadBlogs: (page, pagecCount, search) => void,
  blogStatus: BlogStatusType[][]
  search: string,
  updateSearch: (string) => void,
  translate: (index, language) => void
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const BlogContext = createContext<BlogContext>(
  {} as BlogContext
);

export const BlogProvider: FC = ({ children }) => {
  const [blogs, setBlogs] = useState<BlogType[]>([])
  const [blogCount, setBlogCount] = useState(0);
  const [blogStatus, setBlogStatus] = useState<BlogStatusType[][]>([])
  const [search, setSearch] = useState("")
  const { username, password } = useContext(UserContext);
  const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);
  const { languages } = useContext(LanguageContext);

  const init = () => {
    setBlogStatus([])
    setBlogs([]);
    setBlogCount(0)
  }

  const updateSearch = (_search: string) => {
    setSearch(_search);
  }

  const translate = async (index: number, languageName: string) => {
    startLoading("Translating...")
    const responseTranslate = await translateBlogService(blogs[index], languageName);
    console.log(responseTranslate)
    stopLoading()
    if (responseTranslate) {
      if ( responseTranslate.title === "error" ) return ;
      const language = languages.find(value => (value.name === languageName));
      if (!language) return;
      startLoading("Sending...")
      const responseSent = await sendBlogService({
        ...blogs[index],
        content: responseTranslate.content,
        title: responseTranslate.title
      }, language);
      console.log(responseSent)
      stopLoading();
      if (responseSent) {
        startLoading("Updating Status...")
        const responseStatusUpdate = await sendBlogStatus(blogs[index].id, languageName, responseSent.id);
        console.log(responseStatusUpdate)
        stopLoading();
        if (responseStatusUpdate) {
          setBlogStatus(blogStatus.map((blogArr, rowIndex) => (blogArr.map(blogOneStatus => {
            if (blogOneStatus.language === languageName && rowIndex === index) {
              blogOneStatus.sent = true;
              blogOneStatus.targetId = responseSent.id;
            }
            return blogOneStatus;
          }))))
        }
      }
    }
  }

  const loadBlogs = async (page: number = 1, pageCount: number = 5, search: string = "") => {
    if (isLoading) return;
    startLoading("Loading Blogs...")
    const response = await getAllBlogsService(username, password, page, pageCount, search);
    stopLoading();
    if (response) {
      console.log(response);
      startLoading("Loading Automation Status...")
      const blogStatusResponse = await getBlogStatusService(response.blogs.map(blog => (blog.id)));
      stopLoading();
      if (blogStatusResponse) {
        setBlogStatus(blogStatusResponse);
        setBlogs(response.blogs);
        setBlogCount(response.count);
      } else {
        init();
      }
    } else {
      init()
    }
  }

  return (
    <BlogContext.Provider
      value={{ blogs, blogCount, loadBlogs, search, updateSearch, blogStatus, translate }}
    >
      {children}
    </BlogContext.Provider>
  );
};
