
export default async function SkeletonList() {

  const skeletonCol1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  const skeletonCol2 = [21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]

  return (
    <div className="flex flex-col ">
      <ul className="flex gap-3 pl-0 ">
        <div className="flex flex-1 flex-col flex-wrap gap-3 items-center ">
          {skeletonCol1?.map((number) => (
            <div key={number} className="skeleton h-96 w-full max-w-7xl"></div>
          ))}
        </div>
        <div className="flex flex-1 flex-col flex-wrap gap-3 items-center ">
          {skeletonCol2?.map((number) => (
            <div key={number} className="skeleton h-96 w-full max-w-7xl"></div>
          ))}
        </div>
      </ul>
    </div>
  );
}

