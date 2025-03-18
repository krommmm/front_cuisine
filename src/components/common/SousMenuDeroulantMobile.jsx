export function SousMenuDeroulantMobile({ data }) {

    return (
        <div className="sousMenuDeroulantMobile">
            {data.map((cell, index) => (
                <ul key={index}>
                    <li>{cell.name}</li>
                </ul>
            ))}
        </div>
    );
}