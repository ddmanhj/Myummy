import React, { useMemo } from "react";
import { FaStar } from "react-icons/fa6";
import {
  circleLineHomeImg,
  logoMyummy,
  arrowHomeImg,
  avatar1Img,
  avatar2Img,
  avatar3Img,
  burger1IconCategoryImg,
} from "@/assets/data/images";
import videoLoopHomepage from "@/assets/images/videos/homepage.mp4";
import { LuClock3 } from "react-icons/lu";

const videoHomepage = () => {
  return (
    <>
      <section className="relative py-6 lg:py-16">
        <div className="absolute inset-0 bg-gradient-to-l from-orange-600/20 via-orange-600/5 to-orange-600/0 blur-[60px]" />
        <div className="container relative">
          <div className="grid items-center lg:grid-cols-2">
            <div className="px-10 py-20">
              <div className="z-10 order-last flex items-center justify-center lg:order-first lg:justify-start">
                <div className="text-center lg:text-start">
                  <span className="mb-8 inline-flex rounded-full bg-primary/20 px-4 py-2 text-sm text-primary lg:mb-2">
                    #Special Food 🍇
                  </span>
                  <div className="mb-5 text-3xl font-bold capitalize text-default-950 md:text-5xl/snug lg:text-6xl/normal">
                    We Offer&nbsp;
                    <span className="relative inline-flex">
                      <span>Delicious</span>
                      <img
                        src={circleLineHomeImg}
                        width={282}
                        height={90}
                        alt="circle"
                        className="absolute -z-10 hidden h-full w-full lg:flex"
                      />
                    </span>
                    <span className="text-primary">Food</span> And Quick Service
                  </div>
                  <p className="mx-auto mb-8 text-lg font-medium text-default-700 md:max-w-md lg:mx-0">
                    Imagine you don’t need a diet because we provide healthy and
                    delicious food for you!.
                  </p>

                  <div className="mt-14">
                    <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                      <div className="flex items-center -space-x-1">
                        <div className="h-12 w-12">
                          <img
                            src={avatar1Img}
                            alt="avatar"
                            height={48}
                            width={48}
                            className="h-full w-full rounded-full object-cover object-center ring ring-default-50"
                          />
                        </div>
                        <div className="h-12 w-12">
                          <img
                            src={avatar2Img}
                            alt="avatar"
                            height={48}
                            width={48}
                            className="h-full w-full rounded-full object-cover object-center ring ring-default-50"
                          />
                        </div>
                        <div className="h-12 w-12">
                          <img
                            src={avatar3Img}
                            alt="avatar"
                            height={48}
                            width={48}
                            className="h-full w-full rounded-full object-cover object-center ring ring-default-50"
                          />
                        </div>
                      </div>
                      <div>
                        <h1 className="text-base font-medium text-default-800">
                          Our Happy Customers
                        </h1>
                        <p className="text-base text-default-900">
                          <FaStar
                            size={16}
                            className="inline fill-yellow-400 text-yellow-400"
                          />{" "}
                          4.7{" "}
                          <span className="text-sm text-default-500">
                            (13.7k Reviews)
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex items-center justify-center py-20">
              <span className="absolute start-0 top-0 -rotate-[40deg] text-3xl">
                🔥
              </span>
              <span className="absolute end-[10%] top-0 inline-flex h-14 w-14 -rotate-12 items-center justify-center rounded-lg bg-yellow-400 text-white">
                <LuClock3 size={24} />
              </span>
              <span className="absolute end-0 top-1/4 inline-flex h-4 w-4 -rotate-12 items-center justify-center rounded bg-primary text-white" />
              <div className="absolute -end-0 bottom-1/4 hidden md:block lg:hidden xl:block 2xl:-end-24">
                <img src={arrowHomeImg} alt="arrow" height={169} width={84} />
                <div className="flex items-center gap-2 rounded-full bg-default-50 p-2 pe-6 shadow-lg">
                  <img
                    src={avatar1Img}
                    className="h-16 w-16 rounded-full"
                    alt="avatar"
                  />
                  <div>
                    <h6 className="text-sm font-medium text-default-900">
                      Jakob Culhane
                    </h6>
                    <p className="text-[10px] font-medium text-default-900">
                      Healthy and Delicious Food
                    </p>
                    <span className="inline-flex gap-0.5">
                      <FaStar
                        size={12}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <FaStar
                        size={12}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <FaStar
                        size={12}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <FaStar
                        size={12}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <FaStar
                        size={12}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    </span>
                  </div>
                </div>
              </div>
              <span className="absolute bottom-0 end-0 inline-flex h-4 w-4 -rotate-12 items-center justify-center rounded-full bg-primary text-white" />
              <span className="absolute -bottom-16 end-1/3 text-3xl">🔥</span>
              <div className="absolute bottom-0 start-0">
                <div className="flex items-center gap-2 rounded-full bg-default-50 p-2 pe-6 shadow-lg">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                    <img
                      src={burger1IconCategoryImg}
                      alt="burger"
                      className="h-10 w-10 rounded-full"
                    />
                  </span>
                  <div>
                    <h6 className="text-sm font-medium text-default-900">
                      MCD Veg Burger
                    </h6>
                    <span className="inline-flex gap-0.5">
                      <FaStar
                        size={12}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <FaStar
                        size={12}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <FaStar
                        size={12}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <FaStar
                        size={12}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <FaStar
                        size={12}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    </span>
                    <h6 className="text-sm font-medium text-default-900">
                      <span className="text-sm text-primary">$</span> 8.14
                    </h6>
                  </div>
                </div>
              </div>

              <video
                src={videoLoopHomepage}
                width={600}
                height={600}
                loop
                autoPlay
                className="mx-auto"
              />
              {/* <img
                src={logoMyummy}
                width={497}
                height={537}
                alt="logoMyummy"
                className="mx-auto"
              /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default videoHomepage;
