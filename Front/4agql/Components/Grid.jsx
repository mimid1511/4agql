export default function Grid({ data }) {
    return (
        <div className="grid grid-cols-5 gap-5">
            {data.classes.map((classe) => (
                <div>
                    <div className="card card-compact w-50 bg-base-100 shadow-xl">
                        <figure><img src="https://loeildelaphotographie.com/wp-content/uploads/2013/02/original_1-facebook-profile-picture-jpg.jpg" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Nom de l'élève</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}