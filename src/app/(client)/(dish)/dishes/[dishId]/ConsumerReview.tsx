import { consumerReviews } from "@/assets/data";
import { cn } from "@/utils";
import { useEffect } from "react";
import { FaCircle, FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { io } from "socket.io-client";

const ConsumerReview = () => {
  const socket = io("http://localhost:1108");
  useEffect(() => {
    const onCorrect = () => {
      console.log("is connect");
    };
    const offCorrect = () => {
      console.log("is disconnect");
    };
    socket.on("connect", onCorrect);
    socket.off("connect", offCorrect);

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);
  return (
    <>
      <h4 className="text-base font-medium text-default-800">
        Consumer Review
      </h4>

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
