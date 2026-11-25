const VIEWED_STORAGE_KEY = " Best of amravati_viewed_records";

export const getViewedIds = () => {
  try {
    const raw = localStorage.getItem(VIEWED_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const markIdAsViewed = (id) => {
  try {
    if (id === undefined || id === null) return;
    const strId = String(id);
    const current = getViewedIds();
    if (!current.includes(strId)) {
      current.push(strId);
      localStorage.setItem(VIEWED_STORAGE_KEY, JSON.stringify(current));
      window.dispatchEvent(new CustomEvent("recordViewedUpdated", { detail: strId }));
    }
  } catch (e) {
    console.error("Error marking record as viewed:", e);
  }
};

export const clearAllViewed = () => {
  try {
    localStorage.removeItem(VIEWED_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("recordViewedReset"));
  } catch (e) {
    console.error("Error clearing viewed records:", e);
  }
};
