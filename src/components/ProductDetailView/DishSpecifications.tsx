const DishSpecifications = ({
  calories,
  fat,
  carbs,
  protein,
}: {
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}) => {
  return (
    <div className="rounded-lg border border-default-200 p-3">
      <div className="grid grid-cols-4 justify-center">
        <div className="text-center">
          <h4 className="mb-1 text-base font-medium text-default-700">
            {calories}
          </h4>
          <h4 className="text-base text-default-700">Calories</h4>
        </div>

        <div className="text-center">
          <h4 className="mb-1 text-base font-medium text-default-700">{fat}</h4>
          <h4 className="text-base text-default-700">Fat</h4>
        </div>

        <div className="text-center">
          <h4 className="mb-1 text-base font-medium text-default-700">
            {carbs}
          </h4>
          <h4 className="text-base text-default-700">Carbs</h4>
        </div>

        <div className="text-center">
          <h4 className="mb-1 text-base font-medium text-default-700">
            {protein}
          </h4>
          <h4 className="text-base text-default-700">Protein</h4>
        </div>
      </div>
    </div>
  );
};

export default DishSpecifications;
