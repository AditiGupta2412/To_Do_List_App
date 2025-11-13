import { formatDistanceToNow, format, isPast } from 'date-fns';

export const formatDate = (date: string): string => {
  try {
    return format(new Date(date), 'MMM dd, yyyy');
  } catch {
    return 'Invalid date';
  }
};

export const formatDateWithTime = (date: string): string => {
  try {
    return format(new Date(date), 'MMM dd, yyyy HH:mm');
  } catch {
    return 'Invalid date';
  }
};

export const formatRelativeDate = (date: string): string => {
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  } catch {
    return 'Unknown';
  }
};

export const isOverdue = (dueDate: string | null): boolean => {
  if (!dueDate) return false;
  try {
    return isPast(new Date(dueDate));
  } catch {
    return false;
  }
};

export const isToday = (date: string): boolean => {
  try {
    const today = new Date();
    const checkDate = new Date(date);
    return (
      today.getFullYear() === checkDate.getFullYear() &&
      today.getMonth() === checkDate.getMonth() &&
      today.getDate() === checkDate.getDate()
    );
  } catch {
    return false;
  }
};

export const isTomorrow = (date: string): boolean => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const checkDate = new Date(date);
    return (
      tomorrow.getFullYear() === checkDate.getFullYear() &&
      tomorrow.getMonth() === checkDate.getMonth() &&
      tomorrow.getDate() === checkDate.getDate()
    );
  } catch {
    return false;
  }
};
