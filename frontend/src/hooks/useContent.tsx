import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Content {
  _id: string; 
  type: "youtube" | "tweet" | "document";
  link: string;
  title: string;
}

export function useContent() {
    const [contents, setContents] = useState<Content[]>([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
        }).then((response) => {
            setContents(response.data.content)
        })
    }, [])

    const addDocument = async (title: string, file: File) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('document', file);
    
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/content/document`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        
        setContents(currentContents => [...currentContents, response.data.content]);
        return { success: true };
    } catch (error) {
        console.error("Failed to upload document:", error);
        return { success: false, error };
    }
  };

    // Function to add new content
    const addContent = async ({ title, link, type }: { title: string, link: string, type: string }) => {
      try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/content`, {
          title, link, type
        }, {
          headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`}
        })
        // Add the new content to the existing list to update the UI
        setContents(currentContents => [...currentContents, response.data.content]);
      } catch (error) {
        console.error("Failed to add content:", error);
      }
    };

    const addFileContent = async ({ title, file, type }: { title: string, file: File, type: string }) => {
    // Creating a FormData object
    const formData = new FormData();
    
    formData.append('title', title);
    formData.append('type', type);
    formData.append('file', file); // Append the file itself

    try {
        // 3. Send the FormData object
        const response = await axios.post(`${BACKEND_URL}/api/v1/content/file`, formData, {
            headers: {
                // The 'Content-Type' header is set automatically by the browser when sending FormData
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        setContents(currentContents => [...currentContents, response.data.content]);
    } catch (error) {
        console.error("Failed to add file content:", error);
    }
  };

    const handleShare = (link: string, title: string) => {
      if (navigator.share) {
        navigator.share({
          title: `${title}`,
          url: link
        });
      } else {
        navigator.clipboard.writeText(link);
        alert('Link copied to clipboard!');
      }
    };

  const handleDelete = async (contentId: string) => {
    try {
        await axios.delete(`${BACKEND_URL}/api/v1/content/${contentId}`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });

        setContents(currentContents  => currentContents.filter(content => content._id !== contentId))
    } catch (error) {
        console.error("Failed to delete content:", error)
    }
   };

    return { contents, addContent, handleDelete, handleShare, addDocument, addFileContent }
}