import Pagination from "./components/Pagnation";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <Pagination
      url="/"
      itemCount={99}
      pageSize={10}
      currentPage={parseInt(searchParams.page)}
    />
  );
}
