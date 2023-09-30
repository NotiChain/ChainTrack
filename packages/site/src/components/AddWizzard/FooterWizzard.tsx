import { useWizard } from 'react-use-wizard';
import { Box } from '@mui/material';
import { FC } from 'react';

type WizzardFooterProps = {
  nextClick: () => void;
};

const style = {
  display: 'flex',
  gap: '20px',
};

export const WizzardFooter: FC<WizzardFooterProps> = (props) => {
  const { nextClick } = props;

  const { previousStep, isLoading, isLastStep, isFirstStep } = useWizard();

  return (
    <>
      <Box sx={style}>
        {!isFirstStep && (
          <button onClick={() => previousStep()} disabled={isLoading}>
            Previous
          </button>
        )}
        {isLastStep && (
          <button onClick={() => nextClick()} disabled={isLoading}>
            Next
          </button>
        )}
      </Box>
    </>
  );
};
