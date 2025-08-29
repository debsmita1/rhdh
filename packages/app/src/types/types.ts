import { TranslationResource } from "@backstage/core-plugin-api/alpha";

export type LearningPathLink = {
  label: string;
  url: string;
  description?: string;
  hours?: number;
  minutes?: number;
  paths?: number;
};

export type BuildInfo = {
  title: string;
  card: { [key: string]: string };
  full?: boolean;
};

export type TranslationConfig = {
  defaultLocale: string;
  locales: string[];
};

export type JSONTranslations = {
  [key: string]: () => Promise<Record<string, string>>;
};

// Types from Backstage core-plugin-api do not expose loader function type
// so we need to create our own internal types to access the loader function

type InternalTranslationResourceLoader = () => Promise<{
  messages: { [key in string]: string | null };
}>;

export interface InternalTranslationResource<TId extends string = string>
  extends TranslationResource<TId> {
  version: 'v1';
  resources: {
    language: string;
    loader: InternalTranslationResourceLoader;
  }[];
}
