import React, { useEffect, useState } from 'react'
import img from "../../assets/icons/filter.svg"
import "./distr.scss"

import { CgMathPlus } from "react-icons/cg";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { MdArrowOutward } from "react-icons/md";
import { useTranslation } from "react-i18next";
import video from "../../assets/videos/dist.webm"

const Distr = () => {
  const [hide, setHide] = useState(null)
  const [activeFilters, setActiveFilters] = useState([])
  const { t, i18n } = useTranslation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const Data = [
    {
      country: 'УЗБЕКИСТАН',
      distributor: 'ООО «ЮНИМАКС ТЕХНИКС»',
      title: 'Ташкентская область, ул. Зангиата, 4К744А',
      number: ["+998712033344"]
    },
    {
      country: 'КАЗАХСТАН',
      distributor: 'TOO «AVTODETAIL»',
      title: 'Казахстан, Южно-Казахстанская область, 160021, город Шымкент, Абайский район, ул Байтулы баба 14А',
      number: ["77022837999"]
    },
    {
      country: 'ТАДЖИКИСТАН',
      distributor: 'ООО «ТОСОЛ-ПЛЮС»',
      title: 'Таджикистан, Согдийская область, Дж. Расуловский район, пгт Мехробод ул. И. Нурматов 45/4',
      number: ["+992 92 707 49 86"]
    },
    {
      country: 'ТУРКМЕНИСТАН',
      distributor: 'ИП «НУРЫЕВ ГУВАНЧ ТАГАНДУРДЫЕВИЧ»',
      title: 'Туркменистан, Марыйский велаят, Векилбазар Этрап, Акгонур',
      number: ["+993 65 551008"]
    },
    {
      country: 'РОССИЙСКАЯ ФЕДЕРАЦИЯ',
      distributor: 'OOO «NB GLOBAL»',
      title: '454047, г. Челябинск, ул. 2-я Павелецкая, 22',
      number: ["+7 495 145 95 00", "+7 922 717 60 90"]
    },
    {
      country: 'АЗЕРБАЙДЖАН',
      distributor: 'OOO «ILKIN-N»',
      title: 'Респ. Азербайджан, Сальянский район д. Карабаглы',
      number: ["+99 450 321 44 72"]
    },
    {
      country: 'КАЗАХСТАН',
      distributor: 'TOO «TANAUTO KAZAKHSTAN»',
      title: 'г. Алматы пр. Райымбека д. 169 А',
      number: ["+7 701 711 0430"]
    },
    {
      country: 'КЫРГЫЗСТАН',
      distributor: 'ООО «КАРД ГРУПП»',
      title: 'Кыргызская Республика, г г.Бишкек, ул.Садыгалиева  1',
      number: ["+996 702 676 514"]
    }
  ];

  const DataEN = [
    {
      country: 'UZBEKISTAN',
      distributor: 'LLC «UNIMAX TECHNICS»',
      title: 'Tashkent region, Zangiata str, 4K744A',
      number: ["+998712033344"]
    },
    {
      country: 'KAZAKHSTAN',
      distributor: 'LLP «AVTODETAIL»',
      title: 'Kazakhstan, South Kazakhstan Region, 160021, Shymkent City, Abai District, 14A Baituly Baba St',
      number: ["77022837999"]
    },
    {
      country: 'TAJIKISTAN',
      distributor: 'LLC «TOSOL-PLUS»',
      title: 'Tajikistan, Sughd Region, J. Rasulov District, Mehrobod Settlement, 45/4 I. Nurmatov St',
      number: ["+992 92 707 49 86"]
    },
    {
      country: 'TURKMENISTAN',
      distributor: 'IE «NURYYEV GUVANCH TAGANDURDYEVICH»',
      title: 'Turkmenistan, Mary Region, Vekilbazar District, Akgonur',
      number: ["+993 65 551008"]
    },
    {
      country: 'RUSSIAN FEDERATION',
      distributor: 'LLC «NB GLOBAL»',
      title: '454047, Chelyabinsk city, Paveletskaya street second, 22',
      number: ["+7 495 145 95 00", "+7 922 717 60 90"]
    },
    {
      country: 'AZERBAIJAN',
      distributor: 'LIC «ILKIN-N»',
      title: 'Salyansk area, Karabagly h',
      number: ["+99 450 321 4472"]
    },
    {
      country: 'KAZAKHSTAN',
      distributor: 'TOO «Tanauto Kazakhstan»',
      title: 'Almaty. Raimbek avenue 169 A',
      number: ["+7 701 711 0430"]
    },
    {
      country: 'KYRGYZSTAN',
      distributor: 'LLC «KARD GROUP»',
      title: 'KYRGZ REPUBLIC, BISHKEK CITY, SADYGALIEVA STR. 1',
      number: ["+996 702 676 514"]
    }
  ];

  const DATADISTURB = i18n?.languages[0] === "ru" ? Data : DataEN

  const filterCountries = [
    'УЗБЕКИСТАН',
    'КАЗАХСТАН',
    'ТАДЖИКИСТАН',
    'ТУРКМЕНИСТАН',
    'РОССИЙСКАЯ ФЕДЕРАЦИЯ',
    'АЗЕРБАЙДЖАН',
    'КЫРГЫЗСТАН'
  ];

  const filterCountriesEN = [
    'UZBEKISTAN',
    'KAZAKHSTAN',
    'TAJIKISTAN',
    'TURKMENISTAN',
    'RUSSIAN FEDERATION',
    'AZERBAIJON',
    'KYRGYZSTAN'
  ];

  const distrbutData = i18n?.languages[0] === "ru" ? filterCountries : filterCountriesEN

  const handleFilterClick = (country) => {
    setActiveFilters(prev => {
      if (prev.includes(country)) {
        return prev.filter(f => f !== country)
      } else {
        return [...prev, country]
      }
    })
  }

  const filteredData = activeFilters.length === 0
    ? DATADISTURB
    : DATADISTURB.filter(item => activeFilters.includes(item.country))

  return (
    <div className='distr container'>
      <div className="distr-filter">
        <button onClick={() => setHide(p => !p)} className='distr-filter-btn'>
          <img src={img} alt="filter-img" />
          {hide ? t("Показать фильтр") : t("Скрыть фильтр")}
        </button>

        <div className={`distr-filter-box ${hide ? "distr-filter-box-hide" : ""}`}>
          {distrbutData.map(country => (
            <button
              key={country}
              onClick={() => handleFilterClick(country)}
              className={`distr-filter-box-info ${activeFilters.includes(country) ? 'active' : ''}`}
            >
              {country === 'КЫРГЫЗСТАН' ? 'КЫРГЫЗСТАН' : country}
              <CgMathPlus />
            </button>
          ))}
        </div>
      </div>

      <div className="distr-result">
        {filteredData?.length === 0 ? (
          <p className="no-results">По выбранным фильтрам результатов не найдено</p>
        ) : (
          filteredData.map((el, index) => (
            <React.Fragment key={index}>
              <p className='distr-result-text'>{el?.country}</p>
              <div>
                <Accordion className='distr-result-title'>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Typography component="span">{el?.distributor}</Typography>
                  </AccordionSummary>

                  <AccordionDetails className='distr-result-bottom'>
                    <span>{t("address")}</span>
                    <p className='distr-result-bottom-text'>{el?.title}</p>
                    <div className="distr-result-info">
                      <div className="distr-result-info-left">
                        <span className='distr-result-info-span'>{t("телефона")}</span>
                        {el?.number?.map((phone, phoneIndex) => (
                          <a
                            key={phoneIndex}
                            href={`tel:${phone}`}
                            className="distr-result-info-left-title"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  )
}

export default Distr