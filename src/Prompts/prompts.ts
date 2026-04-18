
import { fantasyData } from "./fantasy_prompts";
import { sciFiData } from "./scifi_prompts";
import { realisticData } from "./daily_prompts";
import { classicalData } from "./classical_prompts";

type PromptData = {
  categories: string[];
  genres: string[];
  subjects: string[];
  environments: string[];
  actions: string[];
  styles: string[];
  lighting: string[];
  moods: string[];
};

function mergePromptData(...dataArrs: PromptData[]): PromptData {
  // Une todos los arrays de cada campo
  const merged: PromptData = {
    categories: [],
    genres: [],
    subjects: [],
    environments: [],
    actions: [],
    styles: [],
    lighting: [],
    moods: [],
  };
  const keys = [
    "categories",
    "genres",
    "subjects",
    "environments",
    "actions",
    "styles",
    "lighting",
    "moods"
  ] as const;
  for (const key of keys) {
    merged[key] = dataArrs.flatMap(d => d[key] || []);
  }
  return merged;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface GeneratePromptOptions {
  lighting?: boolean;
  atmosphere?: boolean;
  style?: boolean;
  category?: "fantasy" | "scifi" | "classical" | "daily" | undefined;
}

export function generatePrompt(options: GeneratePromptOptions = {}) {
  const { lighting: useLighting, atmosphere: useAtmosphere, style: useStyle, category } = options;
  let data: PromptData;
  if (category === "fantasy") {
    data = fantasyData as PromptData;
  } else if (category === "scifi") {
    data = sciFiData as PromptData;
  } else if (category === "classical") {
    data = classicalData as PromptData;
  } else if (category === "daily") {
    data = realisticData as PromptData;
  } else {
    data = mergePromptData(
      fantasyData as PromptData,
      sciFiData as PromptData,
      classicalData as PromptData,
      realisticData as PromptData
    );
  }

  const parts: string[] = [];
  parts.push(pick(data.subjects));
  if (useStyle) {
    parts.push(`in ${pick(data.genres)} style`);
  }
  parts.push(pick(data.environments));
  parts.push(pick(data.actions));
  if (useLighting) {
    parts.push(pick(data.lighting));
  }
  if (useAtmosphere) {
    parts.push(`${pick(data.moods)} mood`);
  }
  return parts.join(", ") + ".";
}