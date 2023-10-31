import React, { FC } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';

export const AboutFaq: FC = () => {
  const theme = useTheme();
  const screenLessThanMedium = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid
      display="flex"
      justifyContent="space-between"
      marginBottom={screenLessThanMedium ? '90px' : '180px'}
      flexDirection="column"
      gap="48px"
      width={screenLessThanMedium ? '100%' : '50%'}
      className="faq-accordion"
    >
      <Box>
        <Typography variant="h2" fontWeight="500">
          FAQ
        </Typography>
      </Box>
      <Box>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
          >
            <Typography variant="h4">
              How does ChainTrack integrate with MetaMask?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h5">
              ChainTrack smoothly syncs with MetaMask through secure Snap
              protocols, guaranteeing your data's privacy and safety.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
          >
            <Typography variant="h4">
              Can I customize my alert preferences?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h5">
              Yes! ChainTrack offers customizable alert settings tailored to
              your tracking needs.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
          >
            <Typography variant="h4">
              Where is the logic being processed?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h5">
              The logic is processed within a specialized environment in
              MetaMask's background Snap, operating directly in your browser for
              enhanced security and efficiency.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Grid>
  );
};
