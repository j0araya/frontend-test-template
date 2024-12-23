import { allGames, availableFilters, delay, Game } from "@/utils/endpoint";

const ITEMS_PER_PAGE = 12;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre") || "";
  const page = Number(searchParams.get("page")) || 1;

  const filterByCategory = (game: Game) =>
    game.genre.toLowerCase() === genre.toLowerCase();
  const games = genre ? allGames.filter(filterByCategory) : allGames;

  // Mock a delay to simulate a real API
  await delay(2000);

  const fromIndex = (page - 1) * ITEMS_PER_PAGE;
  const toIndex = page * ITEMS_PER_PAGE;
  const finalGames = [...games].slice(fromIndex, toIndex);

  const totalPages = Math.ceil(games.length / ITEMS_PER_PAGE);
  const currentPage = page;

  return Response.json({
    games: finalGames,
    availableFilters,
    totalPages,
    currentPage,
  });
}
