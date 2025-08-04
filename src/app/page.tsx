"use client";
import { useTRPC } from "@/trpc/client";


const Page = () => {
  const trpc = useTRPC();
  trpc.createAI.queryOptions({text: 123});

  return (
    <div>
      Hello world!
    </div>
  );
}

export default Page;

