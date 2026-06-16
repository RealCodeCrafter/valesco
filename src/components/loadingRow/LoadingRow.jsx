import React from "react";
import "./loadingRow.scss";

const LoadingRow = () => {

    return (
        <div className="loading">
            <div className="loading__wrapper">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div className="loading__item" key={index}>
                        <div className="loading__item-left">
                            <div className="loading__img bg__animation"></div>
                            <div className="loading__item-left-info">
                                <div className="loading__title bg__animation"></div>
                                <div className="loading__title bg__animation"></div>
                            </div>
                        </div>
                        <div className="loading__title-btn bg__animation"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingRow;