// src/utils/NotificationUtils.js

export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    alert('This browser does not support notifications.');
    return 'unsupported';
  }

  try {
    const permission = await Notification.requestPermission();
    console.log('User permission is:', permission);
    return permission; // 'granted', 'denied', or 'default'
  } catch (err) {
    console.error('Error requesting notification permission:', err);
    return 'error';
  }
}