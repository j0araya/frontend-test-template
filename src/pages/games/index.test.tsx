import { render } from "@testing-library/react";
import { allGames, Game } from "@/utils/endpoint";
import CatalogPage from "./index";

vi.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "",
    };
  },
}));

vi.mock("@/services/GameService");

test("renders the catalog page with all games", async () => {
  const { getByText, getByTestId } = render(
    <CatalogPage
      games={allGames as Game[]}
      genre=""
      availableFilters={[]}
      page={1}
      totalPages={1}
    />
  );
  expect(getByText("Top Sellers")).toBeDefined();
  allGames.forEach((game) => {
    const card = getByTestId(`card-${game.id}`);
    expect(card).toBeDefined();
  });
});

test("renders the catalog page with games", async () => {
  const games = [allGames[0], allGames[1], allGames[2]];
  const { getByText, getByTestId } = render(
    <CatalogPage
      games={games as Game[]}
      genre=""
      availableFilters={[]}
      page={1}
      totalPages={1}
    />
  );

  expect(getByText("Top Sellers")).toBeDefined();
  games.forEach((game) => {
    const card = getByTestId(`card-${game.id}`);
    expect(card).toBeDefined();
  });
});

/*
test("should call getServerSideProps", async () => {
  const context = {
    query: {},
  };
  const values = {
    availableFilters: [],
    page: 1,
    totalPages: 1,
    games: [],
  };
  vi.mocked(getGames).mockResolvedValue({ data: values, error: false });

  await getServerSideProps(context as GetServerSidePropsContext);
  expect(getGames).toHaveBeenCalledTimes(1);
});

*/
