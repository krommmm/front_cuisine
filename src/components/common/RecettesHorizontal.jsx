export function RecettesHorizontal({ items, name }) {

    return (
        <div className="recettesHorizontal">
            <div className="recettesHorizontal__content">
                <p className="recettesHorizontal__content--title">{name}</p>
                <div className="recettesHorizontal__content__items">
                    {items.map((item, index) => (
                        <div key={index} className={`recettesHorizontal__content__item`}>
                            <img src={item.img} alt="img items" className={`isCircle-${item.isCircle}`} />
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}