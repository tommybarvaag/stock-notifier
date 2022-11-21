import { Icons } from "@/components/icons";

export default function IndexPage() {
  return (
    <section className="max-w-36 flex max-w-xl flex-col space-y-2 text-center">
      <Icons.Header className="mx-auto h-80 w-80 md:h-[22rem] md:w-[22rem]" />
      <h1 className="text-2xl font-bold">Stock notifier</h1>
      <p>Press login/dashboard upper right corner!</p>
    </section>
  );
}
