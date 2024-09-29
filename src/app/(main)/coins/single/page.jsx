"use client";
import React, { Suspense, useEffect, useState } from "react";
import { formatDate } from "../../news/_components/utils";
import { useSearchParams } from "next/navigation";
import PromotedCoins from "../../_components/promotedCoins";

const CoinDetailComponent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Access the 'id' query parameter
  const [coin, setCoin] = useState(null);
  const [moreCoins, setMoreCoins] = useState([]);

  useEffect(() => {
    const fetchMoreCoins = async () => {
      const data = await fetch(`/api/coins?limit=4`); // Await the fetching

      if (data.ok) {
        const coins = await data.json();
        setMoreCoins(coins.coins);
      }
    };
    fetchMoreCoins();

    if (id) {
      const fetchCoin = async () => {
        const data = await fetch(`/api/coins/single?id=${id}`); // Await the fetching

        if (data.ok) {
          setCoin(await data.json());
        }
      };
      fetchCoin();
    }
  }, [id]);

  const [isWatchlisted, setIsWatchlisted] = useState(false);

  const toggleWatchlist = () => {
    setIsWatchlisted(!isWatchlisted);
  };

  return (
    <main>
      <section className="container mx-auto max-w-[1366px]">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex w-full flex-col lg:w-3/4">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 mt-6 flex items-center text-xs font-normal"
            >
              <a
                className="text-violet-400 hover:text-violet-500 transition-colors capitalize"
                href="/"
              >
                home
              </a>
              <svg className="mx-1 mt-1 h-4 w-4">
                <use xlinkHref="#breadcrumb-arrow" />
              </svg>
              <a
                className="capitalize text-neutral-400 transition-colors hover:text-white"
                href="/coin/pepe-unchained-pepu"
              >
                {coin?.name}
              </a>
            </nav>
            <div className="items-center justify-center">
              <div className="flex items-center gap-2 md:flex md:justify-start md:gap-3 md:pl-0">
                <picture>
                  <source srcSet={coin?.logo} type="image/webp" />
                  <source srcSet={coin?.logo} type="image/png" />
                  <img
                    className="h-12 w-12 rounded"
                    src={coin?.logo}
                    alt={coin?.name}
                  />
                </picture>

                <div className="flex flex-col">
                  <div className="flex items-start gap-5">
                    <h1 className="text-sm font-bold text-white md:text-xl md:font-bold">
                      {coin?.name}
                    </h1>
                    <span className="flex-col items-center justify-center rounded-lg bg-teal-950 px-2.5 py-1.5 text-center text-xs text-emerald-300">
                      {coin?.symbol}
                    </span>
                  </div>
                  <div className="flex items-center justify-start gap-4 text-xs"></div>
                </div>
              </div>
              <div className="mt-2 flex gap-2 md:hidden">
                <button className="flex w-full items-center justify-center gap-1 rounded-md bg-panel-bg p-2 sm:gap-2">
                  <img src="/v3/socials/circles.svg" alt="Socials" />
                  <div className="text-xs font-medium text-white">Socials</div>
                  <svg className="h-3 w-3">
                    <use
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xlinkHref="#icon-arrow-bottom"
                    />
                  </svg>
                </button>
                <button className="flex w-full items-center justify-center gap-3 rounded-md bg-panel-bg p-2">
                  <img
                    alt="metamask logo"
                    loading="lazy"
                    width="22"
                    height="22"
                    decoding="async"
                    data-nimg="1"
                    src="/_next/static/media/metamask.9eeb7e72.svg"
                    style={{ color: "transparent" }}
                  />
                  <span className="text-xs font-medium text-white">
                    Add to MetaMask
                  </span>
                </button>
              </div>
              <div className="hidden mt-5 flex flex-wrap gap-2 md:flex">
                <a
                  className="flex items-center rounded bg-panel-bg px-2 py-3 text-xs font-light text-white transition-colors hover:bg-gray-500"
                  href="https://t.me/pepeunchained"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <img
                    className="mr-2 h-4 w-4"
                    src="/v3/socials/telegram.svg"
                    alt="Telegram logo"
                  />
                  <span>Telegram</span>
                </a>
                <a
                  className="flex items-center rounded bg-panel-bg px-2 py-3 text-xs font-light text-white transition-colors hover:bg-gray-500"
                  href="https://x.com/pepe_unchained"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <img
                    className="mr-2 h-4 w-4"
                    src="/v3/socials/twitter.svg"
                    alt="Twitter logo"
                  />
                  <span>Twitter</span>
                </a>
                <a
                  className="flex items-center rounded bg-panel-bg px-2 py-3 text-xs font-light text-white transition-colors hover:bg-gray-500"
                  href="http://www.pepeunchained.com/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <img
                    className="mr-2 h-4 w-4"
                    src="/v3/socials/web.svg"
                    alt="Website icon"
                  />
                  <span>Website</span>
                </a>
                <button className="flex items-center rounded bg-panel-bg px-2 py-3 text-xs font-light text-white transition-colors hover:bg-gray-500 3xs:hidden md:flex">
                  <img
                    alt="metamask logo"
                    loading="lazy"
                    width="22"
                    height="22"
                    decoding="async"
                    data-nimg="1"
                    className="mr-2"
                    src="/_next/static/media/metamask.9eeb7e72.svg"
                    style={{ color: "transparent" }}
                  />
                  <span>Add to MetaMask</span>
                </button>
              </div>
              <div className="mt-6 flex h-14 w-full items-center justify-between border-t border-stone-400 text-sm font-light text-neutral-400">
                <div>Launch Date</div>
                <div>{formatDate(coin?.launchDate)}</div>
              </div>
              <div className="flex h-20 w-full items-center justify-between gap-2 border-b border-t border-stone-400 text-sm font-light text-neutral-400 md:h-14">
                <div>{coin?.symbol}:</div>
                <div className="min-w-0 items-center md:flex md:min-w-[auto] md:gap-2">
                  <div className="truncate font-bold text-white">N/A</div>
                  <div className="mt-2 flex items-center gap-2 md:mt-0">
                    <button className="flex w-full items-center justify-center gap-1 rounded bg-violet-400/10 p-2 text-violet-400 transition-colors hover:bg-violet-400/20 md:w-auto">
                      <svg className="h-3 w-3">
                        <use
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          xlinkHref="#icon-copy"
                        />
                      </svg>
                      <span>Copy Link</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="md:mt-8 md:grid md:grid-cols-2 md:gap-2 lg:flex lg:w-full"></div>
              <div className="mt-12">
                <button className="mt-5 flex w-full items-center justify-center rounded-md bg-panel-bg p-4 text-sm font-bold text-white transition-colors hover:bg-gray-500">
                  Hide
                </button>
              </div>
              <div className="relative mt-8 overflow-hidden rounded-md bg-panel-bg p-5">
                <span>
                  Pepe Unchained. The future of meme coins. A Layer 2 blockchain
                  built for Speed, Security, Low Fees—and of course—Memes.
                </span>
              </div>
            </div>
            <div className="mt-6 w-full">
              <h2 className="mb-2 text-2xl font-bold text-white">More Coins</h2>
              <div className="grid grid-cols-2 items-center gap-2.5 md:grid-cols-3 2xl:grid-cols-6">
                {moreCoins?.length > 0 ? (
                  moreCoins?.map((coin) => (
                    <a className="w-full" href={`/coins/single?id=${coin?.id}`}>
                      <div className="flex w-full flex-col rounded-lg bg-panel-bg px-2 py-4 transition-colors hover:bg-gray-500">
                        <div className="flex w-full items-center gap-2.5">
                          <picture>
                            <source srcSet={coin?.logo} type="image/webp" />
                            <source srcSet={coin?.logo} type="image/png" />
                            <img
                              loading="lazy"
                              className="h-8 w-8 rounded"
                              src={coin?.logo}
                              alt={coin?.name}
                            />
                          </picture>
                          <span className="shrink text-xs font-normal text-white">
                            {coin?.name}
                          </span>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                          <div className="rounded bg-teal-950 p-1 text-xs font-normal text-emerald-300">
                            {coin?.symbol}
                          </div>
                        </div>
                      </div>
                    </a>
                  ))
                ) : (
                  <></>
                )}

                {/* Repeat similar structure for more coins */}
                {/* <a className="w-full" href="/coin/babydodge-on-sol-baby-dodge">
                  <div className="flex w-full flex-col rounded-lg bg-panel-bg px-2 py-4 transition-colors hover:bg-gray-500">
                    <div className="flex w-full items-center gap-2.5">
                      <picture>
                        <source
                          srcSet="https://cdn.coinmooner.com/logo/42674.webp?v=0"
                          type="image/webp"
                        />
                        <source
                          srcSet="https://cdn.coinmooner.com/logo/42674.png?v=0"
                          type="image/png"
                        />
                        <img
                          loading="lazy"
                          className="h-8 w-8 rounded"
                          src="https://cdn.coinmooner.com/logo/42674.png?v=0"
                          alt="Baby Dodge logo"
                        />
                      </picture>
                      <span className="shrink text-xs font-normal text-white">
                        Baby Dodge
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="rounded bg-teal-950 p-1 text-xs font-normal text-emerald-300">
                        solana
                      </div>
                    </div>
                  </div>
                </a>
                <a className="w-full" href="/coin/dogecoin-doge">
                  <div className="flex w-full flex-col rounded-lg bg-panel-bg px-2 py-4 transition-colors hover:bg-gray-500">
                    <div className="flex w-full items-center gap-2.5">
                      <picture>
                        <source
                          srcSet="https://cdn.coinmooner.com/logo/42678.webp?v=0"
                          type="image/webp"
                        />
                        <source
                          srcSet="https://cdn.coinmooner.com/logo/42678.png?v=0"
                          type="image/png"
                        />
                        <img
                          loading="lazy"
                          className="h-8 w-8 rounded"
                          src="https://cdn.coinmooner.com/logo/42678.png?v=0"
                          alt="Dogecoin logo"
                        />
                      </picture>
                      <span className="shrink text-xs font-normal text-white">
                        Dogecoin
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="rounded bg-teal-950 p-1 text-xs font-normal text-emerald-300">
                        solana
                      </div>
                    </div>
                  </div>
                </a>
                <a className="w-full" href="/coin/pepe-unchained-pepu">
                  <div className="flex w-full flex-col rounded-lg bg-panel-bg px-2 py-4 transition-colors hover:bg-gray-500">
                    <div className="flex w-full items-center gap-2.5">
                      <picture>
                        <source
                          srcSet="https://cdn.coinmooner.com/logo/42683.webp?v=0"
                          type="image/webp"
                        />
                        <source
                          srcSet="https://cdn.coinmooner.com/logo/42683.png?v=0"
                          type="image/png"
                        />
                        <img
                          loading="lazy"
                          className="h-8 w-8 rounded"
                          src="https://cdn.coinmooner.com/logo/42683.png?v=0"
                          alt="Pepe Unchained logo"
                        />
                      </picture>
                      <span className="shrink text-xs font-normal text-white">
                        Pepe Unchained
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="rounded bg-teal-950 p-1 text-xs font-normal text-emerald-300">
                        solana
                      </div>
                    </div>
                  </div>
                </a> */}
              </div>
            </div>

            <div className="my-8">
              <h2 class="mb-2 text-2xl font-bold text-white">Promoted Coins</h2>
              <PromotedCoins />
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/4">
            <div className="mt-10 flex flex-col gap-4">
              <div className="w-full rounded-lg bg-panel-bg p-5">
                <div className="text-sm font-bold leading-snug text-white">
                  Coin Rank
                </div>
                <div className="my-3 flex justify-between">
                  <span className="text-xs font-medium text-neutral-400">
                    Overall rank
                  </span>
                  <span className="text-xs font-medium text-white">38</span>
                </div>
                <div className="my-3 flex justify-between">
                  <span className="text-xs font-medium text-neutral-400">
                    Daily rank
                  </span>
                  <span className="text-xs font-medium text-white">44000</span>
                </div>
                <div className="my-3 flex items-center justify-between">
                  <div className="flex flex-col justify-center text-center text-xs font-medium text-neutral-400">
                    <div className="mb-2 text-2xl font-bold text-white">
                      250265
                    </div>
                    <p>Total Votes</p>
                  </div>
                  <div className="flex flex-col justify-center text-center text-xs font-medium text-neutral-400">
                    <div className="mb-2 text-2xl font-bold text-white">-2</div>
                    <p>Votes Today</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="border-2 bg-mediumslateblue-200 border-purple-100 hover:bg-purple-100 active:bg-purple-200 transition-colors rounded-md text-white px-4 py-1 w-24"
                  >
                    Vote
                  </button>
                </div>
                <div className="mt-2.5 text-center text-xs font-medium text-neutral-400">
                  You can vote once a day
                </div>
              </div>

              <div className="flex w-full flex-col gap-3 rounded-lg bg-panel-bg p-5">
                <div className="my-3 flex items-center justify-between">
                  <div className="flex flex-col items-center gap-2 text-center text-xs font-medium text-neutral-400">
                    <p>Add to watchlist</p>
                    <button
                      type="button"
                      className="h-8 w-14 rounded-full bg-gray-300 p-1 bg-gray-200"
                      onClick={toggleWatchlist}
                    >
                      <div className="h-6 w-6 rounded-full bg-white transition-transform duration-300">
                        <svg className="h-6 w-6 text-gray-200">
                          <use xlinkHref="#eye-hide"></use>
                        </svg>
                      </div>
                    </button>
                  </div>
                  <div className="flex flex-col justify-center text-center text-xs font-medium text-neutral-400">
                    <p>Watchlisted</p>
                    <div className="text-2xl font-bold text-white">6</div>
                    <p>times</p>
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col gap-4 rounded-lg bg-panel-bg p-5">
                <div className="text-sm font-bold text-white">Safety</div>
                <div className="flex w-full items-center justify-between text-xs font-medium text-neutral-400">
                  <div>Audit:</div>
                  <span>Audit not provided</span>
                </div>
                <div className="flex w-full items-center justify-between text-xs font-medium text-neutral-400">
                  <div>KYC:</div>
                  <span>KYC not provided</span>
                </div>
                <div className="flex h-16 items-center justify-between rounded-md bg-gray-500 bg-opacity-40 p-2">
                  <a
                    href="https://bscheck.eu/ethereum/N/A"
                    className="flex flex-col"
                    target="_blank"
                    rel="noreferrer nofollow noopener"
                  >
                    <span className="text-xs text-stone-400">
                      No Report - Click to generate
                    </span>
                    <p className="text-[10px] font-normal text-neutral-400">
                      Powered by BSC check
                    </p>
                  </a>
                  <img
                    height="18"
                    width="60"
                    src="/partners/bsccheck.png"
                    alt="bsccheck.eu"
                  />
                </div>
                <div className="flex h-16 items-center justify-between rounded-md bg-gray-500 bg-opacity-40 p-2">
                  <a
                    className=""
                    target="_blank"
                    rel="noreferrer nofollow noopener"
                    href="https://tools.staysafu.org/scan?a=N/A"
                  >
                    <span className="text-xs text-stone-400">No Result</span>
                    <p className="text-[10px] font-normal text-neutral-400">
                      Powered By StaySafu
                    </p>
                  </a>
                  <img height="32" width="32" src="/v3/staysafu.png" alt="" />
                </div>
              </div>

              <div className="flex w-full flex-col gap-4 rounded-lg bg-panel-bg p-5">
                <div className="text-sm font-bold text-white">Charts</div>
                <div className="flex flex-col gap-2 md:grid md:grid-cols-2 lg:flex lg:flex-col"></div>
              </div>

              <div className="flex w-full flex-col gap-4 rounded-lg bg-panel-bg p-5">
                <div className="text-sm font-bold text-white">Markets</div>
                <div className="flex flex-col gap-4 md:flex md:flex-row md:justify-between lg:flex lg:flex-col lg:gap-4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const CoinDetail = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CoinDetailComponent />
  </Suspense>
);

export default CoinDetail;
