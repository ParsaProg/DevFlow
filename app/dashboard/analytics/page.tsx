const DashboardPage = () => {
  return (
    <div className="z-10 absolute top-0 bg-[#05070B] w-full h-screen">
      <div className="mt-24 ml-60 pl-15 flex flex-col gap-y-5">
        <section>
          <h1 className="text-white font-bold text-2xl">Good morning, Parsa</h1>
          <h3 className="text-gray-500 font-thin text-[17px] mt-1">
            Here is what is happening across your projects today.
          </h3>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
