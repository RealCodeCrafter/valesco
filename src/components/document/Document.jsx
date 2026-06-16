import React from 'react'
import { IoMdDownload } from "react-icons/io";
import './document.scss'
import { useTranslation } from 'react-i18next';
import { MdOutlineSimCardDownload } from 'react-icons/md';
import { ImFolderDownload } from "react-icons/im";
import { data } from 'react-router-dom';

const Document = ({ data }) => {
  const { t, i18n } = useTranslation()

  return (
    <div id='document' className='document container'>
      <h2 className='document-title'>{t("Документация")}</h2>
      <a target="_blank"
        download
        rel="noopener noreferrer"
        href={data?.[0]}
      >
        <button className='document-title-btn'>{t("скачать")} <ImFolderDownload /></button>
      </a>
    </div>
  )
}

export default Document