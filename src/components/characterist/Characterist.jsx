import React from 'react'
import "./characterist.scss"
import { useTranslation } from 'react-i18next';

const rows = [
  { label: "Класс вязкости SAE", key: "sae" },
  { label: "Плотность при 15°С, г/см3", key: "density" },
  { label: "Кинематическая вязкость при 40 °С, мм2/с", key: "kinematic_one" },
  { label: "Кинематическая вязкость при 100 °С, мм2/с", key: "kinematic_two" },
  { label: "Индекс вязкости", key: "viscosity" },
  { label: "Температура вспышки в открытом тигле °С", key: "flash" },
  { label: "Температура затвердевания, °С", key: "temperature" },
  { label: "Щелочное число, мг КОН/г", key: "base" }
];

const trnassmission = [
  { label: "Плотность при 15°С, г/см3", key: "density" },
  { label: "Кинематическая вязкость при 40 °С, мм2/с", key: "kinematic_one" },
  { label: "Кинематическая вязкость при 100 °С, мм2/с", key: "kinematic_two" },
  { label: "Индекс вязкости", key: "viscosity" },
  { label: "Температура вспышки в открытом тигле °С", key: "flash" },
  { label: "Температура затвердевания, °С", key: "temperature" },
];

const gidro = [
  { label: "Класс вязкости SAE", key: "sae" },
  { label: "Плотность при 15°С, г/см3", key: "density" },
  { label: "Кинематическая вязкость при 40 °С, мм2/с", key: "kinematic_one" },
  { label: "Кинематическая вязкость при 100 °С, мм2/с", key: "kinematic_two" },
  { label: "Индекс вязкости", key: "viscosity" },
  { label: "Температура вспышки в открытом тигле °С", key: "flash" },
  { label: "Температура затвердевания, °С", key: "temperature" },
];

const Characterist = ({ data }) => {
  const { t, i18n } = useTranslation()

  const getRowsForCategory = () => {
    const categoryRu = data?.category?.title?.ru;
    const categoryEn = data?.category?.title?.en;

    if (categoryRu === "Трансмиссионные масла" || categoryEn === "Transmission oils") {
      return trnassmission;
    } else if (categoryRu === "Гидравлические масла" || categoryEn === "Hydraulic oils") {
      return gidro;
    } else {
      return rows;
    }
  };

  const currentRows = getRowsForCategory();

  return (
    <div id='characterist' className='container characterist'>
      <h2 className='characterist-title'>{t("Характеристики")}</h2>
      <div className="characterist-info">
        <table className='characterist-info-table'>
          <thead className='characterist-info-table-thead'>
            <tr className='characterist-info-table-thead-tr'>
              <th className='characterist-info-table-thead-th'>{t("Название индикатора")}</th>
              <th className='characterist-info-table-thead-th'>{t("Значение")}</th>
              <th className='characterist-info-table-thead-th'>{t("Метод испытания")}</th>
            </tr>
          </thead>

          <tbody className='characterist-info-tbody'>
            {currentRows.map((row, i) => (
              <tr key={i} className='characterist-info-tbody-tr'>
                <td className='characterist-info-tbody-td'>{t(row.label)}</td>
                {data?.[row.key]?.map((el, index) => (
                  <td key={index} className='characterist-info-tbody-td'>{el}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Characterist