type NewsArticleHeroProps = {
  title: string;
  publishedDate: string;
};

export function NewsArticleHero({ title, publishedDate }: NewsArticleHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#103B8B] text-white">
      <div className="relative mx-auto max-w-[1320px] px-6 pt-28 pb-16 text-left sm:px-8 lg:px-12 lg:pt-34 lg:pb-20">
        <h1 className="mt-6 max-w-4xl text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-5xl lg:text-[68px]">
          {title}
        </h1>
        <div className="mt-7 flex text-sm text-white/74 sm:text-base">
          <span className="rounded-full bg-white/8 px-4 py-2 font-medium">{publishedDate}</span>
        </div>
      </div>
    </section>
  );
}
