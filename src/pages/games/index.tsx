import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import useCart from "../../hooks/useCart";
import { Game } from "@/utils/endpoint";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { getGames } from "@/services/GameService";
import "../../app/globals.css";
import Button from "@/components/Button";
import CardGame from "@/components/CardGame";

interface PageProps {
  games: Game[];
  genre: string;
  availableFilters: string[];
  page: number;
  totalPages: number;
}

export default function CatalogPage({
  games,
  genre,
  availableFilters,
  page,
  totalPages,
}: PageProps) {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(genre);
  const [currentGames, setCurrentGames] = useState(games);
  const [currentPage, setCurrentPage] = useState(page);
  const { cart, addToCart, removeFromCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, [games]);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    const selectedGenre = e.target.value;
    const path = selectedGenre ? `?genre=${selectedGenre}` : "";
    router.replace(`/games${path}`);
    setSelected(selectedGenre);
    setCurrentPage(1);
  };

  const handleAddToCart = (game: Game) => {
    if (cart[game.id]) {
      removeFromCart(game.id);
    } else {
      addToCart(game);
    }
  };

  const handlePageChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const apiCall = async () => {
      const { data } = await getGames(genre, currentPage + 1);
      setCurrentGames((g) => [...g, ...data.games]);
      setCurrentPage(currentPage + 1);
    };
    apiCall();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="grid gap-12 sm:px-32 xs:px-6 border-b bg-stoke-tertiary pt-8 xs:pb-3">
        <h1 className="font-bold text-4xl text-gray-medium xs:uppercase sm:normal-case xs:text-2xl">
          Top Sellers
        </h1>
        <div className="flex sm:justify-end text-xl xs:justify-between h-[56px]">
          <div>
            <h3 className="inline text-gray-medium font-bold">Genre</h3>
            <span className="px-6">|</span>
          </div>
          <div className="px-6">
            <select value={selected} onChange={handleGenreChange}>
              <option value="">All</option>
              {availableFilters.map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-12 xs:px-6 sm:px-32 py-12 xs:py-8 xs:justify-center sm:justify-start xs:gap-y-6">
        {currentGames.map((game, i) => (
          <CardGame
            key={game.id}
            isAdded={Boolean(cart[game.id])}
            game={game}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <div className="min-w-[380px] sm:px-32 xs:px-6 mb-6">
        <Button
          className="bg-neutral-700 text-white rounded-lg text-center disabled:opacity-35 xs:w-full sm:w-auto"
          onClick={handlePageChange}
          disabled={totalPages === currentPage}
        >
          SEE MORE
        </Button>
      </div>
    </Layout>
  );
}

const defaultData = {
  games: [],
  availableFilters: [],
  totalPages: 1,
};

export async function getServerSideProps<GetServerSideProps>(
  context: GetServerSidePropsContext
) {
  const genre = (context.query.genre || "") as string;
  const page = Number(context.query.page) || 1;

  const { data, error } = await getGames(genre, page);
  // if error do something
  const { games, availableFilters, totalPages } = !error ? data : defaultData;
  return {
    props: {
      games,
      availableFilters,
      totalPages,
      genre,
      page,
    },
  };
}
