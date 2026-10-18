import {
    Link,
} from 'react-router-dom';


export default function PlaceCard({
    place,
}) {
    return (
        <Link
            to={`/places/${place.id}`}
            className="place-card"
        >
            <div className="place-card-image">
                {place.image_url ? (
                    <img
                        src={place.image_url}
                        alt={place.name}
                    />
                ) : (
                    <div
                        className="
                            place-image-placeholder
                        "
                    >
                        ✳
                    </div>
                )}
            </div>


            <div className="place-card-content">
                <div className="place-card-meta">
                    <span>
                        {place.category}
                    </span>

                    <span>
                        {place.city}
                    </span>
                </div>


                <h2>
                    {place.name}
                </h2>


                <p>
                    {place.description}
                </p>


                <span className="place-card-link">
                    View place
                    {' '}
                    →
                </span>
            </div>
        </Link>
    );
}
