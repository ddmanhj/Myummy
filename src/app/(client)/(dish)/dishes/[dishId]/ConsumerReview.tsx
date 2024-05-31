import { useEffect, useState } from "react";
import { FaCircle, FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { Input } from "antd";
import openSocket from "socket.io-client";
import { checkTimeAgo, cn, expToken, postCommentReviewSchema } from "@/utils";
import { consumerReviews } from "@/assets/data";
import StarRating from "@/components/StarRating";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty } from "lodash";
import {
  PostCommentReviewType,
  SchemaPostCommentReviewType,
} from "@/types/other";
import { useSelector } from "react-redux";
import { getCustomer } from "@/redux/customerSlice";
import { useParams } from "react-router-dom";
import { useGetReviewFood, usePostReview } from "@/services/services";
import { ProductPagination } from "@/components";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;
const socket = openSocket(`${import.meta.env.VITE_DOMAIN_BACKEND}`);

const ConsumerReview = ({ setReviewCount }: any) => {
  const { dishId } = useParams();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SchemaPostCommentReviewType>({
    resolver: yupResolver(postCommentReviewSchema),
    defaultValues: { review: "", star: 0 },
  });

  const [currentPage, setCurrentPage] = useState({
    page: 1,
    limit: 10,
  });
  const [dataReview, setDataReview] = useState<PostCommentReviewType[]>([]);

  const session = expToken();
  const customerData = useSelector(getCustomer);
  const mutationPostReview = usePostReview();
  const {
    data: getReviewConsumerFood,
    refetch: callAPIReviewConsumerFood,
    isSuccess: doneReview,
  } = useGetReviewFood(Number(dishId), currentPage?.page, currentPage?.limit);
  // API hiển thị bình luận
  useEffect(() => {
    const fetchData = async () => {
      await callAPIReviewConsumerFood();
      setReviewCount(getReviewConsumerFood?.data?.count);
    };
    fetchData();
  }, [currentPage, dishId]);

  // Set state khi API gọi thành công
  useEffect(() => {
    if (doneReview) {
      setDataReview(getReviewConsumerFood?.data?.rows);
      setReviewCount(getReviewConsumerFood?.data?.count);
    }
  }, [doneReview, getReviewConsumerFood]);

  // Nếu ở trang 1 thì gọi API khi trang 1 quá 10 bình luận để cập nhật pagination
  useEffect(() => {
    if (dataReview?.length > 20) {
      const fetchData = async () => {
        await callAPIReviewConsumerFood();
        setReviewCount(getReviewConsumerFood?.data?.count);
      };
      fetchData();
    }
  }, [dataReview]);

  // Socket nhận bình luận mới
  useEffect(() => {
    const handleNewPost = (data: any) => {
      setDataReview((prev) => [data?.post, ...prev]);
    };

    socket.on("posts", handleNewPost);

    // Cleanup khi component unmount
    return () => {
      socket.off("posts", handleNewPost);
    };
  }, [socket]);

  // Reset form khi post bình luận thành công
  useEffect(() => {
    if (mutationPostReview.isSuccess) {
      reset();
    }
  }, [mutationPostReview.isSuccess]);

  const handleSubmitConsumerReview = async (values: PostCommentReviewType) => {
    const { review, star } = values;
    const post = {
      review,
      star,
      dishID: Number(dishId),
      customerID: customerData.id,
      customerName: customerData.customerName,
    };
    mutationPostReview.mutate(post);
    //
  };

  return (
    <>
      <h4 className="text-base font-medium text-default-800">
        {t("consumerRatings")}
      </h4>

      <div className="my-5">
        {session && !isEmpty(customerData) && (
          <form onSubmit={handleSubmit(handleSubmitConsumerReview)}>
            <div className="flex col-span-2 gap-10 mobile:gap-5">
              <div className="w-full">
                <Controller
                  name="review"
                  control={control}
                  render={({ field }) => (
                    <TextArea
                      showCount
                      maxLength={1000}
                      onChange={(
                        e: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >
                      ) => field.onChange(e.target.value)}
                      placeholder="your comment here...."
                      style={{ height: 120 }}
                      value={field.value}
                    />
                  )}
                />
                {!isEmpty(errors?.review) && (
                  <p className="text-red-500 text-sm">
                    {errors?.review?.message}&nbsp;*
                  </p>
                )}
              </div>

              <div className="content-center">
                <button
                  type="submit"
                  className="relative z-10 inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-center text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-primary-500 lg:w-auto"
                >
                  Post
                </button>
              </div>
            </div>
            <div className="my-3">
              <Controller
                name="star"
                control={control}
                render={({ field }) => (
                  <StarRating
                    maxRating={5}
                    size={24}
                    onSetRating={field}
                    doneAPI={mutationPostReview?.isSuccess}
                  />
                )}
              />
              {!isEmpty(errors?.star) && (
                <p className="text-red-500 text-sm">
                  {errors?.star?.message}&nbsp;*
                </p>
              )}
            </div>
          </form>
        )}
      </div>

      {dataReview?.map((review: PostCommentReviewType, idx: number) => (
        <div
          key={review?.id}
          className={cn(
            "py-5",
            consumerReviews.length !== idx + 1 && "border-b border-default-200"
          )}
        >
          <div className="mb-3 flex items-center">
            <img
              src={review?.customer?.urlImageAvatar}
              alt="avatar"
              height={48}
              width={48}
              className="me-4 h-12 w-12 rounded-full"
            />
            <div>
              <div className="mb-2 flex items-center gap-2">
                <h4 className="text-sm font-medium text-default-800">
                  {review?.customer?.customerName}
                </h4>
                <FaCircle size={5} className="text-default-400" />
                <h4 className="text-sm font-medium text-default-400">
                  {review?.createdAt && checkTimeAgo(review?.createdAt ?? "")}
                </h4>
              </div>
              <div className="flex gap-1.5">
                {Array.from(new Array(Math.floor(review?.star))).map(
                  (_val, idx) => (
                    <FaStar key={idx} className="text-base text-yellow-400" />
                  )
                )}
                {!Number.isInteger(review.star) && (
                  <FaStarHalfStroke size={18} className="text-yellow-400" />
                )}
                {review.star < 5 &&
                  Array.from(new Array(5 - Math.ceil(review.star))).map(
                    (_val, idx) => (
                      <FaStar
                        key={idx}
                        size={16}
                        className="text-default-200"
                      />
                    )
                  )}
              </div>
            </div>
          </div>
          <p className="text-default-600">{review.review}</p>
        </div>
      ))}

      {dataReview?.length > 0 && (
        <div className="custom-pagination">
          <ProductPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItem={getReviewConsumerFood?.data?.count ?? 0}
          />
        </div>
      )}
    </>
  );
};

export default ConsumerReview;
