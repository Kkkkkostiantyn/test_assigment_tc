import "./ContactCard.css";
import React from "react";

const ContactCard = ({ data, isChecked, selectCard, deselectCard }) => {
    const {
        first_name: firstName,
        last_name: lastName,
        email,
        avatar,
        id
    } = data;
    return (
        <>
            <div className="card">
                <div className="card_avatar">
                    <img src={avatar} alt="" />
                </div>
                <div className="card_info">
                    <div className="card_name">{`${firstName} ${lastName}`}</div>
                    <div className="card_email">{email}`</div>
                </div>
                <input
                    type="checkbox"
                    className="checkbox"
                    id="scales"
                    name="scales"
                    onChange={() => {
                        isChecked ? deselectCard(id) : selectCard(id);
                    }}
                    checked={isChecked}
                />
            </div>
        </>
    );
};

export default ContactCard;
