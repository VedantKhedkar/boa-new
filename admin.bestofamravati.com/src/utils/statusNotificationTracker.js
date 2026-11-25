// src/utils/statusNotificationTracker.js
const STATUS_NOTIFS_STORAGE_KEY = " Best of amravati_status_notifications";
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export const getStatusNotifications = () => {
  try {
    const raw = localStorage.getItem(STATUS_NOTIFS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const cutoffTime = Date.now() - THIRTY_DAYS_MS;
    const fresh = parsed.filter((item) => {
      const t = new Date(item.createdAt).getTime();
      return !isNaN(t) && t >= cutoffTime;
    });

    // Update storage if any expired items were pruned
    if (fresh.length !== parsed.length) {
      localStorage.setItem(STATUS_NOTIFS_STORAGE_KEY, JSON.stringify(fresh));
    }

    return fresh;
  } catch {
    return [];
  }
};

export const notifyStatusChange = ({ rawId, name, category, tab, categoryType, badgeColor }) => {
  try {
    if (!rawId) return;

    const now = new Date();
    const dateFormatted = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).replace(/\//g, "-");
    const timeFormatted = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    const notif = {
      id: `status-${categoryType || "item"}-${rawId}-${Date.now()}`,
      rawId,
      name: name || "Record",
      category: category || "Status Updated",
      tab: tab || "Dashboard",
      categoryType: categoryType || "booking",
      badgeColor: badgeColor || "bg-green-100 text-green-700",
      dateTime: `${dateFormatted}, ${timeFormatted}`,
      createdAt: now.toISOString()
    };

    const current = getStatusNotifications();
    // Keep newest at front, limit to 100 entries
    const updated = [notif, ...current.filter((n) => n.id !== notif.id)].slice(0, 100);
    localStorage.setItem(STATUS_NOTIFS_STORAGE_KEY, JSON.stringify(updated));

    // Dispatch global event so NotificationDropdown catches it instantly
    window.dispatchEvent(new CustomEvent("statusNotificationAdded", { detail: notif }));
    return notif;
  } catch (e) {
    console.error("Error creating status change notification:", e);
  }
};

export const clearStatusNotifications = () => {
  try {
    localStorage.removeItem(STATUS_NOTIFS_STORAGE_KEY);
  } catch (e) {
    console.error("Error clearing status notifications:", e);
  }
};
