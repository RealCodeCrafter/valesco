import React, { useEffect, useState } from 'react'
import "./distrbut.scss"
import vd from "../../assets/videos/vd.webm"
import { useTranslation } from 'react-i18next'

const Data = [
  {
    id: 1,
    country: 'УЗБЕКИСТАН',
    distributor: 'ООО «ЮНИМАКС ТЕХНИКС»',
    title: 'Узбекистан, Ташкент Регион ул 4K 744A, Зангиота, 100000, (EXZAP Автозапчасти и Масла)',
    number: ["+998712033344"]
  },
  {
    id: 2,
    country: 'КАЗАХСТАН',
    distributor: 'TOO «AVTODETAIL»',
    title: 'Казахстан, Южно-Казахстанская область, 160021, город Шымкент, Абайский район, ул Байтулы баба 14А',
    number: ["77022837999"]
  },
  {
    id: 3,
    country: 'ТАДЖИКИСТАН',
    distributor: 'ООО «ТОСОЛ-ПЛЮС»',
    title: 'Таджикистан, Согдийская область, Дж. Расуловский район, пгт Мехробод ул. И. Нурматов 45/4',
    number: ["+992 92 707 49 86"]
  },
  {
    id: 4,
    country: 'ТУРКМЕНИСТАН',
    distributor: 'ИП «НУРЫЕВ ГУВАНЧ ТАГАНДУРДЫЕВИЧ»',
    title: 'Туркменистан, Марыйский велаят, Векилбазар Этрап, Акгонур',
    number: ["+993 65 551008"]
  },
  {
    id: 6,
    country: 'АЗЕРБАЙДЖАН',
    distributor: 'OOO «ILKIN-N»',
    title: 'Респ. Азербайджан, Сальянский район д. Карабаглы',
    number: ["+99 450 321 44 72"]
  },
  {
    id: 7,
    country: 'КАЗАХСТАН',
    distributor: 'TOO «TANAUTO KAZAKHSTAN»',
    title: 'г. Алматы пр. Райымбека д. 169 А',
    number: ["+7 701 711 0430"]
  },
  {
    id: 8,
    country: 'КЫРГЫЗСТАН',
    distributor: 'ООО «КАРД ГРУПП»',
    title: 'Кыргызская Республика, г г.Бишкек, ул.Садыгалиева 1',
    number: ["+996 702 676 514"]
  },
]

const DataEN = [
  {
    id: 1,
    country: 'UZBEKISTAN',
    distributor: 'LLC «UNIMAX TECHNICS»',
    title: 'Узбекистан, Ташкент Регион ул 4K 744A, Зангиота, 100000, (EXZAP Автозапчасти и Масла)',
    number: ["+998712033344"]
  },
  {
    id: 2,
    country: 'KAZAKHSTAN',
    distributor: 'LLP «AVTODETAIL»',
    title: 'Kazakhstan, South Kazakhstan Region, 160021, Shymkent City, Abai District, 14A Baituly Baba St',
    number: ["77022837999"]
  },
  {
    id: 3,
    country: 'TAJIKISTAN',
    distributor: 'LLC «TOSOL-PLUS»',
    title: 'Tajikistan, Sughd Region, J. Rasulov District, Mehrobod Settlement, 45/4 I. Nurmatov St',
    number: ["+992 92 707 49 86"]
  },
  {
    id: 4,
    country: 'TURKMENISTAN',
    distributor: 'IE «NURYYEV GUVANCH TAGANDURDYEVICH»',
    title: 'Turkmenistan, Mary Region, Vekilbazar District, Akgonur',
    number: ["+993 65 551008"]
  },
  {
    id: 6,
    country: 'AZERBAIJAN',
    distributor: 'LIC «ILKIN-N»',
    title: 'Salyansk area, Karabagly h',
    number: ["+99 450 321 4472"]
  },
  {
    id: 7,
    country: 'KAZAKHSTAN',
    distributor: 'TOO «Tanauto Kazakhstan»',
    title: 'Almaty. Raimbek avenue 169 A',
    number: ["+7 701 711 0430"]
  },
  {
    id: 8,
    country: 'KYRGYZSTAN',
    distributor: 'LLC «KARD GROUP»',
    title: 'Kyrgyz Republic, Bishkek city, Sadygalieva str. 1',
    number: ["+996 702 676 514"]
  },
]

const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.37 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
)

const Distrbut = () => {
  const [openId, setOpenId] = useState(null)
  const { t, i18n } = useTranslation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const DATADISTURB = i18n?.languages[0] === "ru" ? Data : DataEN

  const toggle = (id) => {
    setOpenId(prev => prev === id ? null : id)
  }

  return (
    <div className='distrbut'>
      <video
        className='distrbut__video-bg'
        src={vd}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className='distrbut__overlay' />

      <div className='distrbut__content'>
        <div className='distrbut__left'>
          <p className='distrbut__label'>{t('distributors.label')}</p>
          <h2 className='distrbut__title'>{t('distributors.title')}</h2>
          <h2 className='distrbut__subtitle'>{t('distributors.subtitle')}</h2>
          <div className='distrbut__divider' />
        </div>

        <div className='distrbut__list'>
          {DATADISTURB.map((d) => (
            <div
              key={d.id}
              className={`distrbut__item ${openId === d.id ? 'open' : ''}`}
            >
              <div
                className='distrbut__item-header'
                onClick={() => toggle(d.id)}
              >
                <span className='distrbut__item-num'>{d.id}</span>
                <span className='distrbut__item-name'>{d.country}</span>
                <span className='distrbut__item-chevron'>
                  <ChevronIcon />
                </span>
              </div>

              <div className='distrbut__item-body'>
                <p className='distrbut__company-name'>{d.distributor}</p>
                <div className='distrbut__card'>
                  <div className='distrbut__card-row'>
                    <MapPinIcon />
                    <span>{d.title}</span>
                  </div>

                  <div className='distrbut__card-row'>
                    <PhoneIcon />
                    <div className='distrbut__phones'>
                      {d.number.map((el, i) => (
                        <span key={i}>{el}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Distrbut