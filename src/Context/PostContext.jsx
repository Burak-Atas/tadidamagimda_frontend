import { createContext, useContext, useState } from "react";
import PostService from "../Services/PostService";

const postContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]); 

    const postService = new PostService();

    const handelLike = (postID) => {
        postService.LikeRequest({postID:postID})
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.error(error)
        })
      
    };
    const handleComment = (postID) => {
    };
    

    return (
        <postContext.Provider value={{ posts }}>
            {children}
        </postContext.Provider>
    );
};

export const usePosts = () => {
    const context = useContext(postContext);
    if (!context) {
        throw new Error("usePosts must be used within a PostProvider");
    }
    return context;
};
