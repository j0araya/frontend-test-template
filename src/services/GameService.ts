import { Game } from "@/utils/endpoint";

interface GamesResponse {
  games: Game[];
  availableFilters: string[];
  page: number;
  totalPages: number;
}

const defaultGames: GamesResponse = {
  games: [],
  availableFilters: [],
  page: 1,
  totalPages: 1,
};

export async function getGames(genre: string, page: number) {
  try {
    const params: { genre?: string; page?: string } = {};
    if (genre) params.genre = genre;
    if (page > 1) params.page = `${page}`;

    const query = new URLSearchParams(params).toString();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/games?${query}`
    );
    const data = (await res.json()) as GamesResponse;
    return { data, error: false };
  } catch (e) {
    return { data: defaultGames, error: true };
  }
}
