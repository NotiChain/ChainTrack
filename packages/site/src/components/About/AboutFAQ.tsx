import React, { FC } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const AboutFaq: FC = () => {
  return (
    <Stack>
      <Paper>
        <Typography variant="subtitle1">FAQ</Typography>
      </Paper>
      <Stack>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
          >
            <Typography>
              How does ChainTrack integrate with MetaMask?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              ChainTrack integrates seamlessly with MetaMask using secure
              protocols, ensuring your data remains private and safe.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
          >
            <Typography>Can I customize my alert preferences?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes! ChainTrack offers customizable alert settings tailored to
              your tracking needs.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Stack>
  );
};
