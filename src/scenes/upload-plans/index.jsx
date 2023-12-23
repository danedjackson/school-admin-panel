import { Box, Button, Input, Typography } from "@mui/material";
import Header from "../../components/Header";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { uploadFile } from "../../data/endpoints";

const UploadPlans = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const { auth } = useAuth();

    const handleFileUpload = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleUploadToServer = async () => {
        const formData = new FormData();
        
        // Create a new File object with a different name
        const modifiedFile = new File([selectedFile], auth?.id, {
            type: selectedFile.type,
        }); 

        formData.append('file', modifiedFile);

        const response = await uploadFile(formData);
        if(response.httpStatus=="OK") {
            //Reset the Input field
            setSelectedFile(null);
            //Notify successful upload
            return alert("File Uploaded Successfully");
        }

        return alert("Failed to upload file, contact system administrator");
    }

    return(
        <Box m = '20px'>
            <Header title = 'LESSONS PLANS' subtitle = 'Upload Lesson Plans for Review' />
            <Box 
                m = '40px 0 0 0'
                height = '75vh'
            >
                <Typography variant = 'h3' >
                    Upload File
                </Typography>
                <Box m = '0 0 20px 0'>
                <Input 
                    type="file" 
                    variant="contained"
                    onChange={handleFileUpload} 
                    
                />
                </Box>  
                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={handleUploadToServer}
                >
                    Upload
                </Button>
            </Box>
        </Box>
    );
}

export default UploadPlans;