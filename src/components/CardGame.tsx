import { Game } from "@/utils/endpoint";
import Image from "next/image";

type Props = {
  game: Game;
  handleAddToCart: (game: Game) => void;
  isAdded: boolean;
};

export default function CardGame({ game, handleAddToCart, isAdded }: Props) {
  return (
    <div
      key={game.id}
      className="max-w-[380px] w-full min-h-[460px] flex flex-col"
    >
      <div
        className={`p-6 rounded-2xl h-full relative border-[#8F8F8F] border-[0.5px] flex flex-col flex-1`}
      >
        <Image
          src={game.image}
          alt={game.name}
          width={332}
          height={240}
          className="rounded-t-2xl"
          style={{
            width: "332px",
            height: "240px",
          }}
        />
        {game.isNew && (
          <span className="absolute top-10 left-10 bg-stone-100 border py-2 px-3 rounded-md font-normal">
            New
          </span>
        )}
        <div className="flex-1 mt-5">
          <p className="uppercase text-neutral-500 font-bold">{game.genre}</p>
          <div className="font-bold text-lg text-gray-medium w-full flex justify-between gap-x-2">
            <span>{game.name}</span>
            <span>${game.price}</span>
          </div>
        </div>
        <div className="mt-auto">
          <button
            className="w-full border px-6 py-4 border-gray-medium rounded-lg"
            onClick={() => handleAddToCart(game)}
          >
            <span>{isAdded? "Remove" : "ADD TO CART"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
