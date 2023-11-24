import { AlertType } from '@/helper/appAlert.helper';
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';

const classesByType: Record<AlertType, string> = {
  success: 'bg-green-100 text-green-500',
  error: 'bg-red-100 text-red-500',
  info: 'bg-blue-100 text-blue-500',
  warning: 'bg-yellow-100 text-yellow-500'
};

type Props = {
  type: AlertType,
  message: string
};

const AppAlert = ({ type, message }: Props): JSX.Element => {
  return (
    <div className={`${classesByType[type]} flex items-center mb-1 px-2 py-1 shake`} data-testid="alert" >
      { type === 'success' && <CheckCircleIcon className="h-4 w-4 text-green-400" aria-hidden="true" /> }
      { type === 'error' && <XCircleIcon className="h-4 w-4 text-red-400" aria-hidden="true" /> }
      { type === 'warning' && <ExclamationTriangleIcon className="h-4 w-4 text-yellow-400" aria-hidden="true" /> }
      { type === 'info' && <InformationCircleIcon className="h-4 w-4 text-blue-400" aria-hidden="true" /> }
      <span className="ml-2 text-sm font-medium">{ message }</span>
    </div>
  );
}

export default AppAlert;
