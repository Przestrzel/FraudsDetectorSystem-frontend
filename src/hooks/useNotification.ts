import { useSnackbar } from 'notistack';
import { NOTIFICATION_DURATION } from 'utils/config.utils';
import { NotificationType } from 'types/app.types';

const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();
  const notify = (message: string, variant: NotificationType) => {
    enqueueSnackbar(message, {
      variant: variant,
      autoHideDuration: NOTIFICATION_DURATION
    });
  };
  return { notify };
};

export default useNotification;