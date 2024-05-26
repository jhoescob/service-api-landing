import { DataTable } from "@/components/tables/endPointsTable";
import { Experience } from "@/components/3d/mvc3d";
import { GitButton } from "@/components/buttons/gitButon";
export default function Home() {
  return (
    <div className="md:pt-10 flex flex-col gap-16 md:gap-[400px] z-0 relative md:mt-[200px]">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-8xl">
          Reservation API
        </h1>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          This is a API that allows you to make reservations for any time of
          services, Using a Model-Control-View architecture.
        </p>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-10 md:gap-30 justify-center items-center">
        <div className="w-full md:w-[35%] h-[400px] overflow-hidden flex items-cente justify-center relative">
          <div className="w-full h-[400px] md:h-[800px] absolute top-[-200px]">
            <Experience />
          </div>
        </div>
        <section className="w-full md:w-[40%] flex flex-col gap-3">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-8xl">
            MVC Architecture
          </h1>
        </section>
      </div>

      <div className="flex flex-col gap-16">
        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          How to use the API
        </h2>

        <div className="flex flex-col md:flex-row gap-10 md:gap-[5%] w-full ">
          <section className="w-full md:w-[75%] flex flex-col gap-3">
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
              End Points Table
            </h2>
            <DataTable />
          </section>
          <section className="w-full md:w-[20%] flex flex-col gap-3">
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
              Free Code
            </h2>
            <p className="">
              If you like this code, please consider giving it a star on GitHub.
            </p>

            <p className="mt-10">For express and typescript:</p>
            <GitButton link={"https://github.com/jhoescob/ServiceApi"} />
          </section>
        </div>
      </div>
    </div>
  );
}
