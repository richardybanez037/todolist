export default function ListSkeleton() {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full border flex justify-between p-2 rounded-xl items-center animate-pulse">
        <div className="w-full flex gap-2 pr-3">
          <div className="w-6 h-5 bg-gray-200 rounded"></div>
          <div className="w-full flex gap-2">
            <div className="w-1/3 h-5 bg-gray-200 rounded"></div>
            <div className="w-2/3 bg-white rounded"></div>
          </div>
        </div>
        <div className="rounded-lg p-2 bg-green-200 duration-150 min-w-10 w-min">
          <div className="w-6 h-6 bg-gray-100 rounded"></div>
        </div>
      </div>

      <div className="w-full border flex justify-between p-2 rounded-xl items-center animate-pulse">
        <div className="w-full flex gap-2 pr-3">
          <div className="w-6 h-5 bg-gray-200 rounded"></div>
          <div className="w-full flex gap-2">
            <div className="w-2/3 h-5 bg-gray-200 rounded"></div>
            <div className="w-1/3 bg-white rounded"></div>
          </div>
        </div>
        <div className="rounded-lg p-2 bg-green-200 duration-150 min-w-10 w-min">
          <div className="w-6 h-6 bg-gray-100 rounded"></div>
        </div>
      </div>

      <div className="w-full border flex justify-between p-2 rounded-xl items-center animate-pulse">
        <div className="w-full flex gap-2 pr-3">
          <div className="w-6 h-5 bg-gray-200 rounded"></div>
          <div className="w-full flex gap-2">
            <div className="w-11/12 h-5 bg-gray-200 rounded"></div>
            <div className="w-1/12 bg-white rounded"></div>
          </div>
        </div>
        <div className="rounded-lg p-2 bg-green-200 duration-150 min-w-10 w-min">
          <div className="w-6 h-6 bg-gray-100 rounded"></div>
        </div>
      </div>
    </div>
  );
}
