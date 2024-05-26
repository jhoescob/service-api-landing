import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/tables/endPointsTable";

export default function Home() {
  return (
    <div className="md:pt-10 flex flex-col gap-16 md:gap-32 z-0 relative">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-8xl">
          Reservation API
        </h1>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          This is a API that allows you to make reservations for any time of
          services, Using a Model-Control-View architecture.
        </p>
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
              The people of the kingdom were outraged. They loved to tell jokes
            </p>
          </section>
        </div>
      </div>

      <Button className="hover:bg-slate-500">Click me</Button>
    </div>
  );
}
