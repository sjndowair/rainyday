interface Item {
  id: string;
  // ... 다른 필요한 속성들
}

const OpenMarket = () => {
  const items: Item[] = []; // 여기에 실제 아이템 데이터를 넣으세요

  return (
    <div
      className={`
        overflow-auto flex flex-col
        md:flex-row md:overflow-x-auto md:overflow-y-hidden
        scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent
        md:h-[500px] md:whitespace-nowrap md:space-x-4 scroll-smooth
      `}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="w-full md:w-[300px] md:flex-shrink-0 mb-4 md:mb-0"
        >
          {/* 아이템 내용 */}
        </div>
      ))}
    </div>
  );
};

export default OpenMarket;
