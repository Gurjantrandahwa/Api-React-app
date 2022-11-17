import React, {useEffect, useState} from "react";
import "../App.css"

export default function App() {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    const url = "https://dummyapi.io/data/v1/user?limit=1000"
    const [editId, setEditId] = useState("")

    function loadUsers() {
        fetch(url,
            {headers: {"app-id": "62832e0b8b15a065437e8cba"}})
            .then(response => response.json())
            .then(res => {
                setLoading(false)
                setData(res.data)
            })
    }

    useEffect(() => {
        loadUsers()
    }, [])
    const postMessage = () => {

        const url = "https://dummyapi.io/data/v1/user/create";
        fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-origin': '*',
                    "app-id": "62832e0b8b15a065437e8cba"
                },
                body: JSON.stringify({
                    firstName: "Gurjap",
                    lastName: "Singh",
                    email: "Gffsfsfsdfsdfsdu@gfdsfffffm.com",
                })
            }
        )
            .then(response => {
                console.log("response", response)

            })
    }
    if (loading) {
        return <div>
            Loading....
        </div>
    }
    return (
        <div className="data">

            {
                data && data.map((value) => {
                        return <div className="div" key={value.id}>
                            <img src={value.picture} alt='img'/>
                            <div>
                                <p>{value.id}<br/>
                                    {value.firstName}<br/>
                                    {value.lastName}</p>
                                <div style={{display: "flex"}}>

                                    <div>
                                        {
                                            editId !== value.id && <button className='btn2'
                                                                           onClick={() => {
                                                                               setEditId(value.id)
                                                                           }}>Edit
                                            </button>
                                        }
                                        {
                                            editId === value.id && <button className='btn2'
                                                                           onClick={() => {
                                                                               setEditId("")
                                                                           }}>Back
                                            </button>
                                        }
                                    </div>
                                    <div style={{padding: "16px"}}/>

                                    <div>
                                        <button className='btn2'
                                                onClick={() => {
                                                    const url = "https://dummyapi.io/data/v1/user/" + value.id;
                                                    fetch(url, {
                                                            method: 'DELETE',
                                                            headers: {
                                                                'Content-Type': 'application/json',

                                                                "app-id": "62832e0b8b15a065437e8cba"
                                                            },
                                                        }
                                                    )
                                                        .then(response => {
                                                            console.log("response", response)
                                                            loadUsers()
                                                        })
                                                }}>Delete
                                        </button>
                                    </div>

                                </div>
                                {
                                    editId === value.id && <div>
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault()
                                                const url = "https://dummyapi.io/data/v1/user/" + value.id;
                                                fetch(url, {
                                                        method: 'PUT',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Access-Control-Allow-origin': '*',
                                                            "app-id": "62832e0b8b15a065437e8cba"
                                                        },
                                                        body: JSON.stringify({
                                                            firstName: e.target.firstName.value,
                                                            lastName: e.target.lastName.value,

                                                        })
                                                    }
                                                )
                                                    .then(response => {
                                                        console.log("response", response)
                                                        loadUsers()
                                                        setEditId("")
                                                    })
                                            }
                                            }>

                                            <div className="div2">
                                                <label> FirstName </label>
                                                <input
                                                    type="text"
                                                    name="firstName" required
                                                    defaultValue={value.firstName}

                                                />
                                                <label> LastName </label>
                                                <input
                                                    type="text"
                                                    name="lastName" required
                                                    defaultValue={value.lastName}

                                                />
                                                <button className='btn2' type={"submit"}>Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                }

                            </div>

                        </div>
                    }
                )
            }

            <div>
                <button className='btn' onClick={postMessage}>Submit</button>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        const url = "https://dummyapi.io/data/v1/user/create";
                        fetch(url, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-origin': '*',
                                    "app-id": "62832e0b8b15a065437e8cba"
                                },
                                body: JSON.stringify({
                                    firstName: e.target.firstName.value,
                                    lastName: e.target.lastName.value,
                                    email: e.target.email.value,

                                })
                            }
                        )
                            .then(response => {
                                console.log("response", response)
                            })
                    }
                    }>

                    <div className="div2">
                        <label> FirstName </label>
                        <input
                            type="text"
                            name="firstName" required

                        />
                        <label> LastName </label>
                        <input
                            type="text"
                            name="lastName" required

                        />
                        <label> E-mail </label>
                        <input
                            type="text"
                            name="email" required   
                        />
                        <button className='btn2' type={"submit"}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

