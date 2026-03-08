type NewsArticleBodyProps = {
  content: string;
};

export function NewsArticleBody({ content }: NewsArticleBodyProps) {
  return (
    <section className="bg-[#F5F8FF]">
      <div className="mx-auto max-w-[1320px] px-6 py-14 sm:px-8 lg:px-12 lg:py-18">
        <article
          className="news-prose min-w-0 px-0 py-0"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}
