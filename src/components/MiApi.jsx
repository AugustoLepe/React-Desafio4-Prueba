import React, { useState, useEffect } from "react";
import xboxlogo4 from "./xboxlogo4.png"
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

const MiApi = () => {
    const [data, setData] = useState([])
    const [buscar, setBuscar] = useState("")

    useEffect(() => {
        consultarApi()
    }, [])

    const consultarApi = async () => {
        const response = await fetch("./games.json");
        const games = await response.json()
        setData(games)
    }

    const filtroBusqueda = data.filter(item => item.name.toLowerCase().includes(buscar.toLowerCase())).sort((a, b) => {
        if (a.name < b.name) return -1
        // if (a.name > b.name) return 1
        return 0
    })

    return (
        <div>
            <Navbar bg="light" variant="light" className="border bg-dark">
                <Container>
                    <h1 className="head-text ms-2 text-white">Xbox Games</h1>
                    <img
                        alt=""
                        src={xboxlogo4}
                        width="350"
                        height="100"
                        className="d-inline-block align-top justify-content-end rounded" />
                </Container>
            </Navbar>
            <Container>
                <div className="w-100 my-3 d-flex">
                    <input className="w-25 ms-auto" type="text" value={buscar} onChange={(event) => setBuscar(event.target.value)} placeholder="Search by name" />
                </div>
            </Container>
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr className="bg-dark text-white">
                            <th>Item</th>
                            <th>Name</th>
                            <th>Publisher</th>
                        </tr>
                    </thead>
                    <tbody className="table-dark">
                        {filtroBusqueda.map((item, index) => (
                            <tr>
                                <td key={item.id}>{index + 1}</td>
                                <td key={item.name}>{item.name}</td>
                                <td key={item.publishers}>{item.publishers}</td>
                            </tr>)
                        )
                        }
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default MiApi