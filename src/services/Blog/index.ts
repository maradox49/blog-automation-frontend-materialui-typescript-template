import { BlogType } from "src/models/blog";
import config from "../../config/Global";
import { LanguageType } from "src/models/language";
// import { BlogGeneralType, BlogType, LanguageType } from "../../config/Types";

export const getAllBlogsService = async (username: string, password: string, page: number = 1, pageCount: number = 5, search: string = "") => {
    try {
        const url = `${config.sourceBlogUrl}/posts?page=${page}&per_page=${pageCount}&search=${search}&search_columns=post_title&_embed`;

        const response = await fetch(url, {
            headers: {
                'Authorization': 'Basic ' + btoa(`${username}:${password}`)
            }
        });

        if (response.ok) {
            const data = await response.json();
            const count = response.headers.get("X-WP-Total");
            return {
                blogs: data.map((blog: { id: string; date: string; date_gmt: string; status: string; comment_status: string; ping_status: string; format: string; slug: string; title: { rendered: string; }; content: { rendered: string; }; excerpt: { rendered: string; }; author: string; categories: string; tags: string; }) => ({
                    id: blog.id,
                    date: blog.date,
                    slug: blog.slug,
                    status: blog.status,
                    title: blog.title.rendered,
                    content: blog.content.rendered,
                    media: "https://www.singlequiver.com/enelpico/wp-content/uploads/" + blog["_embedded"]["wp:featuredmedia"][0]["media_details"]["file"],
                    number: 0
                })),
                count: count ? parseInt(count) : 0
            };
        }
        return null;
    } catch (error) {
        return null;
    }
}

export const getOneBlogService = async (username: string, password: string, id: string) => {
    try {
        const url = `${config.sourceBlogUrl}/posts/${id}`;

        const response = await fetch(url, {
            headers: {
                'Authorization': 'Basic ' + btoa(`${username}:${password}`)
            }
        });

        if (response.ok) {
            const data = await response.json();
            return {
                id: data.id,
                date: data.date,
                slug: data.slug,
                status: data.status,
                title: data.title.rendered,
                content: data.content.rendered,
                media: "https://www.singlequiver.com/enelpico/wp-content/uploads/" + data["_embedded"]["wp:featuredmedia"][0]["media_details"]["file"],
                number: 0
            };
        }
        return null;
    } catch (error) {
        return null;
    }
}

export const deleteBlogService = async (username: string, password: string, url: string) => {
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Authorization': 'Basic ' + btoa(`${username}:${password}`)
            }
        });

        if (response.ok) {
            return "success";
        }
        return null;
    } catch (error) {
        return null;
    }
}

export const getBlogStatusService = async (postIds: string[]) => {
    try {
        const url = `${config.baseUrl}/history/filter`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postIds)
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        }
        return null;
    } catch (error) {
        return null;
    }
}

export const translateBlogService = async (blog: BlogType, language: string) => {
    try {
        const url = `${config.baseUrl}/translation/`;
        const data = {
            title: blog.title,
            content: blog.content,
            language: language
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
        return null;
    } catch (error) {
        return null;
    }
}

export const sendBlogService = async (blog: BlogType, language: LanguageType) => {
    try {
        const response = await fetch(language.url + "/wp-json/wp/v2/posts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${language.username}:${language.password}`)
            },
            body: JSON.stringify({
                title: blog.title,
                content: blog.content,
                date: blog.date,
                status: blog.status
            })
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        }
    } catch (error) {
        console.log(error)
    }
}

export const sendBlogStatus = async (postId: string, language: string, targetId: string) => {
    try {
        const url = `${config.baseUrl}/history/`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({
                postId: postId,
                language: language,
                targetId: targetId
            })
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        }
    } catch (error) {
        console.log(error)
    }
} 

export const updateBlogStatus = async (statusId: string, postId: string, language: string, targetId: string) => {
    try {
        const url = `${config.baseUrl}/history/${statusId}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({
                postId: postId,
                language: language,
                targetId: targetId
            })
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        }
    } catch (error) {
        console.log(error)
    }
} 
export const deleteBlogStatus = async (postId: string, language: string, targetId: string) => {
    try {
        const url = `${config.baseUrl}/history/?postId=${postId}&language=${language}&targetId=${targetId}`;
        const response = await fetch(url, {
            method: 'DELETE'
        });
        if (response.ok) {
            return "Success";
        }
    } catch (error) {
        console.log(error)
    }
} 
