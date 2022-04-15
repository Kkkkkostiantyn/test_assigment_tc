import "./App.css";
import React, { useEffect, useState } from "react";
import ContactCard from "./components/ContactCard";
import { DATA_URL } from "./constants";
import upImg from "./assets/up.png";
import downImg from "./assets/down.png";

const App = () => {
    const itemsPerPage = 12;

    const [search, setSearch] = useState("");
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(0);
    const [cardsInfo, setCardsInfo] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);

    const selectCard = (id) => {
        const temp = [...selectedCards, id];
        setSelectedCards(temp);
        console.log(temp);
    };

    const deselectCard = (id) => {
        setSelectedCards(selectedCards.filter((e) => e !== id));
    };

    useEffect(() => {
        fetch(DATA_URL)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setFilteredData(data);
                setCardsInfo(data.slice(0, itemsPerPage));
            });
    }, []);

    useEffect(() => {
        if (data && search) {
            if (!search) {
                setFilteredData(data);
            }
            setFilteredData(
                data.filter(
                    (e) =>
                        e.first_name
                            .toLowerCase()
                            .startsWith(search.toLowerCase()) ||
                        e.last_name
                            .toLowerCase()
                            .startsWith(search.toLowerCase())
                )
            );
            setPage(0);
        }
    }, [search]);

    useEffect(() => {
        if (data) {
            setCardsInfo([
                ...filteredData.slice(
                    page * itemsPerPage,
                    page * itemsPerPage + itemsPerPage
                )
            ]);
        }
    }, [page, search]);

    return (
        <div className="App">
            <header>
                Contacts
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search"
                    type="text"
                />
            </header>
            <div className="container">
                <div className="contacts_wrapper">
                    {cardsInfo.map((e) => (
                        <ContactCard
                            selectCard={selectCard}
                            deselectCard={deselectCard}
                            isChecked={selectedCards.includes(e.id)}
                            data={e}
                        />
                    ))}
                </div>
                <div className="page">
                    <button
                        className="pagButton"
                        type="image"
                        onClick={() => {
                            if (filteredData[itemsPerPage * (page + 1) + 1]) {
                                setPage((prev) => prev + 1);
                            }
                        }}
                    >
                        <img className="pagButtonImg" src={upImg} alt="" />
                    </button>
                    <button
                        className="pagButton"
                        onClick={() => {
                            setPage((prev) => (prev > 0 ? prev - 1 : prev));
                        }}
                    >
                        <img className="pagButtonImg" src={downImg} alt="" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;
