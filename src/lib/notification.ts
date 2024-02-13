import { notifications, type NotificationData } from '@mantine/notifications';

export type NotificationType = 'info' | 'error' | 'warning' | 'success';

export type NotifyOptions = Omit<NotificationData, 'color'>;

const typeToColor = (type: NotificationType): Required<NotificationData>['color'] => {
  if (type === 'warning') {
    return 'orange';
  }
  if (type === 'error') {
    return 'red';
  }
  if (type === 'success') {
    return 'green';
  }
  return 'blue';
};

const createNotification =
  (type: NotificationType) =>
  (options: NotifyOptions): void => {
    notifications.show({ ...options, color: typeToColor(type) });
  };

const info = createNotification('info');
const error = createNotification('error');
const success = createNotification('success');
const warning = createNotification('warning');

export const notification = { info, error, success, warning };
