import React from 'react'
import "./outlets.scss"

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { MdArrowOutward } from "react-icons/md";

const Outlets = () => {
    return (
        <>
            <div className='outlets container'>

                <div className="outlets-top">
                    <h2 className="outlets-top-title">розничные торговые точки</h2>

                    <div className="outlets-top-info">
                        <h2 className="outlets-top-info-title">Смазочные материалы под брендом Valesco представлены во всех известных розничных автомагазинах по всей России.</h2>
                        <p className="outlets-top-info-text">В 2024 году Valesco запустил программу брендирования сервисных центров и розничных магазинов по всей России – Valesco TOP.</p>
                    </div>
                </div>

                <div className="outlets-middle">
                    <h2 className="outlets-middle-title">Официальные магазины Valesco TOP</h2>

                    <div className="outlets-middle-info">
                        <p className="outlets-middle-info-text">
                            Воспользуйтесь картой чтобы узнать, какие магазины и сервисы уже присоединились к официальной программе брендирования.</p>
                        <div className='outlets-accardion'>
                            <Accordion className='outlets-accardion-item'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header">
                                    <Typography component="span">Выбор города</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='outlets-accardion-item'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography component="span">Выбор типа торговой точки</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </div>

                <div className="outlets-markets">
                    <h2 className="outlets-markets-title">гипермаркеты, федеральные сети и онлайн партнеры</h2>

                    <div className="outlets-markets-info">
                        <p className="outlets-markets-info-text">Продукция Valesco представлена в крупнейших гипермаркетах, федеральных сетях автозапчастей "БИ-БИ", "Родные масла", "Armtek" и других. С подробным ассортиментом Вы можете ознакомиться на сайтах наших партнеров.</p>
                        <div className='outlets-accardion'>
                            <Accordion className='outlets-accardion-item'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header">
                                    <Typography component="span">Онлайн партнеры</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='outlets-accardion-item'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography component="span">Гипермаркеты</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='outlets-accardion-item'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography component="span">Федеральные сети</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='outlets-accardion-item'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography component="span">АЗС</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </div>

                <div className="outlets-partners">
                    <h2 className="outlets-partners-title">региональные партнеры</h2>
                    <div className="outlets-partners-info">
                        <p className="outlets-partners-info-text">
                            Смазочные материалы Valesco представлены в магазинах наших региональных партнеров. С подробным ассортиментом Вы можете ознакомиться на сайтах наших партнеров.
                        </p>

                        <div className='outlets-accardion'>
                            <Accordion className='outlets-accardion-item'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography component="span">Москва и Московская область</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='outlets-accardion-item'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography component="span">Центральный федеральный округ</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='outlets-accardion-item'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography component="span">Северо-Западный федеральный округ</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='outlets-accardion-item'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography component="span">Урал</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='outlets-accardion-item'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography component="span">Сибирь</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='outlets-accardion-item'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography component="span">Дальневосточный регион</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className='outlets-accardion-item'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography component="span">Приволжский округ</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>

            <div className="outlets-bottom">
                <div className="outlets-bottom-black container">
                    <h2 className="outlets-bottom-black-title">Подбери свой Valesco</h2>
                    <div className="outlets-bottom-black-info">
                        <p className="outlets-bottom-black-info-title">
                            Для оптимального подбора соответствующего вашему автомобилю масла Valesco воспользуйтесь модулем подбора масла</p>
                        <button className='outlets-bottom-black-info-btn'>Подобрать масло<MdArrowOutward /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Outlets