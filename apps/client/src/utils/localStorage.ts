export function saveStorageData<T>(key: string, data: T): void {
  if (data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export function getStorageData<T>(key: string): T | null {
  const data = localStorage.getItem(key);
  if (!data) return null;

  try {
    const result: T = JSON.parse(data);
    return result;
  } catch {
    return null;
  }
}

export function removeStorageData(key: string): void {
  localStorage.removeItem(key);
}
