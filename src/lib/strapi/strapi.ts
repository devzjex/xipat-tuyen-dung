
const STRAPI_TOKEN = "80a0ec5a272138827c12a8d1089384d63159df9a458ba79f0123309f39e3f67ff67478348a211a6a0cb2f6c068d62f1bbc1e75e442c672094c8cb1136f352b3decc20cedbd7a05d3be24126afe7b38dff688d7c108e3b7dbc996e619f79b99eec9580fa9e61ccfbfeb6869009869dfd9e5996bc797190653c0902a768d70e7a4";
const API_URL = "https://strapi.omegatheme.com/api/xipat-tests";

export interface StrapiData {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  localizations: Array<Omit<StrapiData, 'localizations'>>;
}

export interface StrapiResponse {
  data: StrapiData[];
  meta: Record<string, unknown>;
}

export async function getStrapiData(locale: string): Promise<StrapiData | null> {
  try {
    const res = await fetch(`${API_URL}?populate=*&locale=${locale}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    const json: StrapiResponse = await res.json();
    return json.data.length > 0 ? json.data[0] : null;
  } catch (error) {
    console.error("Error fetching Strapi data:", error);
    return null;
  }
}
