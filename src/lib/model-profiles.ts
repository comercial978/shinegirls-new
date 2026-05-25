export const MODEL_CATEGORIES = ["modelo", "influenciadora", "miss", "beleza", "moda", "eventos", "publicidade"] as const;

export const MODEL_STATUS = ["pending", "approved", "rejected"] as const;

export type ModelCategory = (typeof MODEL_CATEGORIES)[number];
export type ModelStatus = (typeof MODEL_STATUS)[number];

export type ModelProfileRecord = {
  id: string;
  artistic_name: string;
  full_name: string;
  email: string;
  whatsapp: string | null;
  city: string | null;
  state: string | null;
  instagram: string | null;
  category: string | null;
  bio: string | null;
  portfolio_url: string | null;
  main_photo_url: string | null;
  status: ModelStatus;
  is_adult_confirmed: boolean;
  terms_accepted: boolean;
  created_at: string;
  updated_at: string;
};

export type PublicModelProfile = Pick<
  ModelProfileRecord,
  "id" | "artistic_name" | "city" | "state" | "instagram" | "category" | "bio" | "portfolio_url" | "main_photo_url"
>;

export function normalizeInstagram(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return `https://www.instagram.com/${trimmed.replace(/^@/, "")}`;
}

export function isValidModelCategory(value: string) {
  return MODEL_CATEGORIES.includes(value as ModelCategory);
}
