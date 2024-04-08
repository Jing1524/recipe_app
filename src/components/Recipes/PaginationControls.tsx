import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


import { useRouter } from "next/navigation";

type PaginationProps = {
  page: number;
  totalPages: number;
};

const PaginationControls = ({ page, totalPages }: PaginationProps) => {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    // hack: not good for the SEO(Search engines might interpret the separate handling of these URLs as duplicate content),
    // but since the root and /?page=1 renders the same content, will explicitly set in the URL and redirect users back to the root URL for now.
    if (newPage === 1) {
      router.push(`/`);
    } else if (newPage >= 1 && newPage <= totalPages) {
      router.push(`/?page=${newPage}`);
    }
  };

  let startPage = Math.max(1, page - 2);
  let endPage = Math.min(totalPages, page + 2);

  let pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (page > 1) handlePageChange(page - 1);
            }}
            className={
              page === 1
                ? "cursor-not-allowed no-hover-effect"
                : "cursor-pointer" //need custom css to override the hover
            }
          />
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => handlePageChange(page)}
              isActive={page === page}
              className="cursor-pointer"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (page < totalPages) handlePageChange(page + 1);
            }}
            className={
              page === totalPages
                ? "cursor-not-allowed no-hover-effect"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
