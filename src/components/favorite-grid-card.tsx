"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click";
import { useFavoriteStore } from "../store/favoriteStore";

export function FavoriteGridCard() {
  const [active, setActive] = useState<FavoriteProduct | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  const { favorites, fetchFavorites } = useFavoriteStore();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {/* 모달 백그라운드 */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      {/* 모달 내용 */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.productId}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.productId}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src="https://via.placeholder.com/150?text=Product"
                  alt={active.name}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.productId}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.name}
                    </motion.h3>
                    <motion.p
                      layoutId={`price-${active.productId}-${id}`}
                      className="font-medium text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      ₩{active.price}
                    </motion.p>
                  </div>
                  <motion.p
                    layoutId={`status-${active.productId}-${id}`}
                    className="px-4 py-1 text-sm rounded-full font-bold bg-blue-500 text-white"
                  >
                    {active.status}
                  </motion.p>
                </div>

                <div className="pt-4 px-4">
                  <motion.p
                    layoutId={`description-${active.productId}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base"
                  >
                    {active.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 좋아요 내역 그리드 */}
      <ul className="mx-auto w-[80%] grid grid-cols-2 md:grid-cols-2 items-start gap-4">
        {(favorites || []).map((card) => (
          <motion.div
            layoutId={`card-${card.productId}-${id}`}
            key={card.productId}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div layoutId={`image-${card.productId}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src="https://via.placeholder.com/150?text=Favorite"
                  alt={card.name}
                  className="h-60 w-full rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex flex-col items-center">
                <motion.h3
                  layoutId={`title-${card.productId}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center text-base"
                >
                  {card.name}
                </motion.h3>
                <motion.p
                  layoutId={`price-${card.productId}-${id}`}
                  className="font-medium text-neutral-600 dark:text-neutral-400 text-center text-base"
                >
                  ₩{card.price}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
