import { lazy } from "react";
import {
  avatar1Img,
  avatar2Img,
  avatar3Img,
  aboutUsHomeImg,
  cupIconImg,
  vegetablesIconImg,
  truckIconImg,
  testimonialHomeImg,
} from "@/assets/data/images";
import { consumerReviews } from "@/assets/data";

import { PageTitle } from "@/components";
import { useTranslation } from "react-i18next";
const TestimonialsSwiper = lazy(
  () => import("@/components/swipers/TestimonialsSwiper")
);
const SpecialMenu = lazy(() => import("@/components/SpecialMenu"));
const VideoHomePage = lazy(() => import("./videoHomepage.tsx"));

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageTitle title="Home" />

      <VideoHomePage />

      <SpecialMenu />

      <section className="py-6 lg:py-16">
        <div className="container">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-default-500/5">
                <img
                  src={aboutUsHomeImg}
                  alt="about-us-pizza"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div>
              <span className="mb-6 inline-flex rounded-full bg-primary/20 px-4 py-2 text-sm text-primary">
                {t("about us")}
              </span>
              <h2 className="mb-6 max-w-xl text-3xl font-semibold text-default-900">
                {t("aboutUsHeading")}
              </h2>
              <p className="mb-16 max-w-2xl font-medium text-default-500 xl:mb-20">
                It’s the perfect dining experience where every dish is crafted
                with fresh, high-quality ingredients and served by friendly
                staff who go.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-md border border-default-100 bg-transparent shadow-lg transition-all duration-200 hover:border-primary">
                  <div className="p-6">
                    <div className="mb-6">
                      <img
                        src={cupIconImg}
                        width={48}
                        height={48}
                        alt="service-img"
                      />
                    </div>
                    <h3 className="mb-6 text-xl font-medium text-default-900">
                      Fast Foods
                    </h3>
                    <p className="text-base text-default-500">
                      Healthy Foods are nutrient-Dense Foods
                    </p>
                  </div>
                </div>
                <div className="rounded-md border border-default-100 bg-transparent shadow-lg transition-all duration-200 hover:border-primary">
                  <div className="p-6">
                    <div className="mb-6">
                      <img
                        src={vegetablesIconImg}
                        width={48}
                        height={48}
                        alt="service-img"
                      />
                    </div>
                    <h3 className="mb-6 text-xl font-medium text-default-900">
                      Healthy Foods
                    </h3>
                    <p className="text-base text-default-500">
                      Healthy Foods are nutrient-Dense Foods
                    </p>
                  </div>
                </div>
                <div className="rounded-md border border-default-100 bg-transparent shadow-lg transition-all duration-200 hover:border-primary">
                  <div className="p-6">
                    <div className="mb-6">
                      <img
                        src={truckIconImg}
                        width={48}
                        height={48}
                        alt="service-img"
                      />
                    </div>
                    <h3 className="mb-6 text-xl font-medium text-default-900">
                      Fast Delivery
                    </h3>
                    <p className="text-base text-default-500">
                      Healthy Foods are nutrient-Dense Foods
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                <div className="flex items-center gap-2">
                  <img
                    src={avatar3Img}
                    height={48}
                    width={48}
                    className="h-12 w-12 rounded-full"
                    alt="avatar"
                  />
                  <div>
                    <h6 className="text-base font-medium text-default-900">
                      Marley Culhane
                    </h6>
                    <p className="text-sm font-medium text-default-500">
                      Founder CEO
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 lg:py-16">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <div>
              <div className="relative">
                <img
                  src={testimonialHomeImg}
                  className="mx-auto lg:mx-0"
                  alt="testimonial"
                />
                <div className="absolute -bottom-10 end-20">
                  <div className="rounded-xl bg-white shadow-lg dark:bg-default-100">
                    <div className="p-6">
                      <h6 className="mb-2 text-base font-semibold text-default-900">
                        Our Reviewers
                      </h6>
                      <div className="flex items-center justify-center -space-x-1">
                        <div className="h-12 w-12">
                          <img
                            src={avatar1Img}
                            className="h-full w-full rounded-full object-cover object-center ring ring-default-100"
                            alt="avatar"
                          />
                        </div>
                        <div className="h-12 w-12">
                          <img
                            src={avatar2Img}
                            className="h-full w-full rounded-full object-cover object-center ring ring-default-100"
                            alt="avatar"
                          />
                        </div>
                        <div className="h-12 w-12">
                          <img
                            src={avatar3Img}
                            className="h-full w-full rounded-full object-cover object-center ring ring-default-100"
                            alt="avatar"
                          />
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-primary font-medium text-default-50 ring ring-default-100">
                          <span className="text-base"> 12K </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <TestimonialsSwiper reviews={consumerReviews} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
