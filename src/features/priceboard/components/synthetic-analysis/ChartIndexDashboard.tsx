import { useEffect, useRef, useState } from "react";
import { CiCircleChevRight } from "react-icons/ci";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ID_HNX, ID_HOSE, ID_UPCOM, ID_VN30 } from "../../../../configs";
import { useAppSelector } from "../../../../store/hook";
import { selectMajorIndices } from "../../../../store/slices/stock/selector";
import ChartIndexDashboardSkeleton from "./ChartIndexDashboardSkeleton";
import ChartIndexInfo from "./ChartIndexInfo";
import ChartRender from "./ChartRender";

export default function ChartIndexDashboard() {
  const swiperRef = useRef<SwiperType | null>(null);

  const { vnIndex, vn30Index, hnxIndex, upcomIndex } =
    useAppSelector(selectMajorIndices);

  const indicesList = [
    { key: ID_VN30, symbol: "VN30INDEX", label: "VN30", data: vn30Index },
    { key: ID_HOSE, symbol: "VNINDEX", label: "VN-Index", data: vnIndex },
    { key: ID_HNX, symbol: "HNXINDEX", label: "HNX", data: hnxIndex },
    { key: ID_UPCOM, symbol: "UPCOMINDEX", label: "UPCOM", data: upcomIndex },
  ].filter(
    (
      item,
    ): item is {
      key: string;
      symbol: string;
      label: string;
      data: NonNullable<typeof item.data>;
    } => !!item.data,
  );

  // State để biết hiện tại đang hiển thị bao nhiêu slide (theo breakpoint)
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [canNavigate, setCanNavigate] = useState(false);

  // Cập nhật slidesPerView và kiểm tra có cần nút không
  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      let currentSPV = 1;

      if (width >= 1440) currentSPV = 4;
      else if (width >= 1024) currentSPV = 2;
      else currentSPV = 1;

      setSlidesPerView(currentSPV);
      setCanNavigate(indicesList.length > currentSPV);
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, [indicesList.length]);

  const handleSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;

    // Cập nhật lại khi Swiper tự động thay đổi slidesPerView
    const updateCanNavigate = () => {
      if (swiper.params.slidesPerView === "auto") return;
      const spv =
        typeof swiper.params.slidesPerView === "number"
          ? swiper.params.slidesPerView
          : swiper.currentBreakpoint
            ? swiper.slidesPerViewDynamic()
            : 1;

      setCanNavigate(indicesList.length > spv);
    };

    swiper.on("breakpoint", updateCanNavigate);
    swiper.on("slidesLengthChange", updateCanNavigate);
    updateCanNavigate();
  };

  const showNavigation = canNavigate;

  return (
    <div className="w-full h-full relative">
      <Swiper
        spaceBetween={8}
        modules={[Navigation]}
        pagination={{ clickable: true }}
        loop={indicesList.length > slidesPerView} // chỉ loop khi đủ slide
        breakpoints={{
          0: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
          1440: { slidesPerView: 4 },
        }}
        className="w-full h-full"
        onSwiper={handleSwiperInit}
      >
        {indicesList.length === 0
          ? [...Array(4)].map((_, i) => (
              <SwiperSlide key={i}>
                <ChartIndexDashboardSkeleton />
              </SwiperSlide>
            ))
          : indicesList.map(({ key, symbol, data }) => (
              <SwiperSlide key={key}>
                <div className="flex flex-row gap-3 items-center w-full h-full bg-surface rounded">
                  <ChartIndexInfo dataIndex={data} />
                  <div className="w-3/5 h-full rounded">
                    <ChartRender
                      openIndex={data?.openIndex || 0}
                      symbol={symbol}
                      dataIndex={data}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>

      {/* Nút Next */}
      {showNavigation && (
        <>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-9 w-9 h-9 rounded-full bg-background-primary transition-all flex items-center justify-center backdrop-blur-sm"
            aria-label="Next slide"
          >
            <CiCircleChevRight className="w-7 h-7 text-text-title" />
          </button>

          {/* <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 transition-all flex items-center justify-center backdrop-blur-sm rotate-180"
            aria-label="Previous slide"
          >
            <CiCircleChevRight className="w-8 h-8 text-white" />
          </button> */}
        </>
      )}
    </div>
  );
}
