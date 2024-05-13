import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { SpecialMenuSwiper } from "./swipers";
import { isEmpty } from "lodash";
import { leafHomeImg, onionHomeImg } from "@/assets/data";
import { imgEmptySpecialMenu } from "@/assets/data";
import { cn, t } from "@/utils";
import type { CategoryTypeAPI, SpecialMenuType } from "@/types/food";
import { useGetListFoodSpecialMenu, useMenu } from "@/services/services";
import { Image } from "antd";

const SpecialMenu = () => {
  const [selectIdSpecialMenu, setSelectIdSpecialMenu] = useState(1);
  const { data: queryMenu } = useMenu();
  const { data: listFoodSpecialMenu, refetch: callApiListFoodSpecialMenu } =
    useGetListFoodSpecialMenu(selectIdSpecialMenu);
  useEffect(() => {
    callApiListFoodSpecialMenu();
  }, [selectIdSpecialMenu]);

  const handleSelectSpecialMenu = async (idSpecialMenu: number) => {
    setSelectIdSpecialMenu(idSpecialMenu);
  };

  return (
    <section className="py-6 lg:py-16">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-4 lg:gap-10">
          <div>
            <div>
              <span className="mb-6 inline-flex rounded-full bg-primary/20 px-4 py-2 text-sm text-primary">
                Menu
              </span>
              <h2 className="mb-6 text-3xl font-semibold text-default-900">
                {t("specialMenu")}
              </h2>
            </div>
            <div className="flex w-full flex-wrap">
              <div className="custom-scroll -mx-4 h-auto w-screen overflow-auto px-2 lg:mx-0 lg:h-[30rem] lg:w-full">
                <nav
                  className="flex gap-2 lg:flex-col"
                  aria-label="Tabs"
                  role="tablist"
                  data-hs-tabs-vertical="true"
                >
                  {!isEmpty(queryMenu?.data) &&
                    queryMenu?.data?.map((category: SpecialMenuType) => (
                      <button
                        type="button"
                        role="tab"
                        key={category.id}
                        className={cn(
                          "flex p-1",
                          selectIdSpecialMenu == category.id && "active"
                        )}
                        id={category.categoryName + "-menu-toggle"}
                        data-hs-tab={"#" + category.categoryName + "-menu"}
                        aria-controls={category.categoryName + "-menu"}
                        onClick={() => {
                          handleSelectSpecialMenu(category.id);
                        }}
                      >
                        <span className="flex w-full items-center justify-start gap-4 rounded-full p-2 pe-6 text-default-900 transition-all hover:text-primary hs-tab-active:bg-primary xl:w-2/3">
                          <div>
                            <span className="inline-flex h-14 w-14 grow items-center justify-center rounded-full hs-tab-active:bg-white">
                              <img
                                src={category?.urlImageCategory}
                                height={32}
                                width={32}
                                className="h-8 w-8"
                                alt="category-img"
                              />
                            </span>
                          </div>
                          <span className="shrink text-base font-medium hs-tab-active:text-white">
                            {category.categoryName}
                          </span>
                        </span>
                      </button>
                    ))}
                </nav>
              </div>
            </div>
          </div>
          {!isEmpty(listFoodSpecialMenu?.data) ? (
            <div className="lg:col-span-3">
              <div className="relative lg:mt-24">
                <div className="absolute -top-14 end-15 hidden items-center gap-1 lg:flex">
                  <div className="special-menu-left flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-primary transition-all after:hidden after:content-[]">
                    <FaAngleLeft className="!h-4 !w-4 text-white" />
                  </div>
                  <div className="special-menu-right flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-primary text-white transition-all after:hidden after:content-[]">
                    <FaAngleRight className="!h-4 !w-4 text-white" />
                  </div>
                </div>

                <div className="rounded-lg bg-primary/10 lg:pb-16">
                  <div className="p-4 lg:p-6">
                    {!isEmpty(queryMenu?.data) &&
                      queryMenu?.data?.map((category: CategoryTypeAPI) => {
                        return (
                          <div
                            key={category.id}
                            id={category.categoryName + "-menu"}
                            role="tabpanel"
                            aria-labelledby="pizza-menu-item"
                            className={cn(
                              selectIdSpecialMenu != category.id && "hidden"
                            )}
                          >
                            <div className="grid grid-cols-1">
                              {!isEmpty(listFoodSpecialMenu?.data) && (
                                <SpecialMenuSwiper
                                  dishes={listFoodSpecialMenu?.data ?? []}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="hidden lg:flex">
                  <div className="swiper-pagination !bottom-12 !start-0" />
                  <span className="absolute bottom-0 start-1/4 z-10">
                    <img src={onionHomeImg} alt="onion" />
                  </span>
                  <span className="absolute -bottom-12 -end-0 z-10">
                    <img src={leafHomeImg} alt="leaf" />
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <Image
              src={imgEmptySpecialMenu}
              alt="empty-special-menu"
              width={1118}
              height={664.69}
              preview={false}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default SpecialMenu;
