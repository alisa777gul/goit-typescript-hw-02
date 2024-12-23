import { ErrorMessageProps } from './ErrorMessage.types';
import style from './ErrorMessage.module.css';
import { toast } from 'react-hot-toast';


export default function ErrorMessage({ 
  message = 'Something went wrong 😞', 
  showToast = false 
}: ErrorMessageProps) {
  if (showToast) {
    toast.error(message, {
      duration: 4000,
      position: 'top-right',
    });
  }

  return <div className={style.messageBox}>{message}</div>;
}
