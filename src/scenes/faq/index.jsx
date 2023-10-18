import { Box, useTheme, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Header from "../../components/Header";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return <Box m = "20px">
        <Header title = "FAQ" subtitle = "Frequently Asked Questions Page" />
        
        {/* TODO: These FAQs should be fetched and looped */}
        <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color = {colors.greenAccent[500]} variant = "h5">
                    Sample FAQ
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    This is just to test the FAQ page. Later on, this text will be fetched
                    dynamically from the database
                </Typography>
            </AccordionDetails>
        </Accordion>
    </Box>
}

export default FAQ;