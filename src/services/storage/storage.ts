/**
 * Local storage abstraction
 * Provides typed key-value persistent storage interface
 */

export interface StorageProvider {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  clear: () => Promise<void>;
}

// In-memory fallback if no native storage adapter is configured yet
class MemoryStorageProvider implements StorageProvider {
  private store = new Map<string, string>();

  async getItem(key: string): Promise<string | null> {
    return this.store.get(key) ?? null;
  }

  async setItem(key: string, value: string): Promise<void> {
    this.store.set(key, value);
  }

  async removeItem(key: string): Promise<void> {
    this.store.delete(key);
  }

  async clear(): Promise<void> {
    this.store.clear();
  }
}

export class AppStorage {
  private provider: StorageProvider;

  constructor(provider?: StorageProvider) {
    this.provider = provider ?? new MemoryStorageProvider();
  }

  setProvider(provider: StorageProvider) {
    this.provider = provider;
  }

  async getString(key: string): Promise<string | null> {
    return this.provider.getItem(key);
  }

  async setString(key: string, value: string): Promise<void> {
    await this.provider.setItem(key, value);
  }

  async getObject<T>(key: string): Promise<T | null> {
    const raw = await this.provider.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  async setObject<T>(key: string, value: T): Promise<void> {
    await this.provider.setItem(key, JSON.stringify(value));
  }

  async remove(key: string): Promise<void> {
    await this.provider.removeItem(key);
  }

  async clear(): Promise<void> {
    await this.provider.clear();
  }
}

export const appStorage = new AppStorage();
