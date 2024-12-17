import React, { useEffect, useState, useCallback } from "react";
import { serverUrl } from "./const";
import { MdDelete } from "react-icons/md";

const AdsData = ({refresh}) => {
  const [adsListData, setAdsListData] = useState([]);

  const fetchAdsData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://${serverUrl}/api/v1/run-ads/get-all-running-ads`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAdsListData(data.data);
      }
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  }, []);

  const handleDelete = useCallback(async (ApkUniqueKey, adItem) => {
    try {
      const response = await fetch(`http://${serverUrl}/deleteAdItem`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ApkUniqueKey, adItem }),
      });
      const data = await response.json();
      
      if (data.message === "Ad item deleted successfully") {
        setAdsListData(prevData =>
          prevData.map(item =>
            item.ApkUniqueKey === ApkUniqueKey
              ? {
                  ...item,
                  AdslistData: item.AdslistData.filter(ad => ad !== adItem),
                }
              : item
          )
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  useEffect(() => {
    fetchAdsData();
  }, [refresh, fetchAdsData]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-[#252525] mb-[3%]">Ads Sdk data</h1>
      <div className="w-full max-w-[90%]">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-center">Apk Unique Key</th>
              <th className="text-left">redirection_link</th>
              <th className="text-left">Ads Image</th>
              <th className="text-center">preview</th>
              <th className="text-center">Total Impressions</th>
              <th className="text-center">Total Clicks</th>
            </tr>
          </thead>
          <tbody>
            {adsListData.map((dataItem, index) => (
              <TableRow
                key={dataItem.app_id}
                dataItem={dataItem}
                index={index}
                handleDelete={handleDelete}
                serverUrl={serverUrl}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default AdsData;

// table row
const TableRow = React.memo(({ dataItem, index, handleDelete, serverUrl }) => (
  <tr className={`w-11/12 h-10 ${index % 2 === 0 ? "bg-[#E0F1FB]" : "bg-white"}`}>
    <td className="text-center">{dataItem.Registered_apk_key.app_name}</td>
    <td className="text-left">{dataItem.Ad.app_link}</td>
    <td className="text-left">{dataItem.Ad.ad_asset_path}</td>
    <td className="flex items-center justify-center">
      <div className="w-10">
         <div className="w-11/12 mx-auto flex hover:scale-150 transition-transform transform-gpu duration-300">
          <a href={`http://${serverUrl}/images/${dataItem.Ad.ad_asset_path}`} target="_blank">
            <img src={`http://${serverUrl}/images/${dataItem.Ad.ad_asset_path}`} />
          </a>
         </div>
      </div>
      {/* <div className="w-10 bg-black">
        <div className="flex items-center justify-center hover:scale-150 transition-transform transform-gpu duration-300">
          <a href={`http://${serverUrl}/images/${dataItem.Ad.ad_asset_path}`} target="_blank">
            <img src={`http://${serverUrl}/images/${dataItem.Ad.ad_asset_path}`} />
          </a>
        </div>
      </div> */}
    </td>
    <td className="text-center">{dataItem.impression_count}</td>
    <td className="text-center">
      <div className="flex items-center justify-center">
        <h2 className="text-center">{dataItem.click_count}</h2>
        <span>
          <MdDelete
            onClick={() => handleDelete(dataItem.app_id, dataItem.Ad.ad_asset_path)}
            className="text-blue-500 ml-2 cursor-pointer"
          />
        </span>
      </div>
    </td>
  </tr>
));
