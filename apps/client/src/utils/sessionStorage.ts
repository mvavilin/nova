export function saveSessionStorageData<T>(key: string, data: T): void {
  if (data) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
}

export function getSessionStorageData<T>(key: string): T | null {
  const data = sessionStorage.getItem(key);
  if (!data) return null;

  try {
    const result: T = JSON.parse(data);
    return result;
  } catch {
    return null;
  }
}

export function removeSessionStorageData(key: string): void {
  sessionStorage.removeItem(key);
}
