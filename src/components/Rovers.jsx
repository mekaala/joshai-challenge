import axios from 'axios';
import React, { useEffect, useState } from 'react'

const roverUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=DEMO_KEY";

function Rovers() {
    const [rovers, setRovers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRovers = async () => {
            try {
                const response = await axios.get(roverUrl);
                setRovers(response.data);
                setError(null);
            } catch (err) {
                setError(err.message);
                setRovers(null);
            } finally {
                setLoading(false);
            }
        }
        getRovers();
    }, []);

    return (
    <div>
        <h1>Rovers</h1>
        {/* {loading && <div>A moment please...</div>}
        {error && (
            <div>{`There is a problem fetching the post data - ${error}`}</div>
        )} */}
        {rovers && rovers.rovers.map((rover, id) => {
            return (
                <div key={ id }>
                    <h3>{ rover.name }</h3>
                    <p>{ rover.landing_date }</p>
                    <p>{ rover.launch_date }</p>
                    <p>{ rover.total_photos }</p>
                    <h4>Cameras</h4>
                    {rover.cameras.map((pic, i) => {
                        return <div key={ i }>
                            <p>{ pic.name }</p>
                            <p>{ pic.full_name }</p>
                        </div>
                    })}
                </div>
            )
        })}
    </div>

  )
}

export default Rovers;