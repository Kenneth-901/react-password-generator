import { toast as toastLib } from 'react-toastify';

export const toast =  {
  warn: (message) => { toastLib.warn(message); },
  success: (message, ) => { toastLib.success(message); },
  error: (messageObject) => {
    if (typeof messageObject === 'string') {
      toastLib.error(messageObject);
    } else if (messageObject instanceof Error) {
      // Helps to log down the error on development.
      const isDevelopment = process.env.NODE_ENV === 'development';

      // eslint-disable-next-line no-console
      console.error(messageObject);

      let errorMessage = messageObject.errorMessage || undefined;
      if (!errorMessage) {
        errorMessage = isDevelopment
          ? messageObject.toString()
          : "Unknown";
      }
      toastLib.error(errorMessage);
    }
  },
};
