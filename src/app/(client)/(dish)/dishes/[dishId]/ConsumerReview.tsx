import { useEffect, useState } from "react";
import { FaCircle, FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { Input } from "antd";
import openSocket from "socket.io-client";
import { cn, expToken, postCommentReviewSchema } from "@/utils";
import { consumerReviews } from "@/assets/data";
import StarRating from "@/components/StarRating";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty } from "lodash";
import { PostCommentReview } from "@/types/other";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { getCustomer } from "@/redux/customerSlice";

const { TextArea } = Input;

const ConsumerReview = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCommentReview>({
    resolver: yupResolver(postCommentReviewSchema),
  });

  const session = expToken();
  const customerData = useSelector(getCustomer);

  const [currentPage, setCurrentPage] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    openSocket(`${import.meta.env.VITE_DOMAIN_BACKEND}`);
  }, []);

  const handleSubmitConsumerReview = async (values: PostCommentReview) => {
    console.log("🚀 ~ handleSubmitConsumerReview ~ values:", values);
    // Call API cập nhật
  };

  return (
    <>
      <h4 className="text-base font-medium text-default-800">
        Consumer Review
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
                  <StarRating maxRating={5} size={24} onSetRating={field} />
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

      {consumerReviews.map((review, idx) => (
        <div
          key={review.id}
          className={cn(
            "py-5",
            consumerReviews.length !== idx + 1 && "border-b border-default-200"
          )}
        >
          <div className="mb-3 flex items-center">
            <img
              src={review.reviewer_image}
              alt="avatar"
              height={48}
              width={48}
              className="me-4 h-12 w-12 rounded-full"
            />
            <div>
              <div className="mb-2 flex items-center gap-2">
                <h4 className="text-sm font-medium text-default-800">
                  {review.reviewer_name}
                </h4>
                <FaCircle size={5} className="text-default-400" />
                <h4 className="text-sm font-medium text-default-400">
                  Just now
                </h4>
              </div>
              <div className="flex gap-1.5">
                {Array.from(new Array(Math.floor(review.stars))).map(
                  (_val, idx) => (
                    <FaStar key={idx} className="text-base text-yellow-400" />
                  )
                )}
                {!Number.isInteger(review.stars) && (
                  <FaStarHalfStroke size={18} className="text-yellow-400" />
                )}
                {review.stars < 5 &&
                  Array.from(new Array(5 - Math.ceil(review.stars))).map(
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
    </>
  );
};

export default ConsumerReview;
