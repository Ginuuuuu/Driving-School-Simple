// Safe SHA-256 string hashing using Web Crypto API
export async function sha256(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Default admin hash for demo: "admin123" or "drivecraft2024"
// sha256("drivecraft2024") -> 52e6ffebff62d186c310ff5eec83226a27e7d6cfcf8ea622ba79d3a77ec6e34c
// sha256("admin123") -> 240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822808fe3d82d46
export const ADMIN_HASH = '52e6ffebff62d186c310ff5eec83226a27e7d6cfcf8ea622ba79d3a77ec6e34c';
export const ADMIN_FALLBACK_HASH = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822808fe3d82d46';
