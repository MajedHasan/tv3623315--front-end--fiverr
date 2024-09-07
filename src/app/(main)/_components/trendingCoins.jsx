import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Minus } from "lucide-react";
import React from "react";

const TrendingCoins = () => {
  const trendingCoins = [
    {
      id: 1,
      name: "Pepe Unchained",
      shortName: "PEPU",
      img: "https://cdn.coinmooner.com/logo/42683.webp?v=0",
      chain: "https://coinmooner.com/v3/chains/ethereum.svg",
      marketCap: 0,
      price: 0,
      volume: 0,
      launchDate: "in 24 hours",
      votes: 250238,
    },
    {
      id: 2,
      name: "The Meme Games",
      shortName: "MGMES",
      img: "https://cdn.coinmooner.com/logo/43452.webp?v=0",
      chain: "https://coinmooner.com/v3/chains/ethereum.svg",
      marketCap: 0,
      price: 0,
      volume: 0,
      launchDate: "in 3 days",
      votes: 250238,
    },
    {
      id: 3,
      name: "Pepe Unchained",
      shortName: "PEPU",
      img: "https://cdn.coinmooner.com/logo/42683.webp?v=0",
      chain: "https://coinmooner.com/v3/chains/ethereum.svg",
      marketCap: 0,
      price: 0,
      volume: 0,
      launchDate: "in 24 hours",
      votes: 250238,
    },
    {
      id: 4,
      name: "Pepe Unchained",
      shortName: "PEPU",
      img: "https://cdn.coinmooner.com/logo/42683.webp?v=0",
      chain: "https://coinmooner.com/v3/chains/ethereum.svg",
      marketCap: 0,
      price: 0,
      volume: 0,
      launchDate: "in 24 hours",
      votes: 250238,
    },
    {
      id: 5,
      name: "Pepe Unchained",
      shortName: "PEPU",
      img: "https://cdn.coinmooner.com/logo/42683.webp?v=0",
      chain: "https://coinmooner.com/v3/chains/ethereum.svg",
      marketCap: 0,
      price: 0,
      volume: 0,
      launchDate: "in 24 hours",
      votes: 250238,
    },
    {
      id: 6,
      name: "Pepe Unchained",
      shortName: "PEPU",
      img: "https://cdn.coinmooner.com/logo/42683.webp?v=0",
      chain: "https://coinmooner.com/v3/chains/ethereum.svg",
      marketCap: 0,
      price: 0,
      volume: 0,
      launchDate: "in 24 hours",
      votes: 250238,
    },
    {
      id: 7,
      name: "Pepe Unchained",
      shortName: "PEPU",
      img: "https://cdn.coinmooner.com/logo/42683.webp?v=0",
      chain: "https://coinmooner.com/v3/chains/ethereum.svg",
      marketCap: 0,
      price: 0,
      volume: 0,
      launchDate: "in 24 hours",
      votes: 250238,
    },
    {
      id: 8,
      name: "Pepe Unchained",
      shortName: "PEPU",
      img: "https://cdn.coinmooner.com/logo/42683.webp?v=0",
      chain: "https://coinmooner.com/v3/chains/ethereum.svg",
      marketCap: 0,
      price: 0,
      volume: 0,
      launchDate: "in 24 hours",
      votes: 250238,
    },
    {
      id: 9,
      name: "Pepe Unchained",
      shortName: "PEPU",
      img: "https://cdn.coinmooner.com/logo/42683.webp?v=0",
      chain: "https://coinmooner.com/v3/chains/ethereum.svg",
      marketCap: 0,
      price: 0,
      volume: 0,
      launchDate: "in 24 hours",
      votes: 250238,
    },
    {
      id: 10,
      name: "Pepe Unchained",
      shortName: "PEPU",
      img: "https://cdn.coinmooner.com/logo/42683.webp?v=0",
      chain: "https://coinmooner.com/v3/chains/ethereum.svg",
      marketCap: 0,
      price: 0,
      volume: 0,
      launchDate: "in 24 hours",
      votes: 250238,
    },
  ];

  return (
    <>
      <section className="lg:px-0 px-2 py-10">
        <div className="container mx-auto rounded border p-2">
          <h2 className="lg:text-3xl text-xl font-semibold dark:text-white mb-4">
            Trending
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Chain</TableHead>
                <TableHead>Market Cap </TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>24h</TableHead>
                <TableHead>Launch Date</TableHead>
                <TableHead>Votes</TableHead>
                <TableHead>Votes 24</TableHead>
                <TableHead>Vote</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trendingCoins?.map((coin) => (
                <TableRow key={coin?.id}>
                  <TableCell>{coin?.id}</TableCell>
                  <TableCell>
                    <img src={coin?.img} alt="" className="max-w-[25px]" />
                  </TableCell>
                  <TableCell>
                    <p className="font-bold text-white">{coin?.name}</p>
                    <span className="text-xs text-[#a3a3a3]">
                      {coin?.shortName}
                    </span>
                  </TableCell>
                  <TableCell>
                    <img src={coin?.chain} alt="" className="w-[20px]" />
                  </TableCell>
                  <TableCell>
                    {coin?.marketCap < 1 ? (
                      <>
                        <div className="flex items-center gap-1">
                          <img
                            src="https://coinmooner.com/v3/spinner.svg"
                            alt=""
                            className="w-[25px]"
                          />
                          <span>Presale</span>
                        </div>
                      </>
                    ) : (
                      $(coin?.marketCap)
                    )}
                  </TableCell>
                  <TableCell>
                    {coin?.price < 1 ? (
                      <div className="p-1 bg-slate-700 w-fit rounded">
                        <Minus />
                      </div>
                    ) : (
                      $(coin?.price)
                    )}
                  </TableCell>
                  <TableCell>
                    {coin?.volume < 1 ? (
                      <div className="p-1 bg-slate-700 w-fit rounded">
                        <Minus />
                      </div>
                    ) : (
                      $(coin?.volume)
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="p-1 bg-slate-700 w-fit rounded">
                      <Minus />
                    </div>
                  </TableCell>
                  <TableCell>{coin?.launchDate}</TableCell>
                  <TableCell>{coin?.votes}</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>
                    <Button
                      size="xs"
                      className="py-1 px-3 bg-[#4c3cce] hover:bg-[#6857f3] border-2 border-[#6857f3] text-white"
                    >
                      Vote
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination className="mt-5">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
    </>
  );
};

export default TrendingCoins;
