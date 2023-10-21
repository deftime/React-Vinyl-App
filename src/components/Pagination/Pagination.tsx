import cls from "./pagination.module.scss";
import { Link, useSearchParams } from "react-router-dom";

interface paginPropsType {
  countItems: number;
  itemsPerPage: number;
}

function Pagination({ countItems, itemsPerPage }: paginPropsType) {
  const pagin = [];
  const pages = Math.ceil(countItems / itemsPerPage);
  for (let i = 1; i <= pages; i++) {
    pagin.push(i);
  }

  const [params] = useSearchParams();
  const currentPage = params.has("offset")
    ? (+params.get("offset") + 10) / itemsPerPage
    : 1;

  return (
    <>
      {pagin.length > 1 && (
        <div className={cls.pagination}>
          {pagin.map((item, index) => {
            return +item === +currentPage ? (
              <div key={index}>{item}</div>
            ) : (
              <Link
                to={"?offset=" + (item * 10 - 10) + "&limit=" + itemsPerPage}
                key={index}
              >
                {item}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Pagination;
