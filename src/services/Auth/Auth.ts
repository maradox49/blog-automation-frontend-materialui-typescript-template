import config from "../../config/Global";

export const loginService = async (username: string, password: string) => {
    try {
        const response = await fetch(`${config.sourceBlogUrl}/posts`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
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