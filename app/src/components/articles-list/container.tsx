import { useFetch } from "../../hooks/fetch";
import { ArticleI } from "../../types/model.types";
import ArticleItem from "../article-lits-item";
import ErrorComponent from "../error-cover";
import Loader from "../loader";

interface Props {
  trackingNumber: string;
}
const ArticlesList: React.FC<Props> = ({ trackingNumber }) => {
  const { data, isPending, error } = useFetch<ArticleI[]>(
    `http://localhost:3000/orders/get-articles/${trackingNumber}`,
    "GET"
  );

  return (
    <>
      {isPending && <Loader />}
      {error && <ErrorComponent error={error} />}
      {data && data.length && (
        <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
          <section className="mb-32">
            <h5 className="mb-10  text-xl font-semibold md:mb-6">Articles</h5>
            {data &&
              data.map((props) => <ArticleItem key={props.id} {...props} />)}
          </section>
        </div>
      )}
    </>
  );
};

export default ArticlesList;
