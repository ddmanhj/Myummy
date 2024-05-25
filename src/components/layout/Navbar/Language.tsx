import { useState } from "react";
import i18next from "i18next";
import { vietnamImg, usaImg } from "@/assets/data/images";

const Language = () => {
  const [language, setLanguage] = useState(localStorage.getItem("i18nextLng"));
  const handleViChangeLanguage = () => {
    setLanguage("vi");
    i18next.changeLanguage("vi");
  };
  const handleEngChangeLanguage = () => {
    setLanguage("en");
    i18next.changeLanguage("en");
  };
  return (
    <div className="hs-dropdown relative inline-flex [--placement:bottom] [--trigger:hover]">
      <button className="hs-dropdown-toggle relative flex items-center text-base after:absolute after:inset-0 hover:after:-bottom-10">
        <img
          alt="Image"
          height={14}
          width={21}
          className="me-3 h-3.5"
          src={language == "vi" ? vietnamImg : usaImg}
        />
        <span className="text-xs font-medium">
          {language == "vi" ? "Tiếng việt" : "English"}
        </span>
      </button>
      <div className="hs-dropdown-menu z-50 mt-4 hidden min-w-[140px] rounded-lg border border-default-100 bg-white p-1.5 opacity-0 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:bg-default-50">
        <ul className="flex flex-col gap-1">
          <li>
            <button
              onClick={handleViChangeLanguage}
              className="flex w-full items-center gap-2 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
            >
              <img
                src={vietnamImg}
                height={16}
                width={24}
                alt="flag"
                className="h-4"
              />{" "}
              Tiếng việt
            </button>
          </li>
          <li>
            <button
              onClick={handleEngChangeLanguage}
              className="flex w-full items-center gap-2 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
            >
              <img
                src={usaImg}
                height={16}
                width={24}
                alt="flag"
                className="h-4"
              />
              English
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Language;
